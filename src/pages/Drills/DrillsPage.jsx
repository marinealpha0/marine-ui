import React, { useState, useMemo } from "react";
import PageContainer from "@/layouts/PageContainer";
import HeaderSection from "@/layouts/HeaderSection";
import FilterSection from "@/layouts/FilterSection";
import Tables from "@/components/tables/Table";
import { KpiCard, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import { toast } from "sonner";
import { exportFile } from "@/utils/exportUtils";
import {
  initialDrillsData,
  drillKpiSummary,
  drillTypeOptions,
  vesselOptions,
  statusOptions,
} from "@/data/drillsData";
import {
  CalendarRange, FileText, ShieldCheck, CheckCircle2,
  Download, Plus, RefreshCw, X, Eye, CheckCircle, ShieldAlert,
  Clock, Users, MapPin, AlertCircle, Sparkles
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DrillsPage() {
  const [drills, setDrills] = useState(initialDrillsData);
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New drill form state
  const [newDrill, setNewDrill] = useState({
    ref: `DR-${Math.floor(2225 + Math.random() * 100)}`,
    drillType: "Fire",
    vessel: "MT Ocean Star",
    scheduledDate: new Date().toISOString().split("T")[0],
    participants: 20,
    status: "Scheduled",
    location: "Main Deck",
    officerInCharge: "C/O A. Silva",
    safetyOfficer: "2/E R. Kowalski",
    durationMinutes: 45,
    scenario: "",
    debriefingNotes: "",
  });

  // Table filters managed via URL search params (Application Standard)
  const initialFilters = useMemo(
    () => ({
      searchVal: "",
      drillType: "all",
      vessel: "all",
      status: "all",
      dateFrom: "",
      dateTo: "",
      page: 0,
      limit: 5,
    }),
    []
  );

  const {
    filters,
    handleFilterChange,
    handlePageChange,
    handleRowsPerPageChange,
    setFilters,
  } = useTableFilters(initialFilters);

  // Filter configuration array for FilterSection component
  const filterFields = useMemo(
    () => [
      {
        name: "searchVal",
        label: "Search by Ref / Type / Vessel",
        type: "text",
        placeholder: "Search DR-2210, Fire, Ocean Star...",
      },
      {
        name: "drillType",
        label: "Drill Type",
        type: "select",
        options: drillTypeOptions,
      },
      {
        name: "vessel",
        label: "Vessel",
        type: "select",
        options: vesselOptions,
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: statusOptions,
      },
      {
        name: "dateFrom",
        label: "Scheduled From",
        type: "date",
      },
      {
        name: "dateTo",
        label: "Scheduled To",
        type: "date",
      },
    ],
    []
  );

  // Apply search & filtering logic
  const filteredDrills = useMemo(() => {
    return drills.filter((drill) => {
      // Search text filter
      if (filters.searchVal) {
        const query = filters.searchVal.toLowerCase();
        const matchesRef = drill.ref.toLowerCase().includes(query);
        const matchesType = drill.drillType.toLowerCase().includes(query);
        const matchesVessel = drill.vessel.toLowerCase().includes(query);
        const matchesOfficer = (drill.officerInCharge || "").toLowerCase().includes(query);
        if (!matchesRef && !matchesType && !matchesVessel && !matchesOfficer) {
          return false;
        }
      }

      // Drill type filter
      if (filters.drillType && filters.drillType !== "all") {
        if (drill.drillType !== filters.drillType) return false;
      }

      // Vessel filter
      if (filters.vessel && filters.vessel !== "all") {
        if (drill.vessel !== filters.vessel) return false;
      }

      // Status filter
      if (filters.status && filters.status !== "all") {
        if (drill.status !== filters.status) return false;
      }

      // Date range filter
      if (filters.dateFrom) {
        if (new Date(drill.scheduledDate) < new Date(filters.dateFrom)) return false;
      }
      if (filters.dateTo) {
        if (new Date(drill.scheduledDate) > new Date(filters.dateTo)) return false;
      }

      return true;
    });
  }, [drills, filters]);

  // Pagination slicing
  const page = filters.page || 0;
  const limit = filters.limit || 5;
  const paginatedRows = useMemo(() => {
    const start = page * limit;
    return filteredDrills.slice(start, start + limit);
  }, [filteredDrills, page, limit]);

  // Check active filter count for badge indicator
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.searchVal) count++;
    if (filters.drillType && filters.drillType !== "all") count++;
    if (filters.vessel && filters.vessel !== "all") count++;
    if (filters.status && filters.status !== "all") count++;
    if (filters.dateFrom) count++;
    if (filters.dateTo) count++;
    return count;
  }, [filters]);

  const handleResetAllFilters = () => {
    setFilters({
      searchVal: "",
      drillType: "all",
      vessel: "all",
      status: "all",
      dateFrom: "",
      dateTo: "",
      page: 0,
      limit: 5,
    });
    toast.info("Filters reset to default.");
  };

  // Row View Details handler
  const handleView = (row) => {
    setSelectedDrill(row);
    setIsViewOpen(true);
  };

  // TSI Sign-off handler
  const handleSignOff = (drillId) => {
    setDrills((prev) =>
      prev.map((d) =>
        d.id === drillId
          ? {
              ...d,
              status: "Completed",
              tsiReviewStatus: `Approved by TSI on ${new Date().toISOString().split("T")[0]}`,
            }
          : d
      )
    );
    if (selectedDrill && selectedDrill.id === drillId) {
      setSelectedDrill((prev) => ({
        ...prev,
        status: "Completed",
        tsiReviewStatus: `Approved by TSI on ${new Date().toISOString().split("T")[0]}`,
      }));
    }
    toast.success("Drill review signed off and approved!");
  };

  // Add new drill submit handler
  const handleAddDrillSubmit = (e) => {
    e.preventDefault();
    if (!newDrill.ref || !newDrill.drillType || !newDrill.vessel) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const created = {
      ...newDrill,
      id: newDrill.ref.toLowerCase(),
      tsiReviewStatus: newDrill.status === "Completed" ? "Approved by TSI" : "Pending Execution",
    };
    setDrills((prev) => [created, ...prev]);
    setIsAddOpen(false);
    toast.success(`New drill ${created.ref} scheduled successfully!`);
    // Reset form for next entry
    setNewDrill({
      ref: `DR-${Math.floor(2225 + Math.random() * 100)}`,
      drillType: "Fire",
      vessel: "MT Ocean Star",
      scheduledDate: new Date().toISOString().split("T")[0],
      participants: 20,
      status: "Scheduled",
      location: "Main Deck",
      officerInCharge: "C/O A. Silva",
      safetyOfficer: "2/E R. Kowalski",
      durationMinutes: 45,
      scenario: "",
      debriefingNotes: "",
    });
  };

  // Export handler
  const handleExport = () => {
    const csvContent =
      "REF,DRILL TYPE,VESSEL,SCHEDULED,PARTICIPANTS,STATUS,LOCATION,OFFICER IN CHARGE\n" +
      filteredDrills
        .map(
          (d) =>
            `"${d.ref}","${d.drillType}","${d.vessel}","${d.scheduledDate}",${d.participants},"${d.status}","${d.location || ""}","${d.officerInCharge || ""}"`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `drills-report-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`${filteredDrills.length} drill records exported successfully!`);
  };

  const handleRefresh = () => {
    toast.info("Drills data refreshed from fleet servers.");
  };

  return (
    <PageContainer>
      {/* Page Header Section */}
      <HeaderSection
        title="Drills"
        subtitle="Statutory drill scheduling, participation and post-drill review across all vessels."
        actions={[
          {
            label: "Export",
            icon: <Download className="h-4 w-4" />,
            onClick: handleExport,
          },
          {
            label: "Schedule Drill",
            icon: <Plus className="h-4 w-4" />,
            onClick: () => setIsAddOpen(true),
          },
        ]}
        onRefresh={handleRefresh}
      />

      {/* KPI Cards Summary Section */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Scheduled (30 days)"
          value={drillKpiSummary.scheduled30Days}
          delta="Planned in next 30 days"
          tone="info"
          icon={CalendarRange}
          trend="up"
          trendValue="9 Active"
        />
        <KpiCard
          label="Pending review"
          value={drillKpiSummary.pendingReview}
          delta="Awaiting TSI sign-off"
          tone="warning"
          icon={FileText}
          pulse={true}
          trend="neutral"
          trendValue="1 Review"
        />
        <KpiCard
          label="Overdue drills"
          value={drillKpiSummary.overdueDrills}
          delta="All statutory drills on schedule"
          tone="healthy"
          icon={ShieldCheck}
          trend="down"
          trendValue="0 Overdue"
        />
        <KpiCard
          label="Completed YTD"
          value={drillKpiSummary.completedYTD}
          delta="Total completed this year"
          tone="healthy"
          icon={CheckCircle2}
          trend="up"
          trendValue="+14% YoY"
        />
      </div>

      {/* Application Standard Filter Section */}
      <div className="relative">
        <FilterSection
          filterFields={filterFields}
          onFilterChange={(newFilterValues) => handleFilterChange(newFilterValues)}
        />

        {/* Active Filter Chips Bar if any filter applied */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4 px-1 text-xs">
            <span className="font-semibold text-slate-600">Active Filters ({activeFiltersCount}):</span>
            {filters.searchVal && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                Search: "{filters.searchVal}"
                <X
                  className="size-3 cursor-pointer hover:opacity-75"
                  onClick={() => setFilters({ searchVal: "" })}
                />
              </span>
            )}
            {filters.drillType && filters.drillType !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                Type: {filters.drillType}
                <X
                  className="size-3 cursor-pointer hover:opacity-75"
                  onClick={() => setFilters({ drillType: "all" })}
                />
              </span>
            )}
            {filters.vessel && filters.vessel !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                Vessel: {filters.vessel}
                <X
                  className="size-3 cursor-pointer hover:opacity-75"
                  onClick={() => setFilters({ vessel: "all" })}
                />
              </span>
            )}
            {filters.status && filters.status !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                Status: {filters.status}
                <X
                  className="size-3 cursor-pointer hover:opacity-75"
                  onClick={() => setFilters({ status: "all" })}
                />
              </span>
            )}
            {filters.dateFrom && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                From: {filters.dateFrom}
                <X
                  className="size-3 cursor-pointer hover:opacity-75"
                  onClick={() => setFilters({ dateFrom: "" })}
                />
              </span>
            )}
            {filters.dateTo && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                To: {filters.dateTo}
                <X
                  className="size-3 cursor-pointer hover:opacity-75"
                  onClick={() => setFilters({ dateTo: "" })}
                />
              </span>
            )}
            <button
              onClick={handleResetAllFilters}
              className="text-xs font-semibold text-primary underline hover:text-primary/80 ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Drill Schedule Table Header & Table Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Drill schedule</h3>
            <p className="text-xs text-slate-500 font-medium">
              {filteredDrills.length} record{filteredDrills.length === 1 ? "" : "s"} in current context
            </p>
          </div>
        </div>

        {/* Data Table */}
        <Tables
          tableType="drills"
          rows={paginatedRows}
          totalCount={filteredDrills.length}
          page={page}
          rowsPerPage={limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          handleView={handleView}
        />
      </div>

      {/* View Drill Detail Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
          {selectedDrill && (
            <div className="space-y-6">
              <DialogHeader className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-primary tracking-wider uppercase">
                      Statutory Drill Report
                    </span>
                    <DialogTitle className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-3">
                      {selectedDrill.ref} — {selectedDrill.drillType}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-slate-500 mt-0.5">
                      Vessel: <span className="font-semibold text-slate-700">{selectedDrill.vessel}</span>
                    </DialogDescription>
                  </div>
                  <StatusChip status={selectedDrill.status} />
                </div>
              </DialogHeader>

              {/* Grid Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase">Scheduled Date</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
                    <CalendarRange className="size-3.5 text-slate-500" />
                    {selectedDrill.scheduledDate}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase">Participants</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
                    <Users className="size-3.5 text-slate-500" />
                    {selectedDrill.participants} Crew
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase">Duration</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
                    <Clock className="size-3.5 text-slate-500" />
                    {selectedDrill.durationMinutes || 45} mins
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase">Location</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-slate-500" />
                    {selectedDrill.location || "Deck & Station"}
                  </p>
                </div>
              </div>

              {/* Command Personnel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <p className="text-xs font-medium text-slate-500">Officer in Charge</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedDrill.officerInCharge || "C/O A. Silva"}</p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <p className="text-xs font-medium text-slate-500">Safety Officer</p>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedDrill.safetyOfficer || "2/E R. Kowalski"}</p>
                </div>
              </div>

              {/* Drill Scenario */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Drill Scenario & Execution</h4>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-sm text-slate-700 leading-relaxed">
                  {selectedDrill.scenario || "Standard SOLAS statutory emergency response drill scenario executed as per vessel SMS instructions."}
                </div>
              </div>

              {/* Debriefing Notes */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Debriefing & Corrective Actions</h4>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 text-sm text-slate-700 leading-relaxed">
                  {selectedDrill.debriefingNotes || "All safety equipment operated satisfactorily. Muster timing recorded within SOLAS limits."}
                </div>
              </div>

              {/* TSI Sign-off Status */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">TSI Review & Verification</p>
                    <p className="text-xs text-slate-600 mt-0.5">{selectedDrill.tsiReviewStatus}</p>
                  </div>
                </div>

                {selectedDrill.status === "Pending Review" && (
                  <Button
                    onClick={() => handleSignOff(selectedDrill.id)}
                    className="bg-primary text-white hover:bg-primary/90 text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    Sign off & Approve
                  </Button>
                )}
              </div>

              <DialogFooter className="pt-2 border-t border-slate-100">
                <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule New Drill Modal */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-xl bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
          <DialogHeader className="border-b border-slate-100 pb-3">
            <DialogTitle className="text-xl font-bold text-slate-900">Schedule New Statutory Drill</DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Create a new drill schedule entry across fleet vessels.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddDrillSubmit} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="drill-ref" className="text-xs font-semibold text-slate-700">Ref Code</Label>
                <Input
                  id="drill-ref"
                  value={newDrill.ref}
                  onChange={(e) => setNewDrill({ ...newDrill, ref: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="scheduled-date" className="text-xs font-semibold text-slate-700">Scheduled Date</Label>
                <Input
                  id="scheduled-date"
                  type="date"
                  value={newDrill.scheduledDate}
                  onChange={(e) => setNewDrill({ ...newDrill, scheduledDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Drill Type</Label>
                <Select
                  value={newDrill.drillType}
                  onValueChange={(val) => setNewDrill({ ...newDrill, drillType: val })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Drill Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {drillTypeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Vessel Name</Label>
                <Select
                  value={newDrill.vessel}
                  onValueChange={(val) => setNewDrill({ ...newDrill, vessel: val })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Vessel" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {vesselOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="participants" className="text-xs font-semibold text-slate-700">Target Participants</Label>
                <Input
                  id="participants"
                  type="number"
                  min="1"
                  value={newDrill.participants}
                  onChange={(e) => setNewDrill({ ...newDrill, participants: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">Status</Label>
                <Select
                  value={newDrill.status}
                  onValueChange={(val) => setNewDrill({ ...newDrill, status: val })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="officer" className="text-xs font-semibold text-slate-700">Officer in Charge</Label>
              <Input
                id="officer"
                value={newDrill.officerInCharge}
                onChange={(e) => setNewDrill({ ...newDrill, officerInCharge: e.target.value })}
                placeholder="e.g. C/O A. Silva"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="scenario" className="text-xs font-semibold text-slate-700">Drill Scenario Notes</Label>
              <Textarea
                id="scenario"
                rows={2}
                value={newDrill.scenario}
                onChange={(e) => setNewDrill({ ...newDrill, scenario: e.target.value })}
                placeholder="Describe drill scenario, station, and objectives..."
              />
            </div>

            <DialogFooter className="pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
                Schedule Drill
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}

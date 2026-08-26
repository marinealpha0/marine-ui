import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Plus } from "lucide-react";
import { ActionButton, DataTable, ExportButton, FilterButton, PageHeader, Panel, StatusChip } from "@/components/app/kit";
import { useTableFilters } from "@/Hooks/useTableFilters";
import FilterSection from "@/layouts/FilterSection";
import { userFilterFields } from "@/constant/FilterFields";
import { users } from "@/data/marine";

export default function UsersPage() {
  const [showFilter, setShowFilter] = useState(false);
  const { filters, handleFilterChange } = useTableFilters({
    searchVal: "",
    dept: "all",
    status: "all",
    role: "",
  });

  const filteredData = useMemo(() => {
    return users.filter((u) => {
      if (filters.searchVal) {
        const q = filters.searchVal.toLowerCase();
        const match =
          (u.name && u.name.toLowerCase().includes(q)) ||
          (u.email && u.email.toLowerCase().includes(q)) ||
          (u.role && u.role.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (filters.dept && filters.dept !== "all" && u.dept !== filters.dept) return false;
      if (filters.status && filters.status !== "all" && u.status !== filters.status) return false;
      if (filters.role && !u.role?.toLowerCase().includes(filters.role.toLowerCase())) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="User & Access Directory"
        description="Provision shore officers, vessel crew accounts, departments, and active vessel access scopes."
        actions={
          <>
            <FilterButton onClick={() => setShowFilter((prev) => !prev)} />
            <ExportButton />
            <Link to="/app/roles">
              <ActionButton
                variant="navy"
                icon={<ShieldCheck className="size-4" />}
              >
                Roles & Permissions
              </ActionButton>
            </Link>
          </>
        }
      />
      <FilterSection
        filterFields={userFilterFields}
        onFilterChange={handleFilterChange}
        isOpen={showFilter}
        onToggle={setShowFilter}
      />
      <Panel padded={false}>
        <DataTable
          columns={["Name", "Role", "Department", "Vessel scope", "Email", "Status"]}
          rows={filteredData.map((u) => [
            <span key="a" className="font-medium">{u.name}</span>,
            u.role,
            u.dept,
            u.vessels,
            <span key="e" className="text-muted-foreground">{u.email}</span>,
            <StatusChip key="f" status={u.status} />,
          ])}
        />
      </Panel>
    </div>
  );
}

import React from "react";
import { AdminTableConfig } from "./configurations/AdminTableConfig";
import { UserTableConfig } from "./configurations/UserTableConfig";
import { PostTableConfig } from "./configurations/PostTableConfig";
import { CompanyTableConfig } from "./configurations/CompanyTableConfig";
import { TransactionTableConfig } from "./configurations/TransactionTableConfig";
import { SubscriptionTableConfig } from "./configurations/SubscriptionTableConfig";
import { ReferralTableConfig } from "./configurations/ReferralTableConfig";
import { CouponTableConfig } from "./configurations/CouponTableConfig";
import { CommentTableConfig } from "./configurations/CommentTableConfig";
import { McqTableConfig } from "./configurations/McqTableConfig";
import { CheatsheetTableConfig } from "./configurations/CheatsheetTableConfig";
import { CategoryTableConfig } from "./configurations/CategoryTableConfig";
import { CourseTableConfig } from "./configurations/CourseTableConfig";
import { ResumeBuilderTableConfig } from "./configurations/ResumeBuilderTableConfig";
import { LegalPageTableConfig } from "./configurations/LegalPageTableConfig";
import { TopicTableConfig } from "./configurations/TopicTableConfig";
import { VideoTableConfig } from "./configurations/VideoTableConfig";
import { FaqTableConfig } from "./configurations/FaqTableConfig";
import { ProjectTableConfig } from "./configurations/ProjectTableConfig";
import { StudentSubmissionTableConfig } from "./configurations/StudentSubmissionTableConfig";
import { LatestUpdateTableConfig } from "./configurations/LatestUpdateTableConfig";
import { UpcomingFeatureTableConfig } from "./configurations/UpcomingFeatureTableConfig";
import { EmployeeReferralTableConfig } from "./configurations/EmployeeReferralTableConfig";
import { ReferredUserTableConfig } from "./configurations/ReferredUserTableConfig";
import { LeadTableConfig } from "./configurations/LeadTableConfig";
import { WorkshopTableConfig } from "./configurations/WorkshopTableConfig";
import { RegistrationTableConfig } from "./configurations/RegistrationTableConfig";
import { DrillsTableConfig } from "./configurations/DrillsTableConfig";
import { KeyboardArrowDownIcon as KeyboardArrowDown } from "@/assets/icons";
import { getRowIdentifier } from "./TableUtils";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUp, ArrowDown, ArrowUpDown } from "@/assets/icons";
import { usePermission } from "@/Hooks/usePermission";
import { UI_TEXT } from "@/constant";

const TBL = UI_TEXT.COMMON.TABLE;

const TailwindPagination = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const handleFirstPageButtonClick = () => {
    onPageChange(null, 0);
  };

  const handleBackButtonClick = () => {
    onPageChange(null, page - 1);
  };

  const handleNextButtonClick = () => {
    onPageChange(null, page + 1);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(null, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  const from = count === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(count, (page + 1) * rowsPerPage);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
      {/* Rows per page */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{TBL.ROWS_PER_PAGE}</span>
        <div className="relative">
          <select
            id="rows-per-page"
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
            className="h-8 w-16 appearance-none rounded-md border border-gray-300 bg-white pl-2 pr-6 text-sm text-gray-700 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            {[5, 10, 25].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <span className="text-sm font-medium text-gray-600">
          {TBL.SHOWING(from, to, count)}
        </span>

        <div className="flex items-center gap-1 border border-gray-200 rounded-lg bg-white p-1 shadow-sm">
          <button
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="first page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleBackButtonClick}
            disabled={page === 0}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MemoizedPagination = React.memo(TailwindPagination);

const tableConfigurations = {
  admin: AdminTableConfig,
  user: UserTableConfig,
  post: PostTableConfig,
  company: CompanyTableConfig,
  transaction: TransactionTableConfig,
  subscription: SubscriptionTableConfig,
  referral: ReferralTableConfig,
  coupon: CouponTableConfig,
  comment: CommentTableConfig,
  mcq: McqTableConfig,
  cheatsheets: CheatsheetTableConfig,
  categories: CategoryTableConfig,
  courses: CourseTableConfig,
  resumeBuilder: ResumeBuilderTableConfig,
  legalPage: LegalPageTableConfig,
  topics: TopicTableConfig,
  videos: VideoTableConfig,
  faqs: FaqTableConfig,
  project: ProjectTableConfig,
  studentSubmission: StudentSubmissionTableConfig,
  latestUpdates: LatestUpdateTableConfig,
  upcomingFeatures: UpcomingFeatureTableConfig,
  employeeReferral: EmployeeReferralTableConfig,
  referredUser: ReferredUserTableConfig,
  lead: LeadTableConfig,
  workshops: WorkshopTableConfig,
  registrations: RegistrationTableConfig,
  drills: DrillsTableConfig,
};

const SortableHeader = ({ label, sortKey, currentSort, onSort, className, sortable = true, truncateLabel = false }) => {
  const isSorted = currentSort.key === sortKey;
  const isAsc = currentSort.direction === 'asc';

  if (!sortable) {
    return (
      <th className={className}>
        {label}
      </th>
    );
  }

  return (
    <th
      className={`${className} cursor-pointer group select-none transition-colors${truncateLabel ? ' overflow-hidden' : ''}`}
      onClick={() => onSort(sortKey)}
    >
      <div className={`flex items-center gap-2${truncateLabel ? ' min-w-0' : ''}`}>
        {truncateLabel
          ? <span className="truncate" title={label}>{label}</span>
          : label
        }
        <span className={`flex-shrink-0 text-primary-foreground/70 group-hover:text-primary-foreground transition-opacity ${isSorted ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
          {isSorted ? (
            isAsc ? <ArrowUp size={14} strokeWidth={2.5} /> : <ArrowDown size={14} strokeWidth={2.5} />
          ) : (
            <ArrowUpDown size={14} strokeWidth={2.5} />
          )}
        </span>
      </div>
    </th>
  );
};

export default function Tables({
  showCollapsible = false,
  rows = [],
  tableType = "admin",
  handleView,
  handleEdit,
  handleDelete,
  handleReply,
  handleReview,
  handleDownloadInvoice,
  handleStatusChange,
  handleResendInvite,
  handleClearSessions,
  viewPermission,
  editPermission,
  deletePermission,
  replyPermission,
  reviewPermission,
  statusChangePermission,
  createPermission,
  resendInvitePermission,
  clearSessionsPermission,
  totalCount = 0,
  page = 0,
  rowsPerPage = 5,
  onPageChange,
  onRowsPerPageChange,
  onSort,
  handleAddNote,
  notesPermission,
  defaultExpandedRowId,
}) {
  const [openRowStates, setOpenRowStates] = React.useState({});
  const [sortConfig, setSortConfig] = React.useState({ key: null, direction: 'asc' });
  const expandedRowRef = React.useRef(null);

  React.useEffect(() => {
    if (defaultExpandedRowId) {
      setOpenRowStates((prev) => ({
        ...prev,
        [defaultExpandedRowId]: true,
      }));
    }
  }, [defaultExpandedRowId]);

  React.useEffect(() => {
    if (defaultExpandedRowId && expandedRowRef.current) {
      const timer = setTimeout(() => {
        expandedRowRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [defaultExpandedRowId, rows]);

  const toggleRow = React.useCallback((identifier) => {
    setOpenRowStates((prev) => ({ ...prev, [identifier]: !prev[identifier] }));
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    if (onSort) {
      onSort(key, direction);
    }
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined) ? acc[part] : null, obj);
  };

  const sortedRows = React.useMemo(() => {
    let sortableRows = Array.isArray(rows) ? [...rows] : [];
    if (sortConfig.key !== null && !onSort) {
      sortableRows.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key);
        const bValue = getNestedValue(b, sortConfig.key);

        // Handle null/undefined
        if (aValue === bValue) {
          // Secondary sort by name if available for stability
          if (a.name && b.name) {
            return a.name.localeCompare(b.name);
          }
          return 0;
        }
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        // Convert to strings for comparison (handles numbers correctly with numeric: true)
        const aString = String(aValue);
        const bString = String(bValue);

        const comparison = aString.localeCompare(bString, undefined, { numeric: true, sensitivity: 'base' });

        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }
    return sortableRows;
  }, [rows, sortConfig, onSort]);

  const config = tableConfigurations[tableType] || AdminTableConfig;

  // Primary Color Header
  const headerCellClass =
    "px-6 py-4 bg-primary text-left text-xs font-bold text-primary-foreground uppercase tracking-wider border-b border-primary-light first:pl-6 last:pr-6 first:rounded-tl-xl last:rounded-tr-xl";

  const bodyCellClass =
    "px-6 py-4 text-sm text-slate-600 border-b border-gray-200 whitespace-nowrap first:pl-6 last:pr-6 font-medium";

  const { hasPermission } = usePermission();

  const actions = {
    handleView,
    handleEdit,
    handleDelete,
    handleReply,
    handleDownloadInvoice,
    handleStatusChange,
    handleReview,
    handleResendInvite,
    handleClearSessions,
    handleAddNote,
    viewPermission,
    editPermission,
    deletePermission,
    replyPermission,
    reviewPermission,
    statusChangePermission,
    createPermission,
    resendInvitePermission,
    clearSessionsPermission,
    notesPermission,
    hasPermission,
  };

  const numColumns = config.columns
    ? config.columns.length + (showCollapsible ? 1 : 0)
    : React.Children.count(config.header(headerCellClass).props.children) + (showCollapsible ? 1 : 0);

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-200">
      <div className="w-full overflow-x-auto rounded-t-xl">
        <table
          className="w-full border-collapse"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="hidden md:table-header-group">
            <tr>
              {showCollapsible && <th className="px-6 py-4 w-[5%] bg-primary border-b border-primary-light first:rounded-tl-xl"></th>}
              {config.columns ? (
                config.columns.map((col, index) => (
                  <SortableHeader
                    key={col.key || index}
                    label={col.label}
                    sortKey={col.sortKey || col.key}
                    currentSort={sortConfig}
                    onSort={handleSort}
                    className={`${headerCellClass} ${col.width || ''}`}
                    sortable={col.sortable !== false}
                    truncateLabel={col.truncateLabel === true}
                  />
                ))
              ) : (
                config.header(headerCellClass, { handleSort, sortConfig, SortableHeader })
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 block md:table-row-group">
            {sortedRows.map((row) => {
              const rowId = getRowIdentifier(row);
              const isOpen = openRowStates[rowId];

              // Smart Card Render logic: Intercept children to inject labels
              const rowContent = config.renderRow(row, bodyCellClass, actions);
              // Handle Fragment or direct array
              const rawChildren = React.isValidElement(rowContent) && rowContent.type === React.Fragment
                ? rowContent.props.children
                : rowContent;

              const labeledChildren = React.Children.map(rawChildren, (child, index) => {
                if (!React.isValidElement(child)) return child;
                // Add sorting/offset for collapsible column if it exists? No, config.columns maps to renderRow usually.
                const label = config.columns && config.columns[index] ? config.columns[index].label : "";

                return React.cloneElement(child, {
                  "data-label": label,
                  className: `${child.props.className || ""} block md:table-cell flex justify-between md:block items-center border-b last:border-b-0 md:border-b py-2 md:py-4 before:content-[attr(data-label)] before:font-bold before:text-gray-700 before:mr-auto md:before:content-none`
                });
              });

              return (
                <React.Fragment key={rowId}>
                  <tr
                    ref={rowId === defaultExpandedRowId ? expandedRowRef : null}
                    className={`group transition-colors duration-200 hover:bg-primary/5 block md:table-row mb-4 md:mb-0 border md:border-0 rounded-lg md:rounded-none shadow-sm md:shadow-none mx-2 md:mx-0 relative pt-8 md:pt-0 ${
                      rowId === defaultExpandedRowId
                        ? "bg-primary/10 md:bg-primary/10 border-primary/30"
                        : "even:bg-slate-50/50"
                    }`}
                  >
                    {showCollapsible && (
                      <td className="block md:table-cell text-right md:text-left absolute right-2 top-2 md:static border-none md:border-b p-2 md:px-6 md:py-4 z-10">
                        <button
                          aria-label="expand row"
                          onClick={() => toggleRow(rowId)}
                          className={`p-1.5 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-200 ${isOpen ? "rotate-180 bg-primary/10 text-primary" : "rotate-0"
                            }`}
                        >
                          <KeyboardArrowDown />
                        </button>
                      </td>
                    )}
                    {labeledChildren}
                  </tr>

                  {showCollapsible && config.CollapsibleContent && (
                    <tr>
                      <td colSpan={numColumns} className="p-0 border-b border-gray-200">
                        <div
                          className={`grid ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            } transition-all duration-300 ease-in-out`}
                        >
                          <div className="overflow-hidden">
                            <div className="p-6 bg-slate-50 inner-shadow border-t border-gray-200">
                              <config.CollapsibleContent
                                row={row}
                                tableType={tableType}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
            {sortedRows.length === 0 && (
              <tr>
                <td
                  colSpan={numColumns}
                  className="px-6 py-16 text-center text-sm text-gray-500 bg-white"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-16 w-16 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center shadow-sm">
                      <svg className="w-8 h-8 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-primary text-base">{TBL.NO_DATA_TITLE}</p>
                      <p className="text-slate-500 text-sm">{TBL.NO_DATA_SUBTITLE}</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sortedRows.length !== 0 && (
        <MemoizedPagination
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </div>
  );
}

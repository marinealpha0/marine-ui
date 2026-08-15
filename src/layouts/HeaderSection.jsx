import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PersonAddAltIcon,
  AddIcon,
  RefreshIcon,
  KeyboardArrowDownIcon,
  CalendarTodayIcon,
  MoreVertical,
} from "@/assets/icons";
import TimeRangeDropdown from "@/components/filters/TimeRangeDropdown";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useHoverDropdown } from "@/Hooks/useHoverDropdown";


const HeaderSection = ({
  title,
  subtitle,
  onTimeRangeChange,
  showTimeRangeDropdown = false,
  selectedTimeRange = "Week",
  actions = [],
  onRefresh,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const {
    open: menuOpen,
    setOpen: setMenuOpen,
    triggerProps: menuTriggerProps,
    contentProps: menuContentProps,
  } = useHoverDropdown();

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleTimeRangeChange = (timeRange) => {
    if (onTimeRangeChange) {
      onTimeRangeChange(timeRange);
    }
  };

  const allActions = [...actions];
  if (onRefresh) {
    // Always Refresh first: [Refresh, Add, Import, Export, Reset, ...]
    allActions.unshift({
      label: "Refresh",
      icon: <RefreshIcon className="h-4 w-4" />,
      onClick: onRefresh,
    });
  }

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-5">
      {/* Left: Title and Subtitle */}
      <div>
        {/* Page Title - responsive size */}
        <h4 className="relative font-bold text-primary text-2xl sm:text-[34px] after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-[60px] after:h-[3px] after:bg-primary">
          {title}
        </h4>

        {/* Subtitle - responsive size */}
        {subtitle && (
          <p className="text-grey-500 mt-2 sm:mt-3 text-sm sm:text-[16px]">{subtitle}</p>
        )}
      </div>

      {/* Right: Dropdown + Button */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
        {showTimeRangeDropdown && (
          <>
            <button
              className="flex items-center justify-between min-w-[140px] px-4 py-2 rounded-md font-semibold text-primary border-2 border-primary bg-transparent transition-all hover:bg-primary hover:text-primary-foreground active:translate-y-0 active:shadow-md transform hover:-translate-y-1 flex-1 sm:flex-none"
              onClick={handleDropdownClick}
              aria-controls={open ? "time-range-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <CalendarTodayIcon className="mr-2" />
              <span>{selectedTimeRange}</span>
              <KeyboardArrowDownIcon className="ml-2" />
            </button>
            <TimeRangeDropdown
              anchorEl={anchorEl}
              open={open}
              onClose={handleDropdownClose}
              selectedTimeRange={selectedTimeRange}
              onTimeRangeChange={handleTimeRangeChange}
            />
          </>
        )}

        {allActions.length > 0 && (
          <div className="flex-1 sm:flex-none">
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border border-slate-200 bg-background hover:bg-slate-100/80 rounded-xl transition-all shadow-sm flex items-center justify-center"
                  {...menuTriggerProps}
                >
                  <MoreVertical className="h-5 w-5 text-slate-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white border border-slate-100 shadow-xl rounded-xl p-1 z-50"
                {...menuContentProps}
              >
                {allActions.map((action, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={(e) => {
                      action.onClick(e);
                      setMenuOpen(false);
                    }}
                    disabled={action.disabled}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-primary hover:text-white cursor-pointer rounded-lg transition-colors focus:bg-primary focus:text-white outline-none disabled:opacity-50 disabled:pointer-events-none group"
                  >
                    {action.icon && (
                      <span className="flex items-center justify-center text-slate-500 w-4 h-4 shrink-0 group-hover:text-white group-focus:text-white">
                        {action.icon}
                      </span>
                    )}
                    <span className="truncate">{action.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderSection;

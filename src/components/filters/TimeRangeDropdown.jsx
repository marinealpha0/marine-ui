import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "@/assets/icons";

const TimeRangeDropdown = ({
  anchorEl,
  open,
  onClose,
  selectedTimeRange,
  onTimeRangeChange,
  timeRangeOptions = [
    "Day",
    "Week",
    "Month",
    "Year",
    "Life Time",
    "Custom Date Range",
  ],
}) => {
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const menuRef = useRef(null);

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        anchorEl &&
        !anchorEl.contains(event.target)
      ) {
        handleMenuClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, anchorEl]);

  const handleTimeRangeSelect = (timeRange) => {
    if (timeRange === "Custom Date Range") {
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
      onClose();
      if (onTimeRangeChange) {
        onTimeRangeChange(timeRange);
      }
    }
  };

  const handleCustomDateApply = () => {
    if (startDate && endDate) {
      const customRange = `${dayjs(startDate).format("MMM DD")} - ${dayjs(
        endDate
      ).format("MMM DD, YYYY")}`;
      onClose();
      setShowCustomDatePicker(false);
      if (onTimeRangeChange) {
        onTimeRangeChange({
          type: "custom",
          startDate: startDate,
          endDate: endDate,
          label: customRange,
        });
      }
    }
  };

  const handleBack = () => {
    setShowCustomDatePicker(false);
    setStartDate(null);
    setEndDate(null);
    if (onTimeRangeChange) {
      onTimeRangeChange("Week");
    }
  };

  const handleMenuClose = () => {
    // Reset to Week when clicking outside
    if (showCustomDatePicker) {
      setShowCustomDatePicker(false);
      setStartDate(null);
      setEndDate(null);
      if (onTimeRangeChange) {
        onTimeRangeChange("Week");
      }
    }
    onClose();
  };

  if (!open) {
    return null;
  }

  // Calculate position of the dropdown relative to anchorEl
  const getMenuPosition = () => {
    if (!anchorEl) return {};
    const rect = anchorEl.getBoundingClientRect();
    const menuWidth = showCustomDatePicker ? 350 : 180;
    
    // Check if the dropdown would go off the right side of the screen (with safety margin)
    const wouldGoOffscreen = rect.left + menuWidth > window.innerWidth - 48;
    
    if (wouldGoOffscreen) {
      return {
        position: "fixed",
        top: rect.bottom + 8,
        left: Math.max(16, rect.right - menuWidth),
      };
    }
    
    return {
      position: "fixed",
      top: rect.bottom + 8,
      left: rect.left,
    };
  };

  return (
    <div
      ref={menuRef}
      id="time-range-menu"
      className="fixed z-50 bg-white rounded-md shadow-lg py-1 mt-1 border border-gray-100"
      style={{
        ...getMenuPosition(),
        minWidth: showCustomDatePicker ? "350px" : "180px",
      }}
    >
      {!showCustomDatePicker ? (
        timeRangeOptions.map((option) => (
          <div
            key={option}
            onClick={() => handleTimeRangeSelect(option)}
            className={`px-4 py-2 text-sm cursor-pointer hover:bg-primary-hover hover:text-primary-foreground
                            ${selectedTimeRange === option
                ? "bg-primary text-primary-foreground"
                : ""
              }
                        `}
          >
            {option}
          </div>
        ))
      ) : (
        <div className="p-4">
          <p className="mb-2 font-semibold text-sm">Select Custom Date Range</p>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="start-date"
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      dayjs(startDate).format("MMM DD, YYYY")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => {
                      if (endDate) {
                        const maxD = dayjs(endDate).isAfter(dayjs())
                          ? new Date()
                          : endDate;
                        return date > maxD;
                      } else {
                        return date > new Date();
                      }
                    }}
                    initialFocus
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={2030}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="end-date"
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      dayjs(endDate).format("MMM DD, YYYY")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) =>
                      date > new Date() || (startDate && date < startDate)
                    }
                    initialFocus
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={2030}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2 mt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleBack}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleCustomDateApply}
                disabled={!startDate || !endDate}
                className="flex-1"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeRangeDropdown;

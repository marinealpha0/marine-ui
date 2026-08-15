import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormFieldWrapper } from '@/components/FormFieldWrapper';
import { Form } from '@/components/ui/form';
import { useSearchParams } from 'react-router-dom';

const FilterSection = ({ onFilterChange, filterFields = [] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Helper to extract default/initial values from URL params or fallback
  const getValuesFromParams = useCallback(() => {
    return filterFields.reduce((acc, field) => {
      const paramVal = searchParams.get(field.name);
      if (paramVal !== null) {
        acc[field.name] = paramVal;
      } else {
        acc[field.name] = field.type === 'select' ? 'all' : '';
      }
      return acc;
    }, {});
  }, [filterFields, searchParams]);

  // Initialize form with default values based on fields or URL search params
  const form = useForm({
    defaultValues: getValuesFromParams(),
  });

  // Keep form in sync when URL search params or filter fields change
  useEffect(() => {
    form.reset(getValuesFromParams());
  }, [searchParams, filterFields, form, getValuesFromParams]);

  // Automatically expand the filter section on mount/reload if any active filters are in URL
  useEffect(() => {
    const hasActiveFilters = filterFields.some((field) => {
      const val = searchParams.get(field.name);
      return val !== null && val !== 'all' && val !== '';
    });
    if (hasActiveFilters) {
      setIsExpanded(true);
    }
  }, [filterFields, searchParams]);

  const handleToggle = () => setIsExpanded(!isExpanded);

  const onSubmit = (data) => {
    onFilterChange(data);
  };

  const handleResetFilters = () => {
    const defaults = filterFields.reduce((acc, field) => {
      acc[field.name] = field.type === 'select' ? 'all' : '';
      return acc;
    }, {});
    form.reset(defaults);

    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      filterFields.forEach((field) => {
        next.delete(field.name);
      });
      next.delete('page');
      next.delete('limit');
      return next;
    });

    onFilterChange(defaults);
  };

  return (
    <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-white">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={handleToggle}
      >
        <h6 className="font-semibold text-lg">Filters</h6>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
        >
          {/* Expand Icon */}
          <svg
            className="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>

      {/* Body */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
              {filterFields.map((field) => {
                // Ensure "All" option exists for selects
                let options = field.options || [];
                if (field.type === 'select') {
                  // Check if 'all' option already exists to avoid duplication if re-rendering
                  const hasAll = options.some(opt => opt.value === 'all');
                  if (!hasAll) {
                    options = [{ value: 'all', label: 'All' }, ...options];
                  }
                }

                return (
                  <FormFieldWrapper
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    label={field.label}
                    type={field.type}
                    options={options}
                    placeholder={field.label}
                    loading={field.loading}
                    onOpenChange={field.onOpenChange}
                  />
                );
              })}

              {/* Buttons */}
              <div className="flex justify-end col-span-full gap-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetFilters}
                  className="h-10 w-[150px] border border-primary text-primary rounded-[8px] text-sm text-medium hover:bg-grey-50 hover:border-grey-50 hover:text-grey-50 transition-all"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  style={{ color: 'white' }}
                  className="h-10 w-[150px] bg-primary text-primary-foreground rounded-[8px] text-sm text-medium hover:bg-grey-50 transition-all"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FilterSection;

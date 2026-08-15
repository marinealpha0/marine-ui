// Date utility functions for converting time ranges to Unix timestamps
import dayjs from 'dayjs';
import { Regex } from "@/constant";

// Convert time range to start and end dates (Unix timestamps)
export const getTimeRangeDates = (timeRange) => {
    const now = dayjs();
    let startDate, endDate;

    switch (timeRange) {
        case 'Day':
            startDate = now.subtract(1, 'day');
            endDate = now;
            break;
        case 'Week':
            startDate = now.subtract(7, 'day');
            endDate = now;
            break;
        case 'Month':
            startDate = now.subtract(1, 'month');
            endDate = now;
            break;
        case 'Year':
            startDate = now.subtract(1, 'year');
            endDate = now;
            break;
        case 'Life Time':
            startDate = dayjs('2020-01-01'); // Set a reasonable start date
            endDate = now;
            break;
        default:
            // Custom date range
            if (typeof timeRange === 'object' && timeRange.type === 'custom') {
                startDate = dayjs(timeRange.startDate);
                endDate = dayjs(timeRange.endDate);
            } else {
                // Default to week
                startDate = now.subtract(7, 'day');
                endDate = now;
            }
    }

    return {
        startDate: startDate.unix(),
        endDate: endDate.unix()
    };
};

// Convert Date object/string to Unix timestamp (seconds)
export const toUnixTimestamp = (date) => {
    if (!date) return null;
    
    // If it's already a number, check if it's in seconds or milliseconds
     const timestamp = new Date(date).getTime();

  if (isNaN(timestamp)) {
    throw new Error("Invalid date format");
  }

  return Math.floor(timestamp / 1000);
}

// Format Unix timestamp or Date to readable date string (YYYY-MM-DD)
export const formatDate = (timestamp) => {
    if (timestamp === null || timestamp === undefined) return '';
    
    const dateStr = String(timestamp).trim();
    if (!dateStr) return '';

    // If it's already in YYYY-MM-DD format, return as is
    if (Regex.ISO_DATE_STRING_REGEX.test(dateStr)) {
        return dateStr;
    }

    // Deterministically parse DD-MM-YYYY format
    const ddMMyyyyMatch = dateStr.match(Regex.DD_MM_YYYY_CAPTURE_REGEX);
    if (ddMMyyyyMatch) {
        const [, day, month, year] = ddMMyyyyMatch;
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    // Check if it's a numeric string or number
    let ts = timestamp;
    if (typeof ts === 'string' && Regex.NUMERIC_STRING_REGEX.test(ts)) {
        ts = parseInt(ts, 10);
    }

    if (typeof ts === 'number') {
        const ms = ts < 10000000000 ? ts * 1000 : ts;
        return dayjs(ms).format('YYYY-MM-DD');
    }

    const d = dayjs(ts);
    return d.isValid() ? d.format('YYYY-MM-DD') : '';
};

// Format date to 'DD-MM-YYYY' for input fields
export const formatDateForInput = (timestamp) => {
    if (timestamp === null || timestamp === undefined) return '';
    
    const dateStr = String(timestamp).trim();
    if (!dateStr) return '';

    // If it's already in DD-MM-YYYY format, return as is
    if (Regex.DASHED_DATE_STRING_REGEX.test(dateStr)) {
        return dateStr;
    }

    // Deterministically parse YYYY-MM-DD format
    const yyyyMMddMatch = dateStr.match(Regex.YYYY_MM_DD_CAPTURE_REGEX);
    if (yyyyMMddMatch) {
        const [, year, month, day] = yyyyMMddMatch;
        return `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
    }

    // Check if it's a numeric string or number
    let ts = timestamp;
    if (typeof ts === 'string' && Regex.NUMERIC_STRING_REGEX.test(ts)) {
        ts = parseInt(ts, 10);
    }

    if (typeof ts === 'number') {
        const ms = ts < 10000000000 ? ts * 1000 : ts;
        return dayjs(ms).format('DD-MM-YYYY');
    }

    const d = dayjs(ts);
    return d.isValid() ? d.format('DD-MM-YYYY') : '';
};

// Format a date string / ISO timestamp to a human-readable date (e.g. "04 Mar 2025")
// Handles ISO strings, Unix timestamps (seconds & ms), and YYYY-MM-DD strings.
export const formatDisplayDate = (value) => {
    if (value === null || value === undefined || value === '') return '—';

    let ts = value;

    // Numeric Unix timestamp
    if (typeof ts === 'string' && Regex.NUMERIC_STRING_REGEX.test(ts)) {
        ts = parseInt(ts, 10);
    }
    if (typeof ts === 'number') {
        const ms = ts < 10000000000 ? ts * 1000 : ts;
        const d = dayjs(ms);
        return d.isValid() ? d.format('DD MMM YYYY') : '—';
    }

    const d = dayjs(ts);
    return d.isValid() ? d.format('DD MMM YYYY') : '—';
};

// Format a date string / ISO timestamp to a human-readable date + time
// (e.g. "13 Jun 2026, 10:46 AM")
export const formatDisplayDateTime = (value) => {
    if (value === null || value === undefined || value === '') return '—';

    let ts = value;

    // Numeric Unix timestamp
    if (typeof ts === 'string' && Regex.NUMERIC_STRING_REGEX.test(ts)) {
        ts = parseInt(ts, 10);
    }
    if (typeof ts === 'number') {
        const ms = ts < 10000000000 ? ts * 1000 : ts;
        const d = dayjs(ms);
        return d.isValid() ? d.format('DD MMM YYYY, hh:mm A') : '—';
    }

    const d = dayjs(ts);
    return d.isValid() ? d.format('DD MMM YYYY, hh:mm A') : '—';
};

// Format to "Thursday, June 21, 2026" or similar
export const formatLongDate = (value) => {
    if (value === null || value === undefined || value === '') return '—';
    const d = dayjs(value);
    return d.isValid() ? d.format('dddd, MMMM D, YYYY') : '—';
};

// Get a timeline/chat section label (e.g. "Today", "Yesterday", or "Thursday, June 21, 2026")
export const getTimelineDateLabel = (value) => {
    if (value === null || value === undefined || value === '') return '—';
    
    let ts = value;
    // Numeric Unix timestamp
    if (typeof ts === 'string' && Regex.NUMERIC_STRING_REGEX.test(ts)) {
        ts = parseInt(ts, 10);
    }
    if (typeof ts === 'number') {
        ts = ts < 10000000000 ? ts * 1000 : ts;
    }
    
    const d = dayjs(ts);
    if (!d.isValid()) return '—';

    const today = dayjs().startOf('day');
    const inputDate = d.startOf('day');
    const diffDays = today.diff(inputDate, 'day');

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    
    return d.format('dddd, MMMM D, YYYY');
};

// Format a date string / ISO timestamp to a human-readable time (e.g. "10:46 AM")
export const formatDisplayTime = (value) => {
    if (value === null || value === undefined || value === '') return '—';

    let ts = value;

    // Numeric Unix timestamp
    if (typeof ts === 'string' && Regex.NUMERIC_STRING_REGEX.test(ts)) {
        ts = parseInt(ts, 10);
    }
    if (typeof ts === 'number') {
        const ms = ts < 10000000000 ? ts * 1000 : ts;
        const d = dayjs(ms);
        return d.isValid() ? d.format('hh:mm A') : '—';
    }

    const d = dayjs(ts);
    return d.isValid() ? d.format('hh:mm A') : '—';
};

// Get human readable time differences for notifications
export const formatNotificationTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp.toString().length === 10 ? timestamp * 1000 : timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDisplayDate(date);
};
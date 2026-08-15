import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook to enable hover-to-open functionality on Dropdown menus for desktop/laptops (with hover support)
 * while preserving touch/click behaviors on mobile and tablets (without hover support).
 */
export function useHoverDropdown() {
    const [open, setOpen] = useState(false);
    const [openedViaHover, setOpenedViaHover] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpenedViaHover(true);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setOpen(false);
            setOpenedViaHover(false);
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Close the dropdown on scroll (for non-modal behavior)
    useEffect(() => {
        if (!open) return;

        const handleScroll = () => {
            setOpen(false);
            setOpenedViaHover(false);
        };

        window.addEventListener('scroll', handleScroll, { capture: true, passive: true });
        return () => window.removeEventListener('scroll', handleScroll, { capture: true });
    }, [open]);

    // Check if device supports hover
    const [hasHover, setHasHover] = useState(false);
    useEffect(() => {
        const mediaQuery = window.matchMedia('(hover: hover)');
        setHasHover(mediaQuery.matches);
        const handler = (e) => setHasHover(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const triggerProps = hasHover ? {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    } : {};

    const contentProps = {
        ...(hasHover ? {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        } : {}),
        onOpenAutoFocus: (e) => {
            if (openedViaHover) {
                e.preventDefault();
            }
        },
    };

    const handleOpenChange = (nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
            setOpenedViaHover(false);
        }
    };

    return {
        open,
        setOpen: handleOpenChange,
        triggerProps,
        contentProps,
    };
}

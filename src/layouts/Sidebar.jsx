import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight } from "@/assets/icons";
import { getIcon } from "@/utils/iconMapper";
import { useAuthStore, useSidebarStore } from "@/store";
import { CustomTooltip } from "@/components/ui/tooltip";


export const Sidebar = ({ onCollapseChange }) => {
  const user = useAuthStore((state) => state.user);
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const storeToggleCollapse = useSidebarStore((state) => state.toggleCollapse);
  const sidebar = useSidebarStore((state) => state.sidebar);
  const [openParent, setOpenParent] = useState(null);
  const [lastPath, setLastPath] = useState("");

  const location = useLocation();

  const toggleCollapse = () => {
    storeToggleCollapse();
    if (!isCollapsed) {
      setOpenParent(null);
    }
  };

  useEffect(() => {
    if (onCollapseChange) onCollapseChange(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  const handleParentClick = (itemName) => {
    if (isCollapsed) return;
    setOpenParent(openParent === itemName ? null : itemName);
  };

  const isActive = (path) => location.pathname === path;

  const isParentActive = (item) => {
    if (isActive(item.href)) return true;
    if (item.children && item.children.length > 0) {
      return item.children.some(child => isActive(child.href));
    }
    return false;
  };

  // Transform API sidebar data to component format
  const sidebarData = React.useMemo(() => {
    if (!sidebar || sidebar.length === 0) return [];

    const mappedItems = sidebar.map(item => {
      const ParentIcon = getIcon(item.icon);
      
      // Map and sort submenu items alphabetically
      const sortedChildren = item.children ? item.children.map(child => {
        const ChildIcon = child.icon ? getIcon(child.icon) : null;
        return {
          name: child.name,
          href: child.path,
          icon: ChildIcon ? <ChildIcon className="w-4 h-4 shrink-0" /> : null
        };
      }).sort((a, b) => a.name.localeCompare(b.name)) : [];

      return {
        name: item.name,
        href: item.path === '#' ? '#' : item.path,
        icon: <ParentIcon className="w-5 h-5 shrink-0" />,
        children: sortedChildren
      };
    });

    // Find Dashboard item (by name or path) to pin it to the top
    const dashboardItem = mappedItems.find(item => 
      item.name.toLowerCase() === 'dashboard' || 
      item.href === '/dashboard' ||
      item.href === '/admin/dashboard'
    );
    const otherItems = mappedItems.filter(item => 
      item.name.toLowerCase() !== 'dashboard' && 
      item.href !== '/dashboard' &&
      item.href !== '/admin/dashboard'
    );

    // Sort other main menu items alphabetically
    otherItems.sort((a, b) => a.name.localeCompare(b.name));

    // Combine with Dashboard always first
    return dashboardItem ? [dashboardItem, ...otherItems] : otherItems;
  }, [sidebar]);

  // Open the parent menu automatically if a child route is active
  useEffect(() => {
    if (!isCollapsed && sidebarData.length > 0 && location.pathname !== lastPath) {
      setLastPath(location.pathname);
      const activeParent = sidebarData.find(item =>
        item.children && item.children.some(child => isActive(child.href))
      );
      if (activeParent) {
        setOpenParent(activeParent.name);
      }
    }
  }, [location.pathname, isCollapsed, sidebarData, lastPath]);

  return (
    <aside
      className={`group fixed top-0 mt-[64.8px] left-0 z-40 h-screen transition-[width] duration-300 border-r border-gray-200 dark:border-gray-700 ${isCollapsed ? "w-0 md:w-16" : "w-72"
        }`}

      aria-label="Sidebar"
    >
      {/* Collapse button */}
      <button
        type="button"
        onClick={toggleCollapse}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-4 top-5 flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-white shadow-md text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <div
        className={`h-full ${isCollapsed ? "md:px-2 px-0" : "px-3"
          } py-4 overflow-y-auto bg-white dark:bg-gray-900 overflow-x-hidden`}
      >
        <ul className="space-y-1 text-medium">
          {sidebarData.map((item) => (
            <li key={item.name}>
              {item.children.length === 0 ? (
                <CustomTooltip
                  content={item.name}
                  position="right"
                  disabled={!isCollapsed}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center p-2 rounded-lg group transition-all duration-200 ${isActive(item.href)
                      ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      } ${isCollapsed ? "justify-center" : ""}`}
                  >
                    {item.icon}
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 ms-3 whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.name}
                        </span>
                        {/* Pro/Badge logic can be re-added if API sends it, currently using basic structure */}
                      </>
                    )}
                  </Link>
                </CustomTooltip>
              ) : (
                <>
                  {/* Parent Item with Submenu */}
                  <CustomTooltip
                    content={item.name}
                    position="right"
                    disabled={!isCollapsed}
                  >
                    <button
                      type="button"
                      onClick={() => handleParentClick(item.name)}
                      className={`text-left flex items-center w-full p-2 rounded-lg group transition-all duration-200 ${
                        isActive(item.href)
                          ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light"
                          : isParentActive(item)
                          ? "bg-primary/5 text-primary-light dark:bg-primary/10 dark:text-primary-light"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                      } ${isCollapsed ? "justify-center" : ""}`}
                    >
                      {item.icon}
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 ms-3 whitespace-nowrap overflow-hidden text-ellipsis">{item.name}</span>
                          <ChevronDown
                            className={`ml-auto w-4 h-4 transform transition-transform ${openParent === item.name ? "rotate-180" : ""
                              }`}
                          />
                        </>
                      )}
                    </button>
                  </CustomTooltip>

                  {/* Submenu */}
                  {!isCollapsed && (
                    <ul
                      className={`pl-8 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${openParent === item.name
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                        }`}
                    >
                      {item.children.map((child) => (
                        <li key={child.name}>
                          <Link
                            to={child.href}
                            className={`flex items-center p-2 rounded-lg text-sm transition-all duration-200 ${isActive(child.href)
                              ? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light"
                              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                              }`}
                          >
                            {child.icon && (
                              <span className="mr-2">{child.icon}</span>
                            )}
                            <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">{child.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside >
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, LogOut } from "@/assets/icons";
import { NotificationPanel } from "@/components/notifications/NotificationPanel";
import { DummyAvatar } from "@/components/ui/dummyAvatar";
import { useAuthStore } from "@/store";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  // Handle user data from context with fallbacks
  const displayName = user?.adminName || user?.name || "Admin";
  const profileImg = user?.profileImg;

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = (e) => {
    e?.preventDefault();
    logout();
    navigate("/login");
  };

  const handleChangeNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white flex items-center justify-end md:justify-between whitespace-nowrap border-b border-solid border-border px-10 py-3">
      {/* Left side: Logo and Title */}
      <div className="flex items-center gap-4 text-foreground hidden md:block">
        <img
          src="/logo.png"
          alt="Udyog Vriksh"
          className="h-10 w-auto"
          loading="lazy"
          decoding="sync"
        />
      </div>

      {/* Right side: Icons and User Menu */}
      <div className="flex items-center gap-5">
        {/* Notification Panel */}
        <NotificationPanel
          trigger={
            <div className="relative cursor-pointer mt-2">
              <button className="focus:outline-none">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
              </button>
            </div>
          }
        />

        {/* User Avatar and Dropdown */}
        <div className="relative cursor-pointer">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-3 focus:outline-none"
          >
            {profileImg && profileImg !== "undefined" ? (
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{ backgroundImage: `url(${profileImg})` }}
              />
            ) : (
              <DummyAvatar name={displayName} />
            )}
            <span className="text-sm text-medium text-foreground hidden md:block">
              {displayName}
            </span>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white rounded-md shadow-lg border border-border w-48 z-10">
              <ul className="py-1">
                <li onClick={() => handleChangeNavigation("/profile")}>
                  <a className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer transition-colors duration-150">
                    <User className="w-4 h-4 mr-2.5 text-gray-500 dark:text-gray-400" />
                    <span>Profile</span>
                  </a>
                </li>
                <li onClick={() => handleChangeNavigation("/settings")}>
                  <a className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted cursor-pointer transition-colors duration-150">
                    <Settings className="w-4 h-4 mr-2.5 text-gray-500 dark:text-gray-400" />
                    <span>Settings</span>
                  </a>
                </li>
                <li onClick={handleLogout}>
                  <a
                    className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors duration-150 cursor-pointer group"
                  >
                    <LogOut className="w-4 h-4 mr-2.5 text-gray-500 dark:text-gray-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

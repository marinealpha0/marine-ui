// src/utils/authStorage.js

const ADMIN_NAME_KEY = 'adminName';
const PROFILE_IMG_KEY = 'profileImg';
const PROFILE_COMPLETE_KEY = 'profileComplete';

export const saveAdminData = (adminName, profileImg, profileComplete) => {
  // Do NOT store profile image, admin name, or profileComplete in localStorage
};

export const getAdminData = () => {
  // Do not read from localStorage, return defaults
  return { adminName: null, profileImg: null, profileComplete: false };
};

export const clearAdminData = () => {
  // Clear any existing legacy keys from localStorage
  localStorage.removeItem(ADMIN_NAME_KEY);
  localStorage.removeItem(PROFILE_IMG_KEY);
  localStorage.removeItem(PROFILE_COMPLETE_KEY);
};

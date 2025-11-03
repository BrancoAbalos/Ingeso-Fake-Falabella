import { FiSettings } from 'react-icons/fi';

// Resource URLs
export const RESOURCES = Object.freeze({
  VITE_LOGO: '/vite.svg',
  VITE_BACK: '/vite.svg',
  SettingIcon: FiSettings,
} as const);

// Route Constants
export const ROUTES = Object.freeze({
  LOGIN: '/login',
  SETTINGS: '/settings',

  HOME: '/',
} as const);
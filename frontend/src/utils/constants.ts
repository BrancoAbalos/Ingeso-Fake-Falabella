import { FiSettings } from 'react-icons/fi';
import { FaShoppingCart } from 'react-icons/fa';

// Resource URLs
export const RESOURCES = Object.freeze({
  VITE_LOGO: '/vite.svg',
  VITE_BACK: '/vite.svg',
  ShoppingCart: FaShoppingCart,
  SettingIcon: FiSettings,
} as const);

// Route Constants
export const ROUTES = Object.freeze({
  LOGIN: '/login',
  SETTINGS: '/settings',
  CHECKOUT: '/checkout',

  HOME: '/',
} as const);
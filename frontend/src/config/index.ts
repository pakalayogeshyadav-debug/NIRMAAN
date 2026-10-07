/**
 * NIRMAAN — Application Configuration
 *
 * Centralized application config sourced from environment variables.
 * All env vars should be accessed through this module, never directly
 * from import.meta.env in components.
 */

export const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || 'NIRMAAN',
    env: import.meta.env.VITE_APP_ENV || 'development',
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
  },
} as const;

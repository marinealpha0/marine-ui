/**
 * Environment utility functions
 * Checks Vite import.meta.env variables
 */

/**
 * Check if the app is running in production mode
 * @returns {boolean} True if in production
 */
export const isProduction = () => {
    const appEnv = import.meta.env.VITE_APP_ENV || import.meta.env.MODE;
    if (appEnv) {
        return appEnv.toUpperCase() === 'PRODUCTION' || appEnv.toUpperCase() === 'PROD';
    }

    return import.meta.env.PROD;
};

/**
 * Check if the app is running in development mode
 * @returns {boolean} True if in development
 */
export const isDevelopment = () => {
    return !isProduction();
};

/**
 * Get the current environment name
 * @returns {string} Environment name (production, development, local, qa, uat, etc.)
 */
export const getEnvironment = () => {
    return import.meta.env.VITE_APP_ENV ||
        import.meta.env.MODE ||
        'development';
};

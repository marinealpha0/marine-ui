import React, { createContext, useState, useContext } from 'react';

export const ErrorContext = createContext(null);

export const ErrorProvider = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    const [message, setMessage] = useState('');

    const setGlobalError = (errorMessage) => {
        setHasError(true);
        setMessage(errorMessage);
    };

    const clearGlobalError = () => {
        setHasError(false);
        setMessage('');
    };

    return (
        <ErrorContext.Provider value={{ hasError, message, setGlobalError, clearGlobalError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within ErrorProvider');
    }
    return context;
};

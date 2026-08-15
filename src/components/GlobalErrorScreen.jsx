import React from 'react';
import { useError } from '@/store/ErrorContext';

const GlobalErrorScreen = () => {
    const { message, clearGlobalError } = useError();

    const handleRetry = () => {
        clearGlobalError();
        window.location.reload();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-md w-full mx-4 p-8 bg-white rounded-2xl shadow-2xl text-center">
                {/* Error Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Error Title */}
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Something went wrong
                </h2>

                {/* Error Message */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                    {message || "We're experiencing technical difficulties. Please try again."}
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleRetry}
                        className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        Retry
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors duration-200"
                    >
                        Go to Home
                    </button>
                </div>

                {/* Help Text */}
                <p className="mt-6 text-sm text-gray-500">
                    If the problem persists, please try reinstalling the app or contact support.
                </p>
            </div>
        </div>
    );
};

export default GlobalErrorScreen;

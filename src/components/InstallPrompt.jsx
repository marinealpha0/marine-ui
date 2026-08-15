import React from 'react';

const InstallPrompt = ({ onInstall, onCancel }) => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
                {/* Decorative gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

                {/* Content */}
                <div className="relative p-6">
                    {/* App Icon with glow effect */}
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                            <img
                                src="/logo192.png"
                                alt="Udyog Vriksh Admin"
                                className="relative w-16 h-16 rounded-xl shadow-lg ring-2 ring-white dark:ring-gray-800"
                            />
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">
                        Get Udyog Vriksh Admin
                    </h3>

                    {/* Subtitle */}
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-5">
                        Install admin portal for quick access and better management
                    </p>

                    {/* Benefits - Compact version */}
                    <div className="space-y-2 mb-5">
                        <div className="flex items-center gap-2 text-sm">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">Lightning fast performance</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">Quick home screen access</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">Secure & reliable</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2.5">
                        <button
                            onClick={onInstall}
                            className="w-full group relative px-5 py-3 bg-gradient-to-r from-primary to-primary-hover text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Install Now
                            </span>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>

                        <button
                            onClick={onCancel}
                            className="w-full px-5 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all duration-200"
                        >
                            Maybe Later
                        </button>
                    </div>

                    {/* Small note */}
                    <p className="mt-3 text-xs text-center text-gray-500 dark:text-gray-500">
                        Enhance your admin experience
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InstallPrompt;

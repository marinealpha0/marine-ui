import React from "react";
import { Layers, Box } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import SpinnerOverlay from "@/components/ui/SpinnerOverlay";
import { getIcon } from "@/utils/iconMapper";

const ModuleIcon = ({ iconName, className, size }) => {
    const Icon = getIcon(iconName);
    return <Icon className={className} size={size} />;
};

const ViewModuleDialog = ({ open, onClose, moduleDetails, isLoading }) => {
    if (!open) return null;

    return (
        <>
            {isLoading && <SpinnerOverlay />}

            {!isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                        {moduleDetails ? (
                            <>
                                {/* Modal Header */}
                                <div className="p-6 py-4 border-b border-gray-100 flex justify-between items-start bg-slate-50/50">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 bg-primary rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center text-white shrink-0">
                                            <ModuleIcon iconName={moduleDetails.icon} size={20} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">{moduleDetails.name}</h2>
                                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">{moduleDetails.key}</span>
                                                <span>•</span>
                                                <span className="truncate max-w-md">{moduleDetails.routePattern}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 bg-white space-y-8">
                                    {/* Description */}
                                    {moduleDetails.description && (
                                        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 text-primary text-sm leading-relaxed">
                                            <span className="font-semibold block mb-1 text-primary-hover">Description</span>
                                            {moduleDetails.description}
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Direct Actions Column */}
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                <Box size={16} className="text-emerald-500" />
                                                Direct Actions
                                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full normal-case">{moduleDetails.actions?.length || 0}</span>
                                            </h3>
                                            <div className="space-y-3">
                                                {moduleDetails.actions?.length > 0 ? moduleDetails.actions.map(action => (
                                                    <div key={action._id} className="p-3 border border-gray-100 rounded-lg hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors group">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <div className="flex items-center gap-2 font-medium text-gray-700">
                                                                <ModuleIcon iconName={action.icon} className="text-emerald-500" size={16} />
                                                                {action.name}
                                                            </div>
                                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${action.method === 'GET' ? 'bg-blue-100 text-blue-700' : action.method === 'POST' ? 'bg-emerald-100 text-emerald-700' : action.method === 'DELETE' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{action.method}</span>
                                                        </div>
                                                        <div className="text-xs text-gray-400 pl-6">{action.key}</div>
                                                    </div>
                                                )) : (
                                                    <div className="text-sm text-gray-400 italic pl-2">No direct actions</div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Submodules Column */}
                                        <div>
                                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                <Layers size={16} className="text-purple-500" />
                                                Submodules
                                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full normal-case">{moduleDetails.submodules?.length || 0}</span>
                                            </h3>
                                            <div className="space-y-4">
                                                {moduleDetails.submodules?.length > 0 ? moduleDetails.submodules.map((sub) => (
                                                    <div key={sub._id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                                            <div className="flex items-center gap-2 font-semibold text-gray-700">
                                                                <ModuleIcon iconName={sub.icon} className="text-purple-500" size={18} />
                                                                {sub.name}
                                                            </div>
                                                            <div className="text-[10px] text-gray-400 font-mono">{sub.key}</div>
                                                        </div>
                                                        <div className="p-3 bg-white">
                                                            {sub.actions?.length > 0 ? (
                                                                <div className="grid grid-cols-1 gap-2">
                                                                    {sub.actions.map(action => (
                                                                        <div key={action._id} className="flex items-center justify-between p-2 rounded bg-gray-50/50 border border-transparent hover:border-gray-200 text-sm">
                                                                            <div className="flex items-center gap-2 text-gray-600">
                                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                                                                {action.name}
                                                                            </div>
                                                                            <span className="text-[10px] text-gray-400">{action.method}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="text-sm text-gray-400 italic text-center py-2">No actions defined</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className="text-sm text-gray-400 italic pl-2">No submodules</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {(!moduleDetails.submodules?.length && !moduleDetails.actions?.length) && (
                                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                            <p className="text-gray-400">This module is currently empty.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                                    <Button onClick={onClose} variant="outline">Close Details</Button>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-10 text-gray-400">
                                <p>Failed to load module details.</p>
                                <Button variant="outline" className="mt-4" onClick={onClose}>Close</Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ViewModuleDialog;

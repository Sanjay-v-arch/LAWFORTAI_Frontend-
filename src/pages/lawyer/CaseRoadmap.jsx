import React from 'react';

const CaseRoadmap = () => {
    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-50 dark:bg-slate-900">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Case Roadmap</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    <h3 className="font-semibold mb-2 dark:text-white">Stage-based Roadmap</h3>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    <h3 className="font-semibold mb-2 dark:text-white">Progress Tracker</h3>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    <h3 className="font-semibold mb-2 dark:text-white">Milestones & Reminders</h3>
                </div>
            </div>
        </div>
    );
};

export default CaseRoadmap;

import React from 'react';

const DigitalEvidenceVault = () => {
    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-50 dark:bg-slate-900">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Digital Evidence Vault</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Sub-features as cards for now */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    <h3 className="font-semibold mb-2 dark:text-white">Evidence Upload</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Securely upload digital evidence.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    <h3 className="font-semibold mb-2 dark:text-white">Metadata Form</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Extract and view file metadata.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    <h3 className="font-semibold mb-2 dark:text-white">Chain of Custody</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track evidence handling history.</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
                    <h3 className="font-semibold mb-2 dark:text-white">Integrity Checker</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Verify file hash and integrity.</p>
                </div>
            </div>
        </div>
    );
};

export default DigitalEvidenceVault;

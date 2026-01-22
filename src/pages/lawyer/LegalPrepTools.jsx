import React, { useState } from "react";
import { post } from "../../utils/api";

const LegalPrepTools = () => {
    const [input, setInput] = useState("");
    const [summary, setSummary] = useState("");
    const [draft, setDraft] = useState("");
    const [loading, setLoading] = useState(false);

    const generateSummary = async () => {
        if (!input) return alert("Enter case details");

        try {
            setLoading(true);
            const res = await post("/api/lawyer/summary", { text: input });
            setSummary(res.summary);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const generateDraft = async () => {
        if (!input) return alert("Enter case details");

        try {
            setLoading(true);
            const res = await post("/api/lawyer/draft", { text: input });
            setDraft(res.draft);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-50 dark:bg-slate-900">
            <h1 className="text-3xl font-bold dark:text-white mb-6">
                Legal Prep Tools
            </h1>

            <textarea
                placeholder="Paste case details here..."
                className="w-full mb-4 p-3 rounded border"
                rows={5}
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex gap-4 mb-6">
                <button
                    onClick={generateSummary}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Generate Summary
                </button>

                <button
                    onClick={generateDraft}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Generate Draft
                </button>
            </div>

            {summary && (
                <div className="bg-white dark:bg-slate-800 p-4 rounded mb-4">
                    <h3 className="font-semibold dark:text-white mb-2">
                        Summary
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        {summary}
                    </p>
                </div>
            )}

            {draft && (
                <div className="bg-white dark:bg-slate-800 p-4 rounded">
                    <h3 className="font-semibold dark:text-white mb-2">
                        Draft
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        {draft}
                    </p>
                </div>
            )}
        </div>
    );
};

export default LegalPrepTools;

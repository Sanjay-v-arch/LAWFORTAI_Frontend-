import React, { useState } from "react";
import { post } from "../../utils/api";

const CyberLawIntelligence = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {
        if (!query) return alert("Enter your question");

        try {
            setLoading(true);
            const res = await post("/text-query", { query });
            setResponse(res.answer);
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-50 dark:bg-slate-900">
            <h1 className="text-3xl font-bold dark:text-white mb-6">
                Cyber Law Intelligence
            </h1>

            <textarea
                placeholder="Ask about cyber law, sections, punishments, procedures..."
                className="w-full mb-4 p-3 rounded border"
                rows={4}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <button
                onClick={askAI}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {loading ? "Thinking..." : "Ask AI"}
            </button>

            {response && (
                <div className="mt-6 bg-white dark:bg-slate-800 p-4 rounded">
                    <h3 className="font-semibold dark:text-white mb-2">
                        AI Response
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {response}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CyberLawIntelligence;

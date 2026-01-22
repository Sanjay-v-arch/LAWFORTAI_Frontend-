import React, { useEffect, useState } from "react";
import { get, post } from "../../utils/api";

const CaseRoadmap = () => {
    const [caseId, setCaseId] = useState("");
    const [steps, setSteps] = useState("");
    const [roadmap, setRoadmap] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRoadmap = async () => {
        if (!caseId) return;
        try {
            const data = await get(`/api/lawyer/roadmap/${caseId}`);
            setRoadmap(data);
        } catch (err) {
            console.error(err);
        }
    };

    const createRoadmap = async () => {
        if (!caseId || !steps) return alert("Fill all fields");

        try {
            setLoading(true);
            await post("/api/lawyer/roadmap", {
                case_id: caseId,
                steps: steps.split("\n"),
            });
            setSteps("");
            fetchRoadmap();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-50 dark:bg-slate-900">
            <h1 className="text-3xl font-bold dark:text-white mb-6">
                Case Roadmap
            </h1>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg mb-6">
                <input
                    type="text"
                    placeholder="Case ID"
                    className="w-full mb-2 p-2 rounded border"
                    value={caseId}
                    onChange={(e) => setCaseId(e.target.value)}
                />

                <textarea
                    placeholder="Enter roadmap steps (one per line)"
                    rows={4}
                    className="w-full mb-2 p-2 rounded border"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                />

                <button
                    onClick={createRoadmap}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Saving..." : "Create Roadmap"}
                </button>
            </div>

            <div className="space-y-3">
                {roadmap.map((r, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-slate-800 p-3 rounded shadow"
                    >
                        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
                            {r.steps.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaseRoadmap;

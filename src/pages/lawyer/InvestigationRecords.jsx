import React, { useEffect, useState } from "react";
import { get, post } from "../../utils/api";

const InvestigationRecords = () => {
    const [records, setRecords] = useState([]);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchRecords = async () => {
        try {
            const data = await get("/api/lawyer/records/all"); // ✅ FIXED
            setRecords(data);
        } catch (err) {
            console.error(err);
        }
    };

    const createRecord = async () => {
        if (!title || !details) return alert("Fill all fields");

        try {
            setLoading(true);
            await post("/api/lawyer/records/create", { title, details }); // ✅ FIXED
            setTitle("");
            setDetails("");
            fetchRecords();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-50 dark:bg-slate-900">
            <h1 className="text-3xl font-bold dark:text-white mb-6">
                Investigation Records
            </h1>

            {/* Create Record */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded mb-6">
                <input
                    type="text"
                    placeholder="Record Title"
                    className="w-full mb-2 p-2 rounded border"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Record Details"
                    className="w-full mb-2 p-2 rounded border"
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
                <button
                    onClick={createRecord}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Saving..." : "Add Record"}
                </button>
            </div>

            {/* Records List */}
            <div className="space-y-4">
                {records.map((rec, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-slate-800 p-4 rounded shadow"
                    >
                        <h3 className="font-semibold dark:text-white">
                            {rec.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {rec.details}
                        </p>
                        <p className="text-xs text-gray-400">
                            {new Date(rec.created_at).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvestigationRecords;

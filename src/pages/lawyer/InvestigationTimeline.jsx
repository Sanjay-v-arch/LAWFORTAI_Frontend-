import React, { useEffect, useState } from "react";
import { get, post } from "../../utils/api";

const InvestigationTimeline = () => {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [caseId, setCaseId] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchTimeline = async () => {
        if (!caseId) return;
        try {
            const data = await get(`/api/lawyer/timeline/${caseId}`);
            setEvents(data);
        } catch (err) {
            console.error(err);
        }
    };

    const createEvent = async () => {
        if (!title || !description || !caseId)
            return alert("Fill all fields");

        try {
            setLoading(true);
            await post("/api/lawyer/timeline", {
                title,
                description,
                case_id: caseId,
            });
            setTitle("");
            setDescription("");
            fetchTimeline();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimeline();
    }, [caseId]);

    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-50 dark:bg-slate-900">
            <h1 className="text-3xl font-bold dark:text-white mb-6">
                Investigation Timeline
            </h1>

            {/* Case ID Input */}
            <input
                type="text"
                placeholder="Enter Case ID"
                className="w-full mb-4 p-2 rounded border"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
            />

            {/* Create Event */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded mb-6">
                <input
                    type="text"
                    placeholder="Event Title"
                    className="w-full mb-2 p-2 rounded border"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    className="w-full mb-2 p-2 rounded border"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button
                    onClick={createEvent}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Saving..." : "Add Event"}
                </button>
            </div>

            {/* Timeline Events */}
            <div className="space-y-4">
                {events.map((event, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-slate-800 p-4 rounded shadow"
                    >
                        <p className="font-semibold dark:text-white">
                            {event.title}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            {event.description}
                        </p>
                        <p className="text-xs text-gray-400">
                            {new Date(event.created_at).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvestigationTimeline;

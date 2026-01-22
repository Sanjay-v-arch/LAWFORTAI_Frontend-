import React, { useEffect, useState } from "react";
import { get } from "../../utils/api";

const DigitalEvidenceVault = () => {
    const [file, setFile] = useState(null);
    const [evidence, setEvidence] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEvidence = async () => {
        try {
            const data = await get("/api/lawyer/evidence");
            setEvidence(data);
        } catch (err) {
            console.error(err);
        }
    };

    const uploadEvidence = async () => {
        if (!file) return alert("Select a file first");

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const res = await fetch("http://127.0.0.1:8000/api/lawyer/evidence/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.detail || "Upload failed");

            setFile(null);
            fetchEvidence();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvidence();
    }, []);

    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-50 dark:bg-slate-900">
            <h1 className="text-3xl font-bold dark:text-white mb-6">
                Digital Evidence Vault
            </h1>

            {/* Upload Section */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded mb-6">
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-2"
                />
                <button
                    onClick={uploadEvidence}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Uploading..." : "Upload Evidence"}
                </button>
            </div>

            {/* Evidence List */}
            <div className="space-y-3">
                {evidence.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-slate-800 p-4 rounded shadow"
                    >
                        <p className="font-semibold dark:text-white">
                            {item.filename}
                        </p>
                        <p className="text-xs text-gray-500 break-all">
                            Hash: {item.hash}
                        </p>
                        <p className="text-xs text-gray-400">
                            Uploaded: {new Date(item.uploaded_at).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DigitalEvidenceVault;

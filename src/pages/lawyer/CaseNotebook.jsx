import React, { useEffect, useState } from "react";
import { get, post } from "../../utils/api";

const CaseNotebook = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    // Load all notes
    const fetchNotes = async () => {
        try {
            const data = await get("/api/lawyer/notebook/all");
            setNotes(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Create note
    const createNote = async () => {
        if (!title || !content) return alert("Fill all fields");

        try {
            setLoading(true);
            await post("/api/lawyer/notebook/create", { title, content });
            setTitle("");
            setContent("");
            fetchNotes();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-50 dark:bg-slate-900">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                Case Notebook
            </h1>

            {/* Create Note */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg mb-6">
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full mb-2 p-2 rounded border"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Write your notes..."
                    className="w-full mb-2 p-2 rounded border"
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button
                    onClick={createNote}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Saving..." : "Add Note"}
                </button>
            </div>

            {/* Notes List */}
            <div className="space-y-4">
                {notes.map((note) => (
                    <div
                        key={note._id}
                        className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow"
                    >
                        <h3 className="font-bold text-lg dark:text-white">
                            {note.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {note.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CaseNotebook;

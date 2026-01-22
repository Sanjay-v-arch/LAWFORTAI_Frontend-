import React, { useEffect, useState } from "react";
import { get, post } from "../../utils/api";

const ClientManager = () => {
    const [clients, setClients] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchClients = async () => {
        try {
            const data = await get("/api/lawyer/clients");
            setClients(data);
        } catch (err) {
            console.error(err);
        }
    };

    const createClient = async () => {
        if (!name || !email || !phone) return alert("Fill all fields");

        try {
            setLoading(true);
            await post("/api/lawyer/clients", { name, email, phone });
            setName("");
            setEmail("");
            setPhone("");
            fetchClients();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div className="p-8 pt-24 min-h-screen bg-gray-50 dark:bg-slate-900">
            <h1 className="text-3xl font-bold dark:text-white mb-6">
                Client Manager
            </h1>

            {/* Create Client */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded mb-6">
                <input
                    type="text"
                    placeholder="Client Name"
                    className="w-full mb-2 p-2 rounded border"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-2 p-2 rounded border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    className="w-full mb-2 p-2 rounded border"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <button
                    onClick={createClient}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {loading ? "Saving..." : "Add Client"}
                </button>
            </div>

            {/* Client List */}
            <div className="space-y-4">
                {clients.map((client, idx) => (
                    <div
                        key={idx}
                        className="bg-white dark:bg-slate-800 p-4 rounded shadow"
                    >
                        <p className="font-semibold dark:text-white">
                            {client.name}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                            {client.email}
                        </p>
                        <p className="text-gray-500 text-sm">
                            {client.phone}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClientManager;

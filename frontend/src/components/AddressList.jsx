import { useEffect, useState } from "react";
import axios from "axios";

const AddressList = () => {
    const [addresses, setAddresses] = useState([]);
    const [search, setSearch] = useState("");

    const fetchAddresses = async () => {
        const res = await axios.get("http://localhost:5000/api/addresses");
        setAddresses(res.data);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/addresses/${id}`);
            // Update the local state by removing the deleted address
            setAddresses(addresses.filter((address) => address._id !== id));
        } catch (error) {
            console.error("Error deleting address:", error);
            alert("Error deleting address. Please try again.");
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    return (
        <div className="p-4">
            <div className="overflow-x-auto p-4 bg-white rounded-lg shadow-lg">
            <input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by city or state"
                className="p-2 border rounded mb-4 w-full"
            />
            </div>

            <div className="overflow-x-auto p-4 bg-white rounded-lg shadow-lg mt-4">
                <table className="w-full border-collapse table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Address</th>
                            <th className="border p-2">City</th>
                            <th className="border p-2">State</th>
                            <th className="border p-2">Country</th>
                            <th className="border p-2">PIN Code</th>
                            <th className="border p-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {addresses
                            .filter(
                                (a) =>
                                    a.city.toLowerCase().includes(search.toLowerCase()) ||
                                    a.state.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((a) => (
                                <tr key={a._id}>
                                    <td className="border p-2">{a.addressLine1}</td>
                                    <td className="border p-2">{a.city}</td>
                                    <td className="border p-2">{a.state}</td>
                                    <td className="border p-2">{a.country}</td>
                                    <td className="border p-2">{a.pinCode}</td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => handleDelete(a._id)}
                                            className="text-white bg-red-400 rounded px-3 hover:bg-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddressList;

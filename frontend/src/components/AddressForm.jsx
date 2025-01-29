import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddressForm = ({ fetchAddresses }) => {
    const [formData, setFormData] = useState({
        addressLine1: "",
        pinCode: "",
        city: "",
        state: "",
        country: "India",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePinCode = async () => {
        try {
            const res = await axios.get(`https://api.postalpincode.in/pincode/${formData.pinCode}`);
            const data = res.data[0];

            if (data.Status === "Success") {
                setFormData({
                    ...formData,
                    city: data.PostOffice[0].District,
                    state: data.PostOffice[0].State,
                });
                setError("");
            } else {
                setError("Invalid PIN Code");
                toast.error("Invalid PIN Code! Please enter a valid PIN.");
            }
        } catch (error) {
            setError("Invalid PIN Code");
            toast.error("Invalid PIN Code! Please enter a valid PIN.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.city || !formData.state) {
            setError("City and State are mandatory.");
            toast.error("City and State are mandatory.");
            return;
        }

        if (error) {
            toast.error(error);
            return;
        }

        setError("");

        try {
            await axios.post("http://localhost:5000/api/addresses", formData);
            fetchAddresses();
            setFormData({
                addressLine1: "",
                pinCode: "",
                city: "",
                state: "",
                country: "India",
            });
            toast.success("Address added successfully!");
        } catch (error) {
            setError("Failed to add address. Please try again.");
            toast.error("Failed to add address. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 bg-white shadow-lg rounded-md w-120">
            <h2 className="text-xl font-bold mb-4 text-blue-500">Add Address</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <input
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                placeholder="Flat no. & Street"
                className="w-full p-2 border rounded mb-2"
                required
            />

            <input
                name="pinCode"
                value={formData.pinCode}
                onBlur={handlePinCode}
                onChange={handleChange}
                placeholder="PIN Code"
                className="w-full p-2 border rounded mb-2"
                required
            />

            <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-2 border rounded mb-2"
                required
            />

            <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full p-2 border rounded mb-2"
                required
            />

            <input
                name="country"
                value="India"
                readOnly
                className="w-full p-2 border rounded mb-2 bg-gray-200"
            />

            <button
                type="submit"
                className="w-full bg-blue-400 text-white p-2 rounded cursor-pointer hover:bg-blue-500"
            >
                Add Address
            </button>
        </form>
    );
};

export default AddressForm;

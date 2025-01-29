import { useState } from "react";
import axios from "axios";

const AddressForm = ({ fetchAddresses }) => {
    const [formData, setFormData] = useState({
        addressLine1: "",
        pinCode: "",
        city: "",
        state: "",
        country: "India",
    });

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
            }
        } catch (error) {
            alert("Invalid PIN Code");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/addresses", formData);
        fetchAddresses();
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 bg-white shadow-lg rounded-md w-120">
            <h2 className="text-xl font-bold mb-4 text-blue-500">Add Address</h2>

            <input name="addressLine1" onChange={handleChange} placeholder="Flat no. & Street" className="w-full p-2 border rounded mb-2" required />

            <input name="pinCode" onBlur={handlePinCode} onChange={handleChange} placeholder="PIN Code" className="w-full p-2 border rounded mb-2" required />

            <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full p-2 border rounded mb-2" />

            <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full p-2 border rounded mb-2" />

            <input name="country" value="India" readOnly className="w-full p-2 border rounded mb-2 bg-gray-200" />

            <button type="submit" className="w-full bg-blue-400 text-white p-2 rounded cursor-pointer hover:bg-blue-500">Add Address</button>
        </form>
    );
};

export default AddressForm;

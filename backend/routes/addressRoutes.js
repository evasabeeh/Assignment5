import express from "express";
import Address from "../models/Address.js";
import axios from "axios";

const router = express.Router();

// Add Address
router.post("/", async (req, res) => {
    try {
        const { addressLine1, pinCode } = req.body;

        const response = await axios.get(`https://api.postalpincode.in/pincode/${pinCode}`);
        const data = response.data[0];

        let city = "";
        let state = "";

        if (data && data.Status === "Success") {
            city = data.PostOffice[0].District;
            state = data.PostOffice[0].State;
        }

        const newAddress = new Address({ addressLine1, city, state, pinCode });
        await newAddress.save();

        res.json(newAddress);
    } catch (error) {
        res.status(500).json({ error: "Failed to add address" });
    }
});

// Get Addresses
router.get("/", async (req, res) => {
    const addresses = await Address.find();
    res.json(addresses);
});

// Delete Address
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Find the address by ID and delete it
        const deletedAddress = await Address.findByIdAndDelete(id);
        if (!deletedAddress) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(200).json({ message: "Address deleted successfully" });
    } catch (error) {
        console.error("Error deleting address:", error);
        res.status(500).json({ message: "Error deleting address" });
    }
});

export default router;

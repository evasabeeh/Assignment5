import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    addressLine1: { type: String, required: true },
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, default: "India" },
    pinCode: { type: String, required: true },
});

export default mongoose.model("Address", addressSchema);

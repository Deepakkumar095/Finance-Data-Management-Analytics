import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    note: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Record = mongoose.model("Record", recordSchema);

export default Record;
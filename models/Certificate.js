import mongoose from "mongoose";

const certificateSchema = mongoose.Schema({
  username: { type: String, required: true },
  certificateId: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  fileUrls: {  
    png: { type: String, required: true },
    pdf: { type: String, required: true }
  },
  date: { type: String, required: true }
});

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;

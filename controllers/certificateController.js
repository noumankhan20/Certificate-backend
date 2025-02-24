const Certificate = require("../models/Certificate");

// Create Certificate
exports.createCertificate = async (req, res) => {
  try {
    const { username, course, date, fileUrls } = req.body; // ✅ Updated field names

    if (!username || !course || !date || !fileUrls?.png || !fileUrls?.pdf) {  // ✅ Ensure PNG & PDF are required
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required.",
        missingFields: { username, course, date, fileUrls }  // ✅ Debugging info
      });
    }

    // Generate a unique certificate ID
    const certificateId = Math.floor(10000 + Math.random() * 90000).toString();

    const newCertificate = await Certificate.create({
      username,  // ✅ Renamed from 'name' to 'username'
      course,
      date,
      certificateId,
      fileUrls,  // ✅ Store PNG & PDF URLs
    });

    res.status(201).json({ success: true, certificate: newCertificate });
  } catch (error) {
    console.error("Error creating certificate:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get All Certificates
exports.getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({});
    res.status(200).json({ success: true, certificates });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get Single Certificate by certificateId
exports.getCertificateById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from URL
    const certificate = await Certificate.findOne({ certificateId: id });

    if (!certificate) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    res.status(200).json({ success: true, certificate });
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

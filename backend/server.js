import express from "express";
import mongoose from "mongoose";
import Student from "./models/Student.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

dotenv.config();

mongoose
  .connect("")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST endpoint to create a student
app.post("/student", async (req, res) => {
  const { studentID, studentName, course, presentDate } = req.body;

  try {
    const existingStudent = await Student.findOne({ studentID });
    if (existingStudent) {
      return res.status(409).json({ message: "Student ID already exists." });
    }

    const newStudent = new Student({
      studentID,
      studentName,
      course,
      presentDate,
    });
    await newStudent.save();
    res.status(201).json({ message: "Student record created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
});

// putting endpoint to update a student record
app.put("/student/:studentID", async (req, res) => {
  const { studentID } = req.params;
  const updatedData = req.body;

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { studentID },
      updatedData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student record updated successfully",
      data: updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

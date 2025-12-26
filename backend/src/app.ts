import "reflect-metadata";
import { AppDataSource } from "./AppDataSource";
import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { requireAuth1 } from "./requireAuth";

import { Request as ExRequest } from "express";
import "dotenv/config";
const jwt =  require('jsonwebtoken');

import { User, HomeWork, Student, Teacher} from "./entities";
import { CreateMCQ } from "./entity2";
import { HomeworkSubmission } from "./HomeworkSubmission";
import { MCQAnswer } from "./MCQAnswer";
import { requireAuth } from "./middleware";
import cookieParser from "cookie-parser";
import { use } from "react";

const bcrypt = require('bcrypt');

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true,
    }));
    app.use(cookieParser());
    app.use(express.json()); // replace body-parser
    // serve your static files folder
    app.use(express.static(path.join(__dirname, "staticFiles")));

    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

    const userRepository = AppDataSource.getRepository(User);

    app.post("/users", async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const user = userRepository.create({
                name: name,
                email: email,
                password: password
            });

            await userRepository.save(user);
            res.status(201).json(user);

        } catch (error) {
            console.error("Error saving user:", error);
            res.status(500).json({ message: "Error saving user" });
        }
    });

    const homeworkRepository = AppDataSource.getRepository(HomeWork);
    const mcqRepository = AppDataSource.getRepository(CreateMCQ);

    app.post("/homework", requireAuth, async (req, res) => {  // <-- Change 1: Added requireAuth middleware
        try {
            const { AnswerOne, AnswerTwo, AnswerThree, AnswerFour, AnswerFive, subject, timeStamp } = req.body;  // <-- Change 2: Removed teacherId and homeworkId from destructuring
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const homework = homeworkRepository.create({
                AnswerOne: AnswerOne,
                AnswerTwo: AnswerTwo,
                AnswerThree: AnswerThree,
                AnswerFour: AnswerFour,
                AnswerFive: AnswerFive,
                teacher: { id: req.user.id },  // <-- Change 3: Set teacher from JWT (req.user.id) instead of req.body.teacherId
                subject: subject,
                timeStamp: new Date(timeStamp)
            });
            await homeworkRepository.save(homework);
            res.status(201).json(homework);
        } catch (error) {
            console.error("Error saving homework:", error);
            res.status(500).json({ message: "Error saving homework" });
        }
    });

    app.post("/homework/mcq", async (req, res) => {
        try {
            const { grade, subject, question, optionA, optionB, optionC, optionD, optionE, correctOption, homeworkId } = req.body;
            // const homework = await homeworkRepository.findOneBy({ id: activityID });
            // if (!homework) {
            //     return res.status(401).json({ message: "Homework not found" });
            // }else{
            //     console.log("Home Work Created:", homework);
            // }
            const mcq = mcqRepository.create({
                grade: grade,
                question: question,
                optionA: optionA,
                optionB: optionB,
                optionC: optionC,
                optionD: optionD,
                optionE: optionE,
                correctOption: correctOption,
                //homework: homework
                homework: { id: homeworkId }
            });

            await mcqRepository.save(mcq);
            res.status(201).json(mcq);
        } catch (error) {
            console.error("Error saving MCQ:", error);
            res.status(500).json({ message: "Error saving MCQ" });
        }
    });

    app.post("/SignIn", async (req, res) => {
        const LearnerRepository = AppDataSource.getRepository(Student);
        try {
            const { fullName, schoolName, schoolGrade, Password } = req.body;
            const existingUser = await LearnerRepository.findOneBy({ name: fullName });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }

            let SaltRounds = 11;
            const hashedPassword = await bcrypt.hash(Password, SaltRounds);

            const student = LearnerRepository.create({
                name: fullName,
                school: schoolName,
                grade: schoolGrade,
                role: 'student',
                password: hashedPassword
            });
            await LearnerRepository.save(student);
            res.status(201).json({ message: "User registered successfully", student: student });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Error registering user" });
        }
    });

    app.post("/SignInTeacher", async (req, res) => {
        const TeacherRepository = AppDataSource.getRepository(Teacher);
        try {
            //1. Grab the data from the req body
            const { fullName, schoolName, email, password } = req.body;
            //2. Check if user already exists
            const existingUser = await TeacherRepository.findOneBy({ email: email });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }
            //3. Hash the password
            let SaltRounds = 11;
            const hashedPassword = await bcrypt.hash(password, SaltRounds);
            //4. Create and save the user
            const teacher = TeacherRepository.create({
                name: fullName,
                school: schoolName,
                email: email,
                password: hashedPassword,
                role: 'teacher',
                homeworks: []
            });
            await TeacherRepository.save(teacher);
            res.status(201).json({ message: "User registered successfully", teacher: teacher });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Error registering user" });
        }
    });

    app.post("/LoginTeacher", async (req, res) => {
        const userRepo = AppDataSource.getRepository(Teacher);
        const { email, password } = req.body;
        // 1) Basic validation
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }
        // 2) Find user
        const user = await userRepo.findOne({ where: { email } });
        console.log("REGISTER password:", JSON.stringify(password));
        console.log("REGISTER length:", password.length);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // 3) Compare password with bcrypt
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // 4) Create token (include name so you can display it)
        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,      // true in production (HTTPS)
            sameSite: "lax",    // use "none" + secure:true if frontend is on a different site
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
        });
        return res.json({ success: true, token });
    });


    app.get("/me", requireAuth, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    if (req.user.role === "teacher") {
        return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: "teacher",
        });
    }

    // student
    return res.json({
        id: req.user.id,
        name: req.user.name,
        grade: req.user.grade,
        role: "student",
    });
    });

    app.get("/sendTeacherFile", requireAuth1, (req, res) => {
        const filePath = path.join(__dirname, "staticFiles", "homework.html");
        console.log("Resolved file path:", filePath);
        console.log("Exists:", fs.existsSync(filePath));
        return res.sendFile(filePath);
    });

    app.get("/teacher/show-homeworks", requireAuth, async (req: any, res) => {
        try {
        const teacherId = req.user.id;

        const homeworkRepository = AppDataSource.getRepository(HomeWork);

        const homeworks = await homeworkRepository.find({
        where: {
            teacher: { id: teacherId }, // filter by logged-in teacher
         },
         relations: {
            mcqs: true, // include mcqs per homework
        },
        order: {
            timeStamp: "DESC",
        },
        });
        console.log(homeworks)
        return res.json(homeworks);
        } catch (error) {
            console.error("Error fetching teacher homeworks:", error);
            return res.status(500).json({ message: "Failed to fetch homeworks" });
        }
    });

        app.post("/LoginLearner", async (req, res) => {
        const userRepo = AppDataSource.getRepository(Student);
        const { name, password } = req.body;
        // 1) Basic validation
        if (!name || !password) {
            return res.status(400).json({ message: "name and password are required" });
        }
        // 2) Find user
        const user = await userRepo.findOne({ where: { name } });
        console.log("REGISTER password:", JSON.stringify(password));
        console.log("REGISTER length:", password.length);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // 3) Compare password with bcrypt
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // 4) Create token (include name so you can display it)
        const token = jwt.sign(
            { id: user.id, name: user.name, role: user.role, grade: user.grade },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: false,      // true in production (HTTPS)
            sameSite: "lax",    // use "none" + secure:true if frontend is on a different site
            maxAge: 2 * 60 * 60 * 1000, // 2 hours
        });
        return res.json({ success: true, token });
    });

    app.get("/homework/:homeworkId", requireAuth, async (req, res) => {
        try {
            if (!req.user || !req.user.grade) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const studentGrade = req.user.grade;

            const homeworkId = Number(req.params.homeworkId);
            if (Number.isNaN(homeworkId)) {
                return res.status(400).json({ message: "Invalid homeworkId" });
            }

            const mcqs = await mcqRepository.find({
                where: {
                    homework: {
                        id: homeworkId,
                    },
                    grade: studentGrade,
                    
                },
                relations: ["homework"], // 🔑 REQUIRED
            });

            if (mcqs.length === 0) {
                return res.status(404).json({ message: "No homework found" });
            }

            console.log("Homework MCQs:", mcqs.length);
            return res.json(mcqs);

        } catch (error) {
            console.error("Error fetching homework:", error);
            return res.status(500).json({ message: "Failed to fetch homework" });
        }
    });

    app.post("/homework/submit", requireAuth, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const studentId = req.user.id;
        const { homeworkId, answers } = req.body;

        const mcqRepo = AppDataSource.getRepository(CreateMCQ);
        const submissionRepo = AppDataSource.getRepository(HomeworkSubmission);
        
        const duplicateSubmission = await submissionRepo.findOne({
        where: {
            homework: { id: homeworkId },
            student: { id: studentId },
        },
        });
        if (duplicateSubmission) {
        console.log("Duplicate submission attempt for student:", studentId, "homework:", homeworkId);
        return res.status(400).json({ message: "Homework already submitted" });
        } 

        // 1️⃣ Load MCQs for that homework
        const mcqs = await mcqRepo.find({
        where: { homework: { id: homeworkId } },
        });

        if (mcqs.length === 0) {
        return res.status(400).json({ message: "No MCQs found for homework" });
        }

        const total = mcqs.length;

        // 2️⃣ Grade
        let correct = 0;

        for (const mcq of mcqs) {
        const studentAnswer = answers.find(
            (a:any) => a.mcqId === mcq.id
        );

        if (studentAnswer && studentAnswer.answer === mcq.correctOption) {
            correct++;
        }
        }

        const score = correct; // simple scoring

        // 3️⃣ Save submission WITH VALUES
        const submission = submissionRepo.create({
        total,
        correct,
        score,
        student: { id: studentId },
        homework: { id: homeworkId },
        });

        await submissionRepo.save(submission);

        // 4️⃣ Return grade immediately
        res.json({
        total,
        correct,
        score,
        });
    } catch (err) {
        console.error("Homework submit error:", err);
        res.status(500).json({ message: "Failed to submit homework" });
    }
    });     

    app.get("/homework/:homeworkId/grade", requireAuth, async (req, res) => {
        try {
            if (!req.user || req.user.role !== "student") {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const submissionRepo =
                AppDataSource.getRepository(HomeworkSubmission);

            const submission = await submissionRepo.findOne({
                where: {
                    homework: { id: Number(req.params.homeworkId) },
                    student: { id: req.user.id },
                },
            });

            if (!submission) {
                return res.status(404).json({ message: "No submission found" });
            }

            return res.json({
                score: submission.score,
                correct: submission.correct,
                total: submission.total,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to load grade" });
        }
    });
}).catch((error) => console.log("DB init error:", error));




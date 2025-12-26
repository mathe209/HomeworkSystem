import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {setMe} = useAuth();
  type BaseUser = {
    id: number;
    name: string;
    role: "teacher" | "student";
  };

  type Teacher = BaseUser & {
    role: "teacher";
    email: string;
  };

  type Student = BaseUser & {
    role: "student";
    grade: string;
  };

  type User = Teacher | Student;

  function isUser(data: any): data is User {
    if (!data || typeof data !== "object") return false;

    if (data.role === "student") {
      return (
        typeof data.id === "number" &&
        typeof data.name === "string" &&
        typeof data.grade === "string"
      );
    }

    if (data.role === "teacher") {
      return (
        typeof data.id === "number" &&
        typeof data.name === "string" &&
        typeof data.email === "string"
      );
    }

    return false;
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post("http://localhost:3000/LoginTeacher", {
        email,
        password,
      });

      console.log("this is the data from the response: " + response.data);

      if (response.data.success) {
        const { token } = response.data;
        //get the current logged user
        localStorage.setItem("token", token);
        console.log("Stored token:", token);
        const meRes = await axios.get("http://localhost:3000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (isUser(meRes.data)) {
          setMe(meRes.data);
        } else {
          console.error("Unexpected /me shape:", meRes.data);
          setMe(null);
          alert("Login succeeded but user data is invalid.");
        }
        alert("Login successful");
        e.target.reset(); // clear form
        navigate("/teacherContent"); // redirect to content page
      } else {
        alert(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <h1 className="p-2 mb-2 text-xl font-bold text-center text-white bg-gray-800 rounded-t-lg border-b border-gray-200 sm:text-4xl">Use your full name and school code to login, and access your content</h1>
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 rounded-lg border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 rounded-lg border"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="p-3 text-white bg-blue-600 rounded-lg disabled:opacity-50"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
    </>
  );
}
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      },{ withCredentials: true });

      console.log(response.data);

      if (response.data.success) {
      const { token } = response.data;
      localStorage.setItem("token", token);
      alert("Login successful");
      e.target.reset(); // clear form
      navigate("/homeworkPage"); // redirect to content page
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
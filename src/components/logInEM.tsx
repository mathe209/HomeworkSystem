import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [fullName, setFullName] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!fullName || !schoolCode) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post("https://evolvedmentality.co.za/api/login", {
        fullName,
        schoolCode,
      });

      console.log(response.data);

      if (response.data.success) {
        alert("Login successful");
        e.target.reset(); // clear form
        navigate("/contentPage"); // redirect to content page
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
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="p-3 rounded-lg border"
      />
      <input
        type="text"
        placeholder="School Code"
        value={schoolCode}
        onChange={(e) => setSchoolCode(e.target.value)}
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const logUser = async (fullName:string, schoolName:string, schoolGrade:string, Password:string) => {
  try {
    const response = await axios.post("https://www.evolvedmentality.co.za/api/SignIn", {
      fullName,
      schoolName,
      schoolGrade,
      Password
    }, {
      withCredentials: true,
    });
    if (response.status === 201) console.log("User registered successfully:", response.data);
    return response.data;
  } catch (err: any) {
    if (err.response) {
      // Server responded with a status outside 2xx
      console.error("Server response:", err.response.status, err.response.data);
      throw new Error(err.response.data?.message || `Server error ${err.response.status}`);
    } else if (err.request) {
      // No response received (network/CORS)
      console.error("No response (network/CORS). Request:", err.request);
      throw new Error("No response from server. Possible network or CORS issue.");
    } else {
      // Something else happened
      console.error("Request setup error:", err.message);
      throw new Error(err.message || "Unexpected error");
    }
  }
};

const LogUser = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault(); // Prevent default form submission
    
    const form = e.target;
    const fullName = form.fullName.value.trim();
    const schoolName = form.schoolName.value.trim();
    const schoolGrade = form.schoolGrade.value.trim();
    const Password = form.Password.value.trim();

    // Basic validation
    if (!fullName || !schoolName || !schoolGrade || !Password) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await logUser(fullName, schoolName, schoolGrade, Password);
      // If successful, show success message and reset form
      alert("Registration successful!");
      console.log("Registration response:", response);
      form.reset();
      // Or redirect if needed:
      navigate("/LogLearnerIn");
    } catch (error:any) {
      console.error("Registration error:", error);
      alert(error.message || "Error registering user. Please check your information and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="border border-gray-400 p-5 rounded-lg bg-gray-100 max-w-2xl mx-auto">
      <div className="p-3 mx-auto mb-6 w-full bg-gray-700 rounded text-white">
        <p className="text-sm font-bold leading-relaxed text-center sm:text-lg">
          Welcome to the program, Please enter the required details below
        </p>
      </div>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          className="p-3 text-base placeholder-gray-500 text-gray-800 bg-white rounded-lg border border-gray-300 sm:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          name="schoolName"
          placeholder="School Name"
          required
          className="p-3 text-base placeholder-gray-500 text-gray-800 bg-white rounded-lg border border-gray-300 sm:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          name="schoolGrade"
          placeholder="Grade"
          required
          className="p-3 text-base placeholder-gray-500 text-gray-800 bg-white rounded-lg border border-gray-300 sm:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="text"
          name="Password"
          placeholder="Password"
          required
          className="p-3 text-base placeholder-gray-500 text-gray-800 bg-white rounded-lg border border-gray-300 sm:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`p-3 sm:p-4 rounded-lg font-semibold text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
          }`}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center">
              <svg
                className="mr-3 -ml-1 w-5 h-5 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Submit Registration"
          )}
        </button>
      </form>
    </div>
    </>
  );
};

export default LogUser;
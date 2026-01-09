import { useState } from "react";

import axios from "axios";

export default function MentoForm() {
  const [mentorType, setMentorType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // const AddMentor = async (e:any) => {
  //   e.preventDefault();
  //   try {
  //     const data = await axios.get("https://evolvedmentality.co.za/api/mentors");
  //     const existingMentors = data.data.some((mentor:any) => mentor.email === email);
  //     if (!name || !email || !phone) {
  //       alert("Please fill in all required fields.");
  //       return;

  //     }
  //     else if (existingMentors) {
  //       alert("This email is already registered. Please use a different email.");
  //       return;
  //     }else{
  //       const response = await axios.post("https://evolvedmentality.co.za/api/mentorship", {
  //         mentorType,
  //         name,
  //         email,
  //         phone,
  //         message,
  //       }); 
  //       console.log(response.data);
  //       if (response.status === 200) {
  //         alert("Mentorship successful!");
  //         window.location.href = "/";
  //       } else {
  //         alert(response.data.message || "Mentorship failed");
  //       }                
  //     }
  //   } catch (error: any) {
  //       console.error(error);
  //       if (error.response) {
  //         alert("Server error or the email you used is already registered: " + error.response.data.message);
  //       } else {
  //         alert("Request failed: " + error.message);
  //       }
  //     }
  // };
  const AddMentor = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !phone || !mentorType) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/mentorship", {
        mentorType,
        name,
        email,
        phone,
        message,
      });
      console.log(response.data);
      if (response.status === 200) {
        alert("Mentorship successful!");
        window.location.href = "/";
      } else {
        alert(response.data.message || "Mentorship failed");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 409) {
        alert("Server error or the email you used is already registered: " + error.response.data.message);
      }
      else if (error.response.status===500){
        alert("Server error: " + error.response.data.message);
      } 
      else {
        alert("Request failed: " + error.message);
      }
    }
  };

  return (
    <>
      <div className="container rounded-xl text-black justify-center mb-5 p-5 px-10 bg-gradient-to-r from-white to-gray-400 border border-black shadow-lg shadow-gray-600">
        <form id="mentorForm" className="flex flex-col gap-4" onSubmit={AddMentor}>
          <div className="flex gap-4 justify-center">
            <input
              type="radio"
              name="mentorType"
              value="mentor"
              id="mentor"
              checked={mentorType === "mentor"}
              onChange={(e) => setMentorType(e.target.value)}
            />
            <label htmlFor="mentor">Mentor</label>

            <input
              type="radio"
              name="mentorType"
              value="mentee"
              id="mentee"
              checked={mentorType === "mentee"}
              onChange={(e) => setMentorType(e.target.value)}
            />
            <label htmlFor="mentee">Mentee</label>
          </div>

          <label className="flex flex-col gap-2">
            Full Name
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-sm text-black p-2 border border-black bg-white"
            />
          </label>

          <label className="flex flex-col gap-2">
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-sm text-black p-2 border border-black bg-white"
            />
          </label>

          <label className="flex flex-col gap-2">
            Phone Number
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-sm text-black p-2 border border-black bg-white"
            />
          </label>

          <label className="flex flex-col gap-2">
            Message
            <textarea
              name="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-md p-2 text-black border border-black bg-white"
              placeholder="Please enter the areas you wish to mentor or get mentorship in"
            />
          </label>

          <button
            type="submit"
            value="Submit"
            className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300 border border-black w-32 mx-auto mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

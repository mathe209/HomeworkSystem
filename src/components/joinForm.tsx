import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function JoinForm(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [userQuery, setUserQuery] = useState("")
    const [message, setMessage] = useState("")
    const [memberType, setMemberType] = useState("")

    const navigate = useNavigate();
    
    // 
    const AddMember = async (e:any) => {
        e.preventDefault();
        if (!name || !email || !phone || !memberType) {
            alert("Please fill in all required fields.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3000/membership", {
                memberType,
                name,
                email,
                phone,
                userQuery,
                message,
            });
            console.log(response.data);
            if (response.status === 201) {
                alert("Membership application successful!");
                console.log("Membership application successful!, navigating to success page.");
                navigate('/success');
            } else {
                alert(response.data.message || "Membership application failed");
            }                
        } catch (error: any) {
            console.error(error);
            if (error.response.status===409) {
                alert("Error: " + error.response.data.message);
            }else if (error.response.status===500){
                alert("Server error: " + error.response.data.message);
            } 
            else {
                alert("Request failed: " + error.message);
            }
        }
    };
        return(
        <>
        <div className="container">
            <h1 className="text-4xl font-extrabold pt-2 text-center">Join Us</h1>
            <img src="/logo.jpg" alt="logo" className="w-54 h-44 mx-auto mb-4 rounded-xl mt-6"/>
            <hr/>
            <p className="text-center mb-4 mt-5">
                Would you like to join us as a member?<br></br>
                Fill out our form below.
            </p>
        </div>
        <div className="container rounded-xl text-black justify-center mb-5 p-5 px-10 bg-gradient-to-r from-white to-gray-400 border border-black shadow-lg shadow-gray-600">
            <form id="memberForm" className="flex flex-col gap-4">
                <div className="flex gap-4 justify-center border-b pb-2">
                    <input id="member" type="radio" name="memberType" value="member" checked={memberType === "member"} onChange={(e) => setMemberType(e.target.value)}/>
                    <label htmlFor="member">Member</label>
                    <input type="radio" name="memberType" value="ally" id="ally" checked={memberType === "ally"} onChange={(e) => setMemberType(e.target.value)}/>
                    <label htmlFor="ally">Ally</label>
                    <input type="radio" name="memberType" value="query" id="userQuery" checked={memberType === "query"} onChange={(e) => setMemberType(e.target.value)}/>
                    <label htmlFor="userQuery">Query</label>
                </div>
                <label className="flex flex-col gap-2">
                    Full Name
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-sm text-black p-2 bg-white border border-b"/>
                </label>
                <label className="flex flex-col gap-2">
                    Email
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md text-black p-2 bg-white border border-b"/>
                </label>
                <label className="flex flex-col gap-2">
                    Phone Number
                    <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-md text-black p-2 bg-white border border-b"/>
                </label>
                <p className="text-center mb-4 mt-4">
                    Would you like to be helped with something more specific?<br></br>
                    Fill out the form and kindly elaborate on what you need help with.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-4">
                    <label className="flex items-center gap-2">
                        <input type="radio" name="userQuery" value="counseling" checked={userQuery === "counseling"} onChange={(e) => setUserQuery(e.target.value)}/>
                        Counseling
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="userQuery" value="mentorship" checked={userQuery === "mentorship"} onChange={(e) => setUserQuery(e.target.value)}/>
                        Mentorship
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="userQuery" value="heritage and legacy" checked={userQuery === "heritage and legacy"} onChange={(e) => setUserQuery(e.target.value)}/>
                        Heritage and Legacy
                    </label>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-4 mt-4">
                    <label className="flex items-center gap-2">
                        <input type="radio" name="userQuery" value="training and skills development" checked={userQuery === "training and skills development"} onChange={(e) => setUserQuery(e.target.value)}/>
                        Training and Skills development
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="userQuery" value="webinar registration" checked={userQuery === "webinar registration"} onChange={(e) => setUserQuery(e.target.value)}/>
                        Webinar Registration
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" name="userQuery" value="mental wellness programs" checked={userQuery === "mental wellness programs"} onChange={(e) => setUserQuery(e.target.value)}/>
                        Mental Wellness Programs
                    </label>
                </div>

                <label className="flex flex-col gap-2">
                    Message
                    <textarea name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="rounded-md p-2 text-black bg-white border border-b" placeholder="Please enter your query, or any other specific information you would like to share"></textarea>
                </label>
                <button type="button" onClick={AddMember} className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300 border border-black w-32 mx-auto mt-4">Submit</button>
            </form>
        </div>
        </>
    )
}
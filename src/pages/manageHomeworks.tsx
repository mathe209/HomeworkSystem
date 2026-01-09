import TeacherContent from "../components/getHomeworks";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function ShowHomeworks(){
    return(
        <>
            <Navbar/>
            <div className="mt-15 mx-5 sm:mx-10 md:mx-20 mb-10 p-5 rounded-xl border border-black shadow-lg shadow-gray-600">
            <TeacherContent/>
            </div>
            <Footer/>
        </>
    )
}

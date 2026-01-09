import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StudentContent from "../components/studentContent";
export default function StudentContentPage() {
    return (
        <>
        <Navbar />
        <div className="mt-15 m-5 sm:mx-10 md:mx-25 mb-10 min-h-screen rounded-xl">
        <StudentContent />
        </div>
        <Footer />
        </>
    );
}
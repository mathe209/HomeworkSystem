import LoginForm from '../components/LogInTeacher';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
export default function LogTeacherIn() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-5 mt-10">
        <h1 className="text-2xl sm:text-4xl m-3 text-center">Teacher Login</h1>
        <LoginForm />
      </div>
      <Footer />
    </>
  );
}
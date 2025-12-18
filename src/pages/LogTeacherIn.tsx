import LoginForm from '../components/LogInTeacher';
export default function LogTeacherIn() {
  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-2xl sm:text-4xl m-2 text-center">Teacher Login</h1>
        <LoginForm />
      </div>
    </>
  );
}
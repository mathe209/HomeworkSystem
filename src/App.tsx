import './App.css'
import Home from './pages/home'
import StudentDashboard from './pages/studentDashboard'
import LogUser from './components/SignInForm'
import TeacherDashboard from './pages/teacherDashboard'
import SignInTeacher from './pages/SignInTeacher.tsx'
import SignInLearner from './pages/SignInLearner.tsx'
import LogTeacherIn from './pages/LogTeacherIn'
import TeacherHeader from './pages/teacherContent.tsx'
import CreateHomeworkPage from './pages/createHomework.tsx'
import CreateMcqPage from './pages/Create-mcq.tsx'
import ShowHomeworks from './pages/manageHomeworks.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext";

function App() {

  return (
    <>
    <AuthProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/studentDashboard' element={<StudentDashboard />} />
        <Route path='/SignIn' element={<LogUser />} />
        <Route path='/teacherDashboard' element={<TeacherDashboard />} />
        <Route path='/SignInTeacher' element={<SignInTeacher />} />
        <Route path='/SignInLearner' element={<SignInLearner />} />
        <Route path='/LogTeacherIn' element={<LogTeacherIn />} />
        <Route path='/teacherContent' element={<TeacherHeader />} />
        <Route path='/homeworkPage' element={<CreateHomeworkPage/>}/>
        <Route path='/create-mcq/:homeworkId' element={<CreateMcqPage/>}/>
        <Route path='/manageHomeworks' element={<ShowHomeworks />}/>
      </Routes>
    </Router>
    </AuthProvider>
    </>
  )
}

export default App

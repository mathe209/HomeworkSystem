import './App.css'
import Home from './pages/home'
import StudentDashboard from './pages/studentDashboard'

import TeacherDashboard from './pages/teacherDashboard'
import SignInTeacher from './pages/SignInTeacher.tsx'
import SignInLearner from './pages/SignInLearner.tsx'
import LogTeacherIn from './pages/LogTeacherIn'
import TeacherHeader from './pages/teacherContent.tsx'
import CreateHomeworkPage from './pages/createHomework.tsx'
import CreateMcqPage from './pages/Create-mcq.tsx'
import ShowHomeworks from './pages/manageHomeworks.tsx'
import LogLearnerIn from './pages/LogLearnerIn.tsx'
import StudentContentPage from './pages/studentContent.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from "./contexts/AuthContext";

import './App.css';
import Home1 from './pages/Home1';
import About from './pages/about';
import MENtorship from './pages/MENtorship';
import Join from './pages/join';
import Encldx from './pages/encldx';
import Success from './pages/success';
import ContentPage from './pages/contentPage';
import LogUserPage from './pages/logUserPage';
import LogInPage from './pages/logInPage';
import Aboutencldx from './pages/encldxAbout';
import Event from './pages/event.tsx';
import LearnerResults from './pages/LearnerResults.tsx'

function App() {

  return (
    <>
    <AuthProvider>
    <Router>
      <Routes>
        <Route path='/HomeworkHome' element={<Home />} />
        <Route path='/studentDashboard' element={<StudentDashboard />} />
        {/* <Route path='/SignIn' element={<LogUser />} /> */}
        <Route path='/teacherDashboard' element={<TeacherDashboard />} />
        <Route path='/SignInTeacher' element={<SignInTeacher />} />
        <Route path='/SignInLearner' element={<SignInLearner />} />
        <Route path='/LogTeacherIn' element={<LogTeacherIn />} />
        <Route path='/teacherContent' element={<TeacherHeader />} />
        <Route path='/homeworkPage' element={<CreateHomeworkPage/>}/>
        <Route path='/create-mcq/:homeworkId' element={<CreateMcqPage/>}/>
        <Route path='/manageHomeworks' element={<ShowHomeworks />}/>
        <Route path='/LogLearnerIn' element={<LogLearnerIn />} />
        <Route path='/studentContent' element={<StudentContentPage />} />

        <Route path="/" element={<Home1 />} />
        <Route path="/about" element={<About />} />
        <Route path="/mentorship" element={<MENtorship />} />
        <Route path="/join" element={<Join />} />
        <Route path="/event" element={<Event />} />
        <Route path='/success' element={<Success />} />
        {/*Encldx Routes */}
        <Route path="/encldx" element={<Encldx />} />
        <Route path="/success" element={<Success />} />
        <Route path="/contentPage" element={<ContentPage />} />
        <Route path="/logUserPage" element={<LogUserPage />} />
        <Route path="/logInPage" element={<LogInPage />} />
        <Route path="/encldxAbout" element={<Aboutencldx />} />
        <Route path="/learnerResults" element={<LearnerResults />} />
      </Routes>
    </Router>
    </AuthProvider>
    </>
  )
}

export default App

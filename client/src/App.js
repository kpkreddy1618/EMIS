import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import StudentLogin from './pages/studentLogin';
import CoursePage from './pages/coursePage';
import StudentRegister from './pages/studentRegister';
import FacultyLoginforCourse from './pages/facultyLoginforCourse';
import FacultyRegister from './pages/facultyRegister';
import FacultyHomePage from './pages/facultyHomePage';
import AddCourse from './pages/addCourse';
import Home from './pages/Home';
import DistrictLogin from './pages/districtLogin';
import DistrictRegister from './pages/districtRegister';
import AllDistrict from './pages/allDistrict';
import SchoolRegister from './pages/schoolRegister';
import AllSchools from './pages/allSchools';
import EditDistrict from './pages/editDistrict';
import EditSchool from './pages/editSchool';
import AllFaculty from './pages/allFaculty';
import EditFaculty from './pages/editFaculty';
import AllStudents from './pages/allStudent';
import EditStudent from './pages/editStudent';
import AddVideo from './pages/addVideo';
import AllVideos from './pages/allVideos';
import DisplayVideo from './pages/displayVideo';
import SchoolLogin from './pages/schoolLogin';



const App = () => {
  return (

    <>

      <BrowserRouter>
      
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<HomePage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/:type/:id" element={<Dashboard />} />
          <Route path="/facultyloginforcourse" element={<FacultyLoginforCourse/>}/>
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="/learninghomepage" element={<CoursePage />} />
          <Route path="/studentregister/:type/:id" element={<StudentRegister />} />
          <Route path="/facultyregister/:type/:id" element={<FacultyRegister />} />
          <Route path='/facultyhomepage/:type/:id' element={<FacultyHomePage/>}/>
          <Route path='/addcourse/:type/:id' element={<AddCourse/>}/>
          <Route path="/districtlogin" element={<DistrictLogin />} />
          <Route path="/districtregister/:type/:id" element={<DistrictRegister />} />
          <Route path="/alldistrict/:type/:id" element={<AllDistrict />} />
          <Route path='/schoolregister/:type/:id' element={<SchoolRegister/>}/>
          <Route path='/allschool/:type/:id' element={<AllSchools/>}/>
          <Route path='/editdistrict/:type/:id' element={<EditDistrict/>}/>
          <Route path='/editschool/:type/:id/:editid' element={<EditSchool/>}/>
          <Route path='/allfaculty/:type/:id' element={<AllFaculty/>}/>
          <Route path='/editfac/:type/:id/:editid' element={<EditFaculty/>}/>
          <Route path='/allstudent/:type/:id' element={<AllStudents/>}/>
          <Route path='/editstud/:type/:id/:editid' element={<EditStudent/>}/>
          <Route path="/schoollogin" element={<SchoolLogin/>}/>
          <Route path='/addvideo/:type/:id' element={<AddVideo/>}/>
          <Route path='/allvideo/:type/:id' element={<AllVideos/>}/>
          <Route path='/displayvideo/:type/:id' element={<DisplayVideo/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

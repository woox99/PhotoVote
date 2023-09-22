import './styles/app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import PhotoUpload from './components/PhotoUpload';
import AllPhotos from './components/AllPhotos';
import HomePage from './views/HomePage';
import Login from './views/Login';
import SignUp from './views/SignUp';
import CreatePoll from './views/CreatePoll';
import Logout from './components/Logout';
import MyPoll from './views/MyPoll';
import Photo from './components/Photo';
import Vote from './views/Vote';
import Admin from './views/Admin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/createPoll' element={<CreatePoll />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/myPoll' element={<MyPoll />} />
          <Route path='/vote' element={<Vote />} />
          <Route path='/admin' element={<Admin />} />

          {/* <Route path='/photo' element={<Photo />} /> */}
          <Route path='/upload' element={<PhotoUpload />} />
          <Route path='/allPhotos' element={<AllPhotos />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main/MainPage';
import Header from './components/Header/Header';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import AlbumPage from './pages/Album/AlbumPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="" element={<MainPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/album/:cardId" element={<AlbumPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

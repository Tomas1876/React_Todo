import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import TodosPage from './pages/todo/TodosPage';
import GlobalStyle from './style/globalStyles';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignUpPage />} />
        <Route path="/todos" element={<TodosPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

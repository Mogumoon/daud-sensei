import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Learn from './pages/Learn';
import LearnDetail from './pages/LearnDetail';
import Quiz from './pages/Quiz';
import AskSensei from './pages/AskSensei';
import Progress from './pages/Progress';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:category" element={<LearnDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/ask" element={<AskSensei />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

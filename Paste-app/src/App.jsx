import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Home from "./Components/Home";
import Paste from "./Components/Paste";
import ViewPaste from "./Components/ViewPaste";

function App() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={theme === "light" ? "bg-[#F8E1B7] text-black" : "bg-[#121212] text-white"}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/pastes" element={<Paste/>} />
          <Route path="/pastes/:id" element={<ViewPaste/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

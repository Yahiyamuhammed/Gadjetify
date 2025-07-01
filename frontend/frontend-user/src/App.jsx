import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Add signup, homepage, etc. later */}
      </Routes>
    </Router>
  );
}

export default App;

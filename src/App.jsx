import { Route, Routes } from "react-router";
import Home from "./Screens/Home";
import ADHDAssessment from "./Components/Assement";
import Auth from "./Screens/Auth";



function App() {
  return (
    
      <main className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/assessment" element={<ADHDAssessment />} />
        </Routes>
      </main>
    
  );
}

export default App;

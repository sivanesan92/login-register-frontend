import LoginPage from "./pages/Loginpage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<h2>dashboard</h2>}/>
        <Route path="/" element={<LoginPage/>}/>

      </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;

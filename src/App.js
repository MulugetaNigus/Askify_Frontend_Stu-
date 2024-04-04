import "./App.css";
import Lectures from "./pages/Lectures";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LetctureDetail from "./pages/LetctureDetail";
import UserReg from "./Auth/Register";
import Login from "./Auth/Login";
import IncomingMssg from "./pages/IncomingMssg";
import IncomingResponses from "./pages/IncomingResponses";
 
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';


function App() {
  return (
    // <PrimeReactProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<UserReg />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/AskLectures" element={<Lectures />} />
            <Route path="/LecturesDetail" element={<LetctureDetail />} />
            <Route path="/InBoxes" element={<IncomingMssg />} />
            <Route path="/Responses" element={<IncomingResponses />} />
          </Routes>
        </Router>
      </div>
    // </PrimeReactProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import "./App.css";
// import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route
          path="/dash"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

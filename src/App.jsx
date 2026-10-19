import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import Courses from "./pages/Courses";
import MainLayout from "./MainLayout";
import NotFound from "./pages/NotFound";
import CourseDetail from "./pages/CourseDetail";
import CertificatesDetails from "./pages/Certificates/CertificatesDetails";
import Certificates from "./pages/Certificates/Certificates";
import PublicCertificateDetailsPage from "./pages/Certificates/PublicCertificateDetailsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/details/:id" element={<CertificatesDetails />} />
            <Route
              path="/verify/:id"
              element={<PublicCertificateDetailsPage />}
            />
            {/*<Route path="/profile" element={<Profile />} />*/}
          </Route>
          {/*<Route path="*" element={<NotFound />} />*/}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

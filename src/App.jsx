import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import CertificatesDetails from "./pages/Feature/certificates/CertificatesDetails";
import Certificates from "./pages/Feature/certificates/Certificates";
import PublicCertificateDetailsPage from "./pages/Feature/certificates/PublicCertificateDetailsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/certificates" element={<Certificates />} />
          <Route path="/details/:id" element={<CertificatesDetails />} />
          <Route
            path="/verify/:id"
            element={<PublicCertificateDetailsPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

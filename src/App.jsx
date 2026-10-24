import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./MainLayout";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";

import Resources from "./pages/Resources";
import ResourceCategory from "./pages/ResourceCategory";
import ResourceListing from "./pages/ResourceListing";
import ResourceDetail from "./pages/ResourceDetail";
import BookReader from "./pages/BookReader";
import SlideReader from "./pages/SlideReader";
import Progress from "./pages/Progress";
import Certificates from "./pages/Certificates/Certificates";
import CertificatesDetails from "./pages/Certificates/CertificatesDetails";
import PublicCertificateDetailsPage from "./pages/Certificates/PublicCertificateDetailsPage";
import QuestionFeed from "./pages/PostCard/QuestionFeed";
import PostDetails from "./pages/PostCard/PostDetails";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Main layout and website pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/details/:id" element={<CertificatesDetails />} />
          <Route path="/details/:id" element={<CertificatesDetails />} />
          <Route path="/post" element={<QuestionFeed />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route
            path="/verify/:id"
            element={<PublicCertificateDetailsPage />}
          />

          <Route path="/library" element={<Resources />} />
          <Route path="/library/blogs" element={<Blogs />} />
          <Route path="/library/blogs/:id" element={<BlogDetails />} />

          <Route path="/library/resources" element={<Resources />} />
          <Route
            path="/library/resources/category/:slug"
            element={<ResourceCategory />}
          />
          <Route
            path="/library/resources/detail/:id"
            element={<ResourceDetail />}
          />
          <Route
            path="/library/resources/:section"
            element={<ResourceListing />}
          />
        </Route>

        {/* Full-screen readers */}
        <Route path="/library/resources/read/:id" element={<BookReader />} />
        <Route path="/library/resources/read" element={<BookReader />} />
        <Route path="/library/resources/slide/:id" element={<SlideReader />} />
        <Route path="/library/resources/slide" element={<SlideReader />} />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

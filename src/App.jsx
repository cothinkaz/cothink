
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Courses from "./pages/Courses";
import Blogs from "./pages/Blogs";
import Resources from "./pages/Resources";
import ResourceCategory from "./pages/ResourceCategory";
import ResourceListing from "./pages/ResourceListing";
import ResourceDetail from "./pages/ResourceDetail";
import BookReader from "./pages/BookReader";
import SlideReader from "./pages/SlideReader";
import MainLayout from "./MainLayout";
import ScrollToTop from "./components/ScrollToTop";

function App() {

  return (
    <>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Full-screen Reader views */}
        <Route path="/library/resources/read/:id" element={<BookReader />} />
        <Route path="/library/resources/read" element={<BookReader />} />
        <Route path="/library/resources/slide/:id" element={<SlideReader />} />
        <Route path="/library/resources/slide" element={<SlideReader />} />

        {/* Standard portal layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/library" element={<Resources />} />
          <Route path="/library/resources" element={<Resources />} />
          <Route path="/library/resources/category/:slug" element={<ResourceCategory />} />
          <Route path="/library/resources/detail/:id" element={<ResourceDetail />} />
          <Route path="/library/resources/:section" element={<ResourceListing />} />
        </Route>
        {/*<Route path="*" element={<NotFound />} />*/}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

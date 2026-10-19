
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Courses from "./pages/Courses";
import Blogs from "./pages/Blogs";
import MainLayout from "./MainLayout";
import BlogDetails from './pages/BlogDetails';
import BlogDetails from './pages/BlogDetails';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path = "/" element={<Home/>}/>
          <Route path = "/courses" element={<Courses/>}/>
          <Route path = "/blogs" element={<Blogs/>}/>
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Route>
        {/*<Route path="*" element={<NotFound />} />*/}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
 import { homeImage, noteImage, booksImage, courseImage, libraryImage, discussionImage, progressImage, learningImage, certificateImage } from "../assets/assets";
 const navItems = [
    {
    to:"/",
    title: "Ana səhifə",
    src:homeImage
},
{
     to:"/courses",
    title: "Kurslar",
    src:courseImage
  },
  {
    to:"/library",
    title: "Kitabxana",
    src:libraryImage,
    children:[
      {
        to:"/library/resources",
        title: "Resurslar",
        src:booksImage
      },
      {
        to:"/library/blogs",
        title: "Bloqlar",
        src:noteImage
      }
    ]
  },
   {
    to:"/discussion",
    title: "Forum",
    src:discussionImage
},
{
     to:"/progress",
    title: "İrəliləyişim",
    src:progressImage
  },
  {
    to:"/learning",
    title: "Öyrənmə hədəfi",
    src:learningImage
  },
    {
    to:"/certificates",
    title: "Sertifikatlarım",
    src:certificateImage
  }
 
  ]
  export default navItems;
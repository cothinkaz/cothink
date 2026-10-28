 import { homeImage, noteImage, booksImage, playImage, libraryImage, discussionImage, progressImage, learningImage, certificateImage } from "../assets/assets";
 const navItems = [
    {
    to:"/",
    title: "Ana səhifə",
    src:homeImage
},
{
     to:"/courses",
    title: "Kurslar",
    src:playImage
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
    to:"/post",
    title: "Forum",
    src:discussionImage
},
{
    to:"/progress",
    title: "İrəliləyişim",
    src:progressImage
  },
  {
    to:"/learning-goal",
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


  
const Footer = ()=>{
    return(
        <footer className="w-full border-t border-gray-200 bg-white shadow-lg">
            < div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 px-6 py-10">
            <div className="flex items-center justify-center md:col-span-3 sm:col-span-2 col-span-2">
                <img  src="../src/assets/logo_footer.svg"></img>
                </div>
            <div className="md:col-span-2 sm:col-span-2">
            <h4 className="text-sm font-semibold">Platforma</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600" >
                <li>
                    <a href="/">Ana səhifə</a>
                </li>
                 <li>
                    <a href="/courses">Kurslar</a>
                </li>
                 <li>
                    <a href="/mentors">Mentorlar</a>
                </li>
                 <li>
                    <a href="certificates">Sertifikatlar</a>
                </li>
                   <li>
                    <a href="/blog">Blog</a>
                </li>
            </ul>
        </div>
        <div className="md:col-span-2 sm:col-span-2 col-span-2">
            <h4 className="text-sm font-semibold">Dəstək</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>
                    <a>Yardım mərkəzi</a>
                </li>
                 <li>
                    <a>Tez-tez verilən suallar</a>
                </li>
                 <li>
                    <a>Bizimlə əlaqə</a>
                </li>
                 <li>
                    <a>Məxfilik siyasəti</a>
                </li>
                 <li>
                    <a>İstifadə şərtləri</a>
                </li>
            </ul>
        </div>
    <div className="md:col-span-2 sm:col-span-2 col-span-2">
            <h4 className="text-sm font-semibold">Əlaqə</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li  className="flex gap-3"> <img src="./src/assets/email.svg"/>
                    <a>support@cothink.az</a>
                </li>
                 <li  className="flex gap-3"> <img src="./src/assets/phone.svg"/>
                    <a> +994 50 123 45 67</a>
                </li>
                 <li className="flex gap-3"> <img src="./src/assets/location.svg"/>
                    <a>Bakı, Azərbaycan</a>
                </li>
            </ul>
        </div>
        <div className="md:col-span-3 sm:col-span-3 col-span-2 space-y-4">
            <h4 className="text-sm font-semibold">Yeniliklərdən xəbərdar olun.</h4>
           <p className="text-sm text-gray-400">Email ünvanınızı daxil edin və yeni kurslar, tədbirlər haqqında ilk məlumatı əldə edin.</p>
            <form className="flex mt-3 justify-between gap-2">
                <input type="email" className="flex-1 border border-indigo-800 outline-none text-indigo-800 text-center rounded-full px-7 py-2 w-full" required placeholder="E-poçt ünvanınız"></input>
                <button type="submit" className="flex-1 cursor-pointer items-center justify-center rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white">Abunə ol</button>
            </form>
            <ul className="flex md:justify-end justify-center items-center gap-3">
                <li>
                    <a href="https://www.facebook.com/cothink.az"><img src="./src/assets/logos_facebook.svg"/></a>
                </li>
                  <li>
                    <a href="https://www.instagram.com/cothink.az"><img src="./src/assets/logos_instagram.svg"/></a>
                </li>
                  <li>
                    <a href="https://www.linkedin.com/company/cothink.az"><img src="./src/assets/logos_linkedin.svg"/></a>
                </li>
                  <li>
                    <a href=""><img src="./src/assets/logos_youtube.svg"/></a>
                </li>
            </ul>
        </div>
      </div>
      <div className=" border-t border-gray-200">
        <p className="text-center pt-3 text-sm text-gray-500">©2026 Cothink. Bütün hüquqlar qorunur.</p>
      </div>
        </footer>
    )
}
export default Footer;
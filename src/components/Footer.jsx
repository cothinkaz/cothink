const Footer = ()=>{
    return(
        <footer>
          <div className ="container mx-auto px-4 py-5">
            < div className="grid md:grid-cols-12 gap-8">
            <div className="logo mb-4 md:col-span-2">
                <img className="w-24 h-24" src="../src/assets/hero.png"></img>
                </div>
            <div className="md:col-span-2 sm:col-span-1 col-span-1">
            <h3 className="text-sm font-semibold">Platforma</h3>
            <ul className="mt-4 space-y-2" >
                <li>
                    <a>Ana səhifə</a>
                </li>
                 <li>
                    <a>Kurslar</a>
                </li>
                 <li>
                    <a>Mentorlar</a>
                </li>
                 <li>
                    <a>Sertifikatlar</a>
                </li>
                   <li>
                    <a>Blog</a>
                </li>
            </ul>
        </div>
        <div className="md:col-span-2 sm:col-span-2 col-span-2">
            <h3 className="text-sm font-semibold">Dəstək</h3>
            <ul className="mt-4 space-y-2">
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
            <h3 className="text-sm font-semibold">Əlaqə</h3>
            <ul className="mt-4 space-y-2">
                <li>
                    <a>support@cothink.az</a>
                </li>
                 <li>
                    <a>+994 50 123 45 67</a>
                </li>
                 <li>
                    <a>Bakı, Azərbaycan</a>
                </li>
            </ul>
        </div>
        <div className="md:col-span-4 sm:col-span-3 col-span-3 space-y-4">
            <h3 className="text-sm font-semibold">Yeniliklərdən xəbərdar olun.</h3>
           <p className="text-sm text-gray-400">Email ünvanınızı daxil edin və yeni kurslar, tədbirlər haqqında ilk məlumatı əldə edin.</p>
            <form className="flex mt-3 justify-between gap-2">
                <input type="email" className="flex-1 border border-indigo-700 outline-none text-indigo-700 text-center rounded-full px-3 py-2 w-full" required placeholder="E-poçt ünvanınız"></input>
                <button type="submit" className="flex-1 cursor-pointer items-center justify-center rounded-full bg-indigo-700 px-4 py-2 text-sm font-semibold text-white">Abunə ol</button>
            </form>
        </div>
      </div>
      <div className="footer-bottom mt-3 border-t border-gray-200">
        <p className="text-center pt-3 ">©2026 Cothink. Bütün hüquqlar qorunur.</p>
      </div>
      </div>
        </footer>
    )
}
export default Footer;
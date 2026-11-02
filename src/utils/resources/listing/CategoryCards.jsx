import { Link } from "react-router-dom";
import { RESOURCE_CATEGORIES } from "../../../data/resourcesData";
import { CategoryIcon } from "../shared/ResourceIcons";

const CategoryCards = () => (
  <section className="mt-10">
    <h3 className="text-[20px] font-medium text-[#171717]">Resurs növləri</h3>
    <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {RESOURCE_CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          to={`/library/resources/category/${cat.slug}`}
          className="group flex flex-col items-start rounded-[16px] border border-[#E5E7EB] bg-white p-5 transition-all hover:shadow-md"
        >
          <p className="text-[15px] font-semibold text-[#171717]">
            {cat.name}
          </p>
          <p className="mt-1 text-[13px] text-[#737373]">
            {cat.count.toLocaleString()} resurs
          </p>
          <div className="mt-3 self-end">
            <CategoryIcon categoryId={cat.id} size={52} />
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default CategoryCards;

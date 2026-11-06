import { Link } from "react-router-dom";

export default function ResourceNotFound({ message = "Resurs tapılmadı." }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
      <p className="text-[18px] text-[#737373]">{message}</p>
      <Link to="/library/resources" className="mt-4 inline-block text-[#2A4EBB]">← Resurslara qayıt</Link>
    </div>
  );
}

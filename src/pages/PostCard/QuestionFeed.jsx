import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "../../components/PostCard";

function QuestionFeed() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
   async function getPost() {
      try {
        const res = await axios.get("/data/postcard.json");
        setData(res.data);            // düz massiv olduğu üçün res.data
      } catch (err) {
        console.error(err);
        setError("Məlumat yüklənmədi");
      } finally {
        setLoading(false);
      }
    }
    getPost();
  }, []);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div className="w-full max-w-[1000px] min-w-0 flex flex-col mx-auto gap-3">
    {data.map((item) => (
      <PostCard key={item.id} data={item} />
    ))}
  </div>
  );
}

export default QuestionFeed;

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        axios.get("/data/courses.json").then((res) => {
            setCourse(res.data.find((c) => c.id === id));
        });
    }, [id]);

    if (!course) {
        return <div>Kurs tapılmadı</div>;
    }
    return (
        <div>
            <h1>{course.name}</h1>
            <p>{course.description}</p>
        </div>
    );
}
export default CourseDetail;

import { useParams } from "react-router-dom";
import { getResourceById } from "../data/resourcesData";
import { BOOK_PREVIEW } from "../data/readerData";
import useReaderControls from "../utils/resources/reader/useReaderControls";
import ReaderLayout from "../utils/resources/reader/ReaderLayout";
import BookPages from "../utils/resources/reader/BookPages";

export default function BookReader() {
  const { id } = useParams();
  const resource = getResourceById(id);
  const controls = useReaderControls({ initialPage: BOOK_PREVIEW.initialPage, initialPenMenu: true });
  return (
    <ReaderLayout title={resource?.title || "İKİGAİ"} totalPages={BOOK_PREVIEW.totalPages} thumbnails={BOOK_PREVIEW.thumbnails} variant="book" controls={controls}>
      <BookPages zoom={controls.zoom} registerPage={controls.registerPage} totalPages={BOOK_PREVIEW.totalPages} />
    </ReaderLayout>
  );
}

import { SLIDE_PREVIEW } from "../data/readerData";
import useReaderControls from "../utils/resources/reader/useReaderControls";
import ReaderLayout from "../utils/resources/reader/ReaderLayout";
import SlidePages from "../utils/resources/reader/SlidePages";

const thumbnails = Array.from({ length: SLIDE_PREVIEW.totalPages }, (_, index) => index + 1);

export default function SlideReader() {
  const controls = useReaderControls({ initialPage: SLIDE_PREVIEW.initialPage });
  return (
    <ReaderLayout title="CoThink Prezentasiya" totalPages={SLIDE_PREVIEW.totalPages} thumbnails={thumbnails} variant="slides" controls={controls}>
      <SlidePages zoom={controls.zoom} registerPage={controls.registerPage} totalSlides={SLIDE_PREVIEW.totalPages} />
    </ReaderLayout>
  );
}

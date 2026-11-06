import { useState } from "react";
import ShareModal from "../../../components/ShareModal";
import ResourceActions from "./ResourceActions";
import ResourceMetadata from "./ResourceMetadata";
import { ResourceIcon } from "../shared/ResourceIcons";

export default function ResourceBookCard({ resource, display }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { displayCover, displayTitle, displaySubtitle } = display;
  return (
    <>
      <div className="relative rounded-[24px] border border-[#E5E7EB] bg-white p-6 sm:p-8 md:p-10">

        <button
          type="button"
          aria-label="Yadda saxla"
          aria-pressed={bookmarked}
          onClick={() => setBookmarked((v) => !v)}
          className="absolute right-6 top-6 sm:right-8 sm:top-8 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[#E5E7EB] bg-white transition-colors hover:border-[#EA580C]"
        >
          <ResourceIcon name="bookmarkOrange" />
        </button>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">

          <div className="mx-auto flex w-full max-w-[215px] shrink-0 justify-center sm:max-w-[230px] md:mx-0">
            <img
              src={displayCover}
              alt={displayTitle}
              className="aspect-[215/310] w-full rounded-[16px] object-cover shadow-[0_4px_24px_rgba(0,0,0,0.08)] sm:aspect-[23/33]"
              onError={(e) => {
                e.currentTarget.src = "/books/ikigai.jpg";
              }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="pr-8 text-[26px] sm:text-[28px] font-bold text-[#111827] leading-tight">
              {displayTitle}
            </h1>
            <p className="mt-1 text-[15px] text-[#4B5563]">
              {displaySubtitle}
            </p>

            <ResourceMetadata resource={resource} display={display} />
            <ResourceActions resource={resource} bookmarked={bookmarked} onBookmark={() => setBookmarked((value) => !value)} onShare={() => setShareOpen(true)} />
          </div>
        </div>
      </div>

      {shareOpen && (
        <ShareModal
          resource={{
            ...resource,
            title: displayTitle,
            shareUrl: window.location.href,
          }}
          onClose={() => setShareOpen(false)}
        />
      )}
    </>
  );
}

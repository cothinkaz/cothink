import { useState } from "react";
import { DETAIL_COMMENTS } from "../../../data/resourceFixtures";
import ResourceAvatar from "../shared/ResourceAvatar";
import { ResourceIcon } from "../shared/ResourceIcons";

function CommentRow({ comment, reply = false }) {
  return (
    <div className={`flex items-start ${reply ? "gap-3" : "gap-3.5"}`}>
      <ResourceAvatar size={reply ? 36 : 42} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-[14px] font-semibold text-[#111827]">{comment.author}</span>
            <span className="text-[12px] text-[#6B7280]">{comment.time}</span>
          </div>
          <button type="button" className="text-[#9CA3AF] hover:text-[#4B5563]">
            <ResourceIcon name="dots" />
          </button>
        </div>

        <p className="mt-1 text-[13.5px] text-[#374151] leading-relaxed">
          {comment.replyTo && <span className="text-[#2563EB] font-medium mr-1.5">{comment.replyTo}</span>}{comment.text}
        </p>

        <div className="mt-2.5 flex items-center gap-4 text-[13px]">
          <button type="button" className="flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
            <ResourceIcon name="replyBubble" />
            Cavabla
          </button>
          <button type="button" className="flex items-center gap-1.5 text-[#2563EB] hover:underline font-medium">
            <ResourceIcon name="thumbsUp" />
            {comment.likes}
          </button>
        </div>
      </div>
    </div>

  );
}

export default function ResourceComments() {
  const [commentInput, setCommentInput] = useState("");
  return (
    <section className="mt-12">
      <h2 className="text-[20px] font-bold text-[#111827] mb-6">
        Şərhlər <span className="text-[#6B7280] font-normal">(12)</span>
      </h2>

      <div className="flex items-center gap-3 mb-8">
        <ResourceAvatar size={42} />
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Şərhinizi yazın"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            className="w-full rounded-full border border-[#D1D5DB] bg-transparent py-3 pl-5 pr-14 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#2563EB] focus:outline-none"
          />
          <button
            type="button"
            disabled={!commentInput.trim()}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#0E254A] text-white disabled:opacity-40 transition-opacity hover:bg-[#163566]"
          >
            <ResourceIcon name="sendAirplane" />
          </button>
        </div>
      </div>

      <div className="space-y-7">
        {DETAIL_COMMENTS.map((comment) => (
          <div key={comment.id} className="relative">
            <CommentRow comment={comment} />
            {comment.replies.map((reply) => (
              <div key={reply.id} className="relative mt-4 ml-[21px] pl-8">
                <div className="absolute -top-7 left-0 h-14 w-6 rounded-bl-[16px] border-b-2 border-l-2 border-[#D1D5DB]" />
                <CommentRow comment={reply} reply />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

import type { PostFrontmatter } from "@/types/Posts";
import { useState } from "react";
import Card from "./Card";

const MAX_INDEX = 5;
const SLIDE_WIDTH = 288;
const GAP_WIDTH = 40;

interface Props {
  sortedPosts: PostFrontmatter[];
}

function Carousel({ sortedPosts }: Props) {
  const [postIndex, setPostIndex] = useState(0);

  const posts = sortedPosts.slice(0, MAX_INDEX);

  function getCorrectIndex(index: number) {
    if (index < 0) {
      return MAX_INDEX - 1;
    } else if (index >= MAX_INDEX) {
      return 0;
    }

    return index;
  }

  const prev = () => setPostIndex(getCorrectIndex(postIndex - 1));
  const next = () => setPostIndex(getCorrectIndex(postIndex + 1));

  return (
    <div
      className="lg:w-[calc(3*18rem+2rem)] mx-auto overflow-x-clip"
      style={{ width: SLIDE_WIDTH }}
    >
      <ul
        className="flex w-min transition-transform ease-in duration-500"
        style={{
          transform: `translateX(-${postIndex * (SLIDE_WIDTH + GAP_WIDTH)}px)`,
          columnGap: `${GAP_WIDTH}px`,
        }}
      >
        {posts.map((post, i) => (
          <li key={i} className="m-auto" style={{ width: SLIDE_WIDTH }}>
            <Card post={post} special={i === 0 ? true : false} />
          </li>
        ))}
      </ul>

      <div className="text-skin-muted text-2xl flex justify-between p-2">
        <button
          className="bg-crust w-10 h-10 flex items-center justify-center rounded-full"
          onClick={prev}
        >
          🠈
        </button>
        <button
          className="bg-crust w-10 h-10 flex items-center justify-center rounded-full"
          onClick={next}
        >
          🠊
        </button>
      </div>
    </div>
  );
}

export default Carousel;

import type { PostFrontmatter } from "@/types/Posts";
import { MouseEventHandler, useEffect, useState } from "react";
import { useMediaQuery } from "@/util/hooks";
import Card from "./Card";

const MAX_INDEX = 5;
const SHOWED_POSTS_LG = 3;
const SLIDE_WIDTH = 288;
const GAP_WIDTH = 40;

interface Props {
  sortedPosts: PostFrontmatter[];
}

interface ButtonProps {
  icon: string;
  func: MouseEventHandler<HTMLButtonElement>;
}

function Carousel({ sortedPosts }: Props) {
  const [postIndex, setPostIndex] = useState(0);
  const isLg = useMediaQuery("(min-width: 1028px)");

  const posts = sortedPosts.slice(0, MAX_INDEX);

  function getCorrectIndex(index = postIndex) {
    // if screen isLg, it will show 3 posts instead of 1,
    // so we need to divide the total posts by the showed posts
    const postsRatioLg = Math.ceil(MAX_INDEX / SHOWED_POSTS_LG);

    if (index < 0) {
      return !isLg ? MAX_INDEX - 1 : postsRatioLg;
    } else if (index >= MAX_INDEX || (isLg && index > postsRatioLg)) {
      return 0;
    }

    return index;
  }

  function getContainerWidth() {
    if (isLg) {
      // multiplies gaps by the number of gaps between showed card
      return (
        SHOWED_POSTS_LG * SLIDE_WIDTH +
        GAP_WIDTH * Math.ceil(SHOWED_POSTS_LG / 2)
      );
    }

    return SLIDE_WIDTH;
  }

  const prev = () => setPostIndex(getCorrectIndex(postIndex - 1));
  const next = () => setPostIndex(getCorrectIndex(postIndex + 1));

  useEffect(() => setPostIndex(getCorrectIndex()), [isLg]);

  return (
    <div className="relative">
      <div
        className="mx-auto overflow-x-clip transition-[width] ease-in-out duration-500"
        style={{ width: getContainerWidth() }}
      >
        <ul
          className="flex w-min transition-transform ease-in-out duration-500"
          /* moves the ul to the correct post using only css */
          style={{
            transform: `translateX(-${
              postIndex * (SLIDE_WIDTH + GAP_WIDTH)
            }px)`,
            columnGap: `${GAP_WIDTH}px`,
          }}
        >
          {posts.map((post, i) => (
            <li key={i} style={{ width: SLIDE_WIDTH }}>
              <Card post={post} special={i === 0 ? true : false} />
            </li>
          ))}
        </ul>
      </div>
      <div className="text-skin-muted text-2xl absolute top-[42%] flex justify-between w-full">
        <Button icon="🠈" func={prev} />
        <Button icon="🠊" func={next} />
      </div>
    </div>
  );
}

function Button({ icon, func }: ButtonProps) {
  return (
    <button
      className="bg-crust w-10 h-10 flex items-center justify-center rounded-full hoverable-btn"
      onClick={func}
    >
      {icon}
    </button>
  );
}

export default Carousel;

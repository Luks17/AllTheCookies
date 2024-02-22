import type { PostFrontmatter } from "@/types/Posts";
import { type MouseEventHandler, useEffect, useState } from "react";
import { useMediaQuery } from "@/util/hooks";
import Card from "./Card";
import { ArrowLeft, ArrowRight } from "@/resources/static/Icons";
import { SITE } from "@/config.mjs";

const SHOWED_POSTS_LG = 3;
const SLIDE_WIDTH = 288;
const GAP_WIDTH = 40;

interface Props {
  sortedPosts: PostFrontmatter[];
  maxIndex?: number;
}

interface ButtonProps {
  icon: () => JSX.Element;
  func: MouseEventHandler<HTMLButtonElement>;
  label: string;
}

function Carousel({ sortedPosts, maxIndex = SITE.postsPerPage }: Props) {
  const [postIndex, setPostIndex] = useState(0);
  const isLg = useMediaQuery("(min-width: 1028px)");

  const posts = sortedPosts.slice(0, maxIndex);

  function getCorrectIndex(index = postIndex) {
    // if screen isLg, it will show 3 posts instead of 1,
    // so we need to subtract the postsPerPage by 3
    const postsRatioLg = maxIndex - SHOWED_POSTS_LG;

    if (index < 0) {
      return !isLg ? maxIndex - 1 : postsRatioLg;
    } else if (index >= maxIndex || (isLg && index > postsRatioLg)) {
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
    <div className="relative min-h-[30rem]">
      <div className="text-skin-muted text-2xl absolute top-[42%] flex justify-between w-full">
        <Button icon={ArrowLeft} func={prev} label="Navegar post à esquerda" />
        <Button icon={ArrowRight} func={next} label="Navegar post à direita" />
      </div>
      <div
        className="mx-auto overflow-x-clip lg:min-w-[59rem]"
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
          {posts.map((post, i) => {
            const hide =
              isLg && (i < postIndex || i > postIndex + (SHOWED_POSTS_LG - 1));
            return (
              <li
                key={i}
                className={`transition-opacity ease-in-out duration-500 ${
                  hide ? "opacity-0" : ""
                }`}
                style={{ width: SLIDE_WIDTH }}
              >
                <Card
                  post={post}
                  useSmallImg={true}
                  special={i === 0}
                  viewTransitionStyle={true}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Button({ icon, func, label }: ButtonProps) {
  return (
    <button
      aria-label={label}
      className="bg-crust w-10 h-10 z-10 flex items-center border-2 border-third justify-center rounded-full hoverable-btn"
      onClick={func}
    >
      {icon()}
    </button>
  );
}

export default Carousel;

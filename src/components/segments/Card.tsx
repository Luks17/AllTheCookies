import { getFormatedDate } from "@/util/date";
import type { PostFrontmatter } from "@/types/Posts";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/util/hooks";
import { getSlug } from "@/util/common";

interface Props {
  post: PostFrontmatter;
  expandOnFocus?: boolean;
  showCategory?: boolean;
  special?: boolean;
}

// this component code is really complex because it is used in a lot of very different places
// for example, on a table or a top-bottom list, you may not want expandOnFocus because it will cause a lot of cls on hover
// if you are listing the posts in publish date order, the most recent card should be special
// if you are already listing posts from a specific category, you may not want showCategory
// to reduce cls when using expandOnFocus, it is recomended for the parent component to have a min-height that fits the expanded cards
function Card({
  post,
  expandOnFocus = true,
  showCategory = true,
  special = false,
}: Props) {
  const [isCardFocus, setIsCardFocus] = useState(!expandOnFocus);
  const descriptionContainer = useRef<HTMLParagraphElement | null>(null);
  const thumbContainer = useRef<HTMLImageElement | null>(null);
  const isScreenSmall = useMediaQuery("(max-width: 640px)");

  const postSlug = "/posts/" + getSlug(post.title);

  const clickHandler = () =>
    isScreenSmall && expandOnFocus && toggleCardExpansion();

  // hover checks if the mouse is the card
  // hover is undefined when this function is called from a click on the description
  const toggleCardExpansion = (hover?: boolean) => {
    if (hover === undefined) {
      setIsCardFocus(!isCardFocus);
    } else {
      if (hover) {
        setIsCardFocus(true);
      } else {
        setIsCardFocus(false);
      }
    }
  };

  useEffect(() => {
    if (isCardFocus) {
      descriptionContainer.current!.classList.remove("line-clamp-2");
      descriptionContainer.current!.classList.add("max-h-40");

      if (expandOnFocus) thumbContainer.current!.classList.add("scale-125");
    } else {
      descriptionContainer.current!.classList.remove("max-h-40");
      thumbContainer.current!.classList.remove("scale-125");

      setTimeout(() => {
        descriptionContainer.current!.classList.add("line-clamp-2");
      }, 200);
    }
  }, [isCardFocus]);

  return (
    <div
      onMouseOver={() => expandOnFocus && toggleCardExpansion(true)}
      onMouseLeave={() => expandOnFocus && toggleCardExpansion(false)}
      className={`border-2 p-2 bg-crust rounded-md text-xl ${
        special ? "border-secondary" : "border-third"
      }`}
    >
      {special && (
        <h3 className="text-skin-accent-secondary text-lg font-bold pt-1 text-center">
          Mais recente
        </h3>
      )}

      {/* thumb */}
      <div className="flex items-center justify-center bg-fg-base m-4 mt-3 overflow-clip">
        <img
          src={post.thumbnail.img.src}
          alt={post.thumbnail.alt}
          width={880}
          height={495}
          className={
            (expandOnFocus ? "max-sm:cursor-pointer" : "") +
            " transition-transform ease-in-out duration-500"
          }
          loading="lazy"
          decoding="async"
          onClick={clickHandler}
          ref={thumbContainer}
        />
      </div>

      <div className="w-full flex my-1 px-5 text-xs items-center justify-between">
        {/* category */}
        {showCategory && (
          <a
            href={"/posts/" + post.category}
            className="bg-alternate px-2 py-1 text-sm rounded-lg font-bold text-skin-bright hover:scale-110 transition-transform shadow-black shadow-sm"
          >
            {post.category}
          </a>
        )}
        {/* date */}
        <span className="text-skin-muted">
          <time>{getFormatedDate(post.publishDate)}</time>
        </span>
      </div>

      <div className="px-2 py-1">
        {/* title */}
        <h3 className="text-skin-base hover:text-skin-accent font-bold px-1 pb-2">
          <a href={postSlug}>{post.title}</a>
        </h3>

        {/* description */}
        <p
          className={
            "text-skin-subtext text-sm px-1 overflow-y-clip transition-max-height ease-in-out duration-200" +
            (expandOnFocus
              ? " max-h-10 line-clamp-2 max-sm:cursor-pointer"
              : "")
          }
          onClick={clickHandler}
          ref={descriptionContainer}
        >
          {post.description}
        </p>
      </div>

      {/* tags */}
      <div className="flex py-2 px-2 gap-1.5">
        {post.tags.map((tag, id) => {
          return (
            <a
              key={id}
              href="#0"
              aria-label={`Link para a tag ${tag}`}
              className="text-skin-accent font-semibold text-sm px-2 py-1 before:pr-0.5 before:content-['#']"
            >
              {tag}
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default Card;

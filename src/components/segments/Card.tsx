import { getFormatedDate } from "@/util/date";
import type { PostFrontmatter } from "@/types/Posts";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/util/hooks";
import { getSlug } from "@/util/common";

interface Props {
  post: PostFrontmatter;
  showCategory?: boolean;
  special?: boolean;
}

function Card({ post, showCategory = true, special = false }: Props) {
  const [isCardFocus, setIsCardFocus] = useState(false);
  const descriptionContainer = useRef<HTMLParagraphElement | null>(null);
  const thumbContainer = useRef<HTMLImageElement | null>(null);
  const isScreenSmall = useMediaQuery("(max-width: 640px)");
  const isScreenMd = useMediaQuery("(min-width: 768px)");

  const postSlug = "/posts/" + getSlug(post.title);

  // hover checks if the mouse is the card
  // hover is undefined when this function is called from a click on the description
  const toggleDescription = (hover?: boolean) => {
    if (hover === undefined) {
      setIsCardFocus(!isCardFocus);
    } else {
      if (hover) {
        thumbContainer.current!.classList.add("scale-125");
        setIsCardFocus(true);
      } else {
        thumbContainer.current!.classList.remove("scale-125");
        setIsCardFocus(false);
      }
    }
  };

  useEffect(() => {
    if (isCardFocus) {
      descriptionContainer.current!.classList.remove("line-clamp-2");
      descriptionContainer.current!.classList.add("max-h-40");
    } else {
      descriptionContainer.current!.classList.remove("max-h-40");
      setTimeout(() => {
        descriptionContainer.current!.classList.add("line-clamp-2");
      }, 200);
    }
  }, [isCardFocus]);

  return (
    <div
      onMouseOver={() => toggleDescription(true)}
      onMouseLeave={() => toggleDescription(false)}
      className={`border-2 p-2 bg-crust rounded-md text-xl ${
        special ? "border-secondary" : "border-third"
      }`}
    >
      {special && (
        <div className="flex justify-center">
          <h3 className="text-skin-accent-secondary text-lg font-bold pt-1">
            Mais recente
          </h3>
        </div>
      )}

      {/* thumb */}
      <div className="flex items-center justify-center bg-fg-base m-4 mt-3">
        <a href={postSlug} className="h-full w-full overflow-clip">
          <img
            src={post.thumbnail.img.src}
            alt={post.thumbnail.alt}
            width={isScreenMd ? 1280 : 800}
            height={isScreenMd ? 720 : 450}
            className="transition-transform ease-in-out duration-500"
            loading="lazy"
            decoding="async"
            ref={thumbContainer}
          />
        </a>
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
          className="text-skin-subtext max-sm:cursor-pointer text-sm px-1 max-h-10 overflow-y-clip line-clamp-2 transition-height ease-in-out duration-200"
          onClick={() => isScreenSmall && toggleDescription()}
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
              href="#"
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

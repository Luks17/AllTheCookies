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
  const [isFocus, setIsFocus] = useState(false);
  const descriptionContainer = useRef<HTMLParagraphElement | null>(null);
  const thumbContainer = useRef<HTMLImageElement | null>(null);
  const isScreenSmall = useMediaQuery("(max-width: 640px)");

  const postSlug = "/posts/" + getSlug(post.title);

  const toggleDescription = () => {
    if (isScreenSmall) {
      descriptionContainer.current!.classList.toggle("max-h-10");
      descriptionContainer.current!.classList.toggle("line-clamp-2");
    }
  };

  useEffect(() => {
    // effects only apply on screens bigger than 640px
    if (!isScreenSmall) {
      const description = descriptionContainer.current!;
      const img = thumbContainer.current!;

      if (isFocus) {
        description.classList.remove("max-h-10");
        description.classList.remove("line-clamp-2");
        img.classList.add("scale-125");
      } else {
        description.classList.add("max-h-10");
        description.classList.add("line-clamp-2");
        img.classList.remove("scale-125");
      }
    }
  }, [isFocus, isScreenSmall]);

  return (
    <div
      onMouseOver={() => setIsFocus(true)}
      onMouseLeave={() => setIsFocus(false)}
      className={`p-2 bg-crust rounded-md text-xl ${special ? "border-2 border-secondary bg-mantle" : ""
        }`}
    >
      {special && (
        <div className="flex justify-center">
          <h4 className="text-skin-accent-secondary text-lg font-bold pt-1">
            Mais recente
          </h4>
        </div>
      )}

      {/* thumb */}
      <div className="flex items-center justify-center bg-fg-base m-4 mt-3">
        <a href={postSlug} className="h-full w-full">
          <img
            src={post.thumbnail.img.src}
            alt={post.thumbnail.alt}
            width={1280}
            height={720}
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
            className="hover:font-bold bg-primary text-center font-semibold text-skin-alternate w-fit px-2 py-1 uppercase"
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
        <h3 className="text-skin-base hover:text-skin-accent ease-in-out transition-colors font-bold px-1 pb-2">
          <a href={postSlug}>{post.title}</a>
        </h3>

        {/* description */}
        <p
          className="text-skin-subtext max-sm:cursor-pointer text-sm px-1 max-h-10 overflow-y-clip line-clamp-2"
          onClick={toggleDescription}
          ref={descriptionContainer}
        >
          {post.description}
        </p>
      </div>

      {/* tags */}
      <div className="flex py-2 px-3 gap-1.5">
        {post.tags.map((tag, id) => {
          return (
            <p
              key={id}
              className={`text-skin-muted bg-mantle text-sm px-2 ${special && "bg-primary"
                }`}
            >
              {tag}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Card;

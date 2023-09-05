import { getFormatedDate } from "@/util/date";
import type { PostFrontmatter } from "@/types/Posts";
import { getSlug } from "@/util/common";
import { useMediaQuery } from "@/util/hooks";

interface Props {
  post: PostFrontmatter;
  useSmallImg?: boolean;
  expandOnFocus?: boolean;
  showCategory?: boolean;
  special?: boolean;
}

// This component code is really complex because it is used in a lot of very different places
// for example, on a table or a top-bottom list, you may not want expandOnFocus because it will
// cause a lot of cls on hover
//
// If you are listing the posts in publish date order, the most recent card should be special
//
// If you are already listing posts from a specific category, you may not want showCategory
// to reduce cls when using expandOnFocus, it is recomended for the parent component to have
// a min-height that fits the expanded cards
//
// This element checks if the device has any hover implementation for expandOnFocus to work.
// If it does not, it will fallback to it's non-expandOnFocus state
function Card({
  post,
  useSmallImg = false,
  expandOnFocus = true,
  showCategory = true,
  special = false,
}: Props) {
  const isHoverSupported = useMediaQuery("(any-hover: hover)");

  const titleSlug = getSlug(post.title);

  const img = {
    src: useSmallImg ? post.thumbnail.smallImg.src : post.thumbnail.img.src,
    width: useSmallImg
      ? post.thumbnail.smallImg.width
      : post.thumbnail.img.width,
    height: useSmallImg
      ? post.thumbnail.smallImg.height
      : post.thumbnail.img.height,
  };

  const postSlug = "/posts/" + titleSlug;

  return (
    <div
      className={`border-2 p-2 bg-crust group rounded-md text-xl ${
        special ? "border-secondary" : "border-third"
      }`}
    >
      {special && (
        <h3 className="text-skin-accent-secondary text-lg font-bold mt-1 text-center">
          Mais recente
        </h3>
      )}

      {/* thumb */}
      <div className="bg-fg-base m-4 mt-3 overflow-clip">
        <img
          src={img.src}
          alt={post.thumbnail.alt}
          width={img.width}
          height={img.height}
          className={
            isHoverSupported
              ? "transition-transform ease-in-out duration-300 group-hover:scale-110"
              : ""
          }
          loading="lazy"
          decoding="async"
          style={{ viewTransitionName: `card-img-${titleSlug}` }}
        />
      </div>

      <div className="w-full flex my-1 px-5 text-xs items-center justify-between">
        {/* category */}
        {showCategory && (
          <a
            href={"/posts/" + post.category}
            className="bg-alternate px-2 py-1 text-sm rounded-lg font-bold text-skin-bright hover:scale-110 transition-transform shadow-black shadow-md"
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
        <div className="relative">
          <p
            className={
              "text-skin-subtext text-sm px-1" +
              (expandOnFocus && isHoverSupported
                ? " max-h-10 overflow-y-clip group-hover:max-h-40 transition-max-height ease-in-out duration-200"
                : "")
            }
          >
            {post.description}
          </p>
          {expandOnFocus && isHoverSupported && (
            <div className="absolute h-1/2 w-full top-1/2 bg-gradient-to-t from-crust group-hover:invisible border-b-1 border-third flex rounded-md justify-center">
              <span className="text-skin-base absolute -bottom-3 bg-mantle px-1.5 rounded-full border-third border-1 text-sm">
                +
              </span>
            </div>
          )}
        </div>
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

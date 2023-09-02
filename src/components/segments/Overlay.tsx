import type { PostFrontmatter } from "@/types/Posts";

import {
  closeSearch,
  closeSidebar,
  isSearchOpen,
  isSidebarOpen,
  openSearch,
} from "@/resources/stores/nav-store";
import { useMediaQuery } from "@/util/hooks";
import { useStore } from "@nanostores/react";
import { Suspense, lazy, useEffect, useState } from "react";

const Search = lazy(async () => import("@/components/base/Search"));
const Sidebar = lazy(async () => import("@/components/base/Sidebar"));

interface Props {
  posts: PostFrontmatter[];
}

// Uses the overlay-opacity utility class, which is a rgba value, instead of tailwindcss opacity. This is useful
// because doing it this way the child will not inherit the opacity.
// To handle transitions, i'm using scale and visibility.
function Overlay({ posts }: Props) {
  const $isSidebarOpen = useStore(isSidebarOpen);
  const $isSearchOpen = useStore(isSearchOpen);
  const [canOverlayLoad, setCanOverlayLoad] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const isScreenLg = useMediaQuery("(min-width: 1024px)");

  function closeHandler() {
    if ($isSearchOpen) {
      history.replaceState(null, "", window.location.pathname);
      closeSearch();
    } else if ($isSidebarOpen) {
      closeSidebar();
    }
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("q");

    if (query) openSearch();

    setSearchQuery(query);
    setCanOverlayLoad(true);
  }, []);

  useEffect(() => {
    if (isScreenLg && $isSidebarOpen) closeSidebar();
  }, [isScreenLg]);

  return (
    <aside
      className={`fixed flex z-20 top-0 right-0 h-full w-full justify-center items-center overlay-opacity transition-all duration-100 ease-linear ${
        $isSidebarOpen || $isSearchOpen
          ? "scale-100 visible"
          : "scale-0 invisible"
      }`}
    >
      {/* this div's only purpose is to close the overlay when the user clicks outside content  */}
      <div
        className="absolute -z-50 w-full h-full"
        onClick={closeHandler}
      ></div>

      {/* this div is the actual content */}
      <div className="bg-mantle scroll-smooth overflow-y-auto rounded-md relative h-[95%] w-[90%] border-primary border-2 max-w-md">
        <button onClick={closeHandler}>
          <svg
            className="w-8 h-8 text-skin-base absolute right-5 top-5 hoverable-btn"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {canOverlayLoad && (
          <Suspense fallback={<Fallback />}>
            {$isSearchOpen && (
              <Search elementsToSearch={posts} query={searchQuery} />
            )}
            {$isSidebarOpen && <Sidebar />}
          </Suspense>
        )}
      </div>
    </aside>
  );
}

function Fallback() {
  return (
    <span className="absolute text-lg top-20 w-full text-center text-skin-base">
      Carregando conteúdo...
    </span>
  );
}

export default Overlay;

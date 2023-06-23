import { isSearchOpen } from "@/resources/stores/nav-store";
import { useStore } from "@nanostores/react";
import { useEffect, useRef, useState } from "react";

function ScrollTopBtn() {
  const $isSearchOpen = useStore(isSearchOpen);
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const btnContainer = useRef<HTMLAnchorElement | null>(null);

  function toggleHref() {
    // the #top href just goes to the top of the current document, as simple as that
    // the #search-top goes to the anchor with tag id
    const href = "#" + ($isSearchOpen ? "search-top" : "top");

    btnContainer.current!.href = href;
  }

  function handleScroll(e: Event) {
    const targetElement = e.target!;

    if ($isSearchOpen) {
      if (!isBtnVisible && targetElement.scrollTop > 50) setIsBtnVisible(true);
      else setIsBtnVisible(false);
    } else {
      if (
        !isBtnVisible &&
        (targetElement.documentElement.scrollTop > 50 ||
          targetElement.body.scrollTop > 50)
      )
        setIsBtnVisible(true);
      else setIsBtnVisible(false);
    }
  }

  useEffect(() => {
    toggleHref();

    document.removeEventListener("scroll", handleScroll, true);

    document.addEventListener("scroll", handleScroll, true);
  }, [$isSearchOpen]);

  return (
    <div>
      <a
        className={`fixed z-50 ${
          isBtnVisible ? "block" : "display-none"
        } text-lg cursor-pointer max-lg:top-5 max-lg:left-1/2 lg:right-5 lg:bottom-12 px-3 py-1.5 
      bg-fg-base rounded-full text-skin-muted`}
        ref={btnContainer}
      >
        ↑
      </a>
    </div>
  );
}

export default ScrollTopBtn;

import { isSearchOpen } from "@/resources/stores/nav-store";
import { useStore } from "@nanostores/react";
import { useEffect, useRef, useState } from "react";

function ScrollTopBtn() {
  const $isSearchOpen = useStore(isSearchOpen);
  const [isBtnVisible, setIsBtnVisible] = useState(false);
  const btnContainer = useRef<HTMLAnchorElement | null>(null);

  const OFFSET = 200;

  function toggleHref() {
    // the #top href just goes to the top of the current document, as simple as that
    // the #search-top goes to the anchor with tag id
    const href = "#" + ($isSearchOpen ? "search-top" : "top");

    btnContainer.current!.href = href;
  }

  function handleScroll(e: Event) {
    // if isSearchOpen, the ScrollTopBtn will scroll the overlay div, and not the Document.body
    if ($isSearchOpen) {
      const targetElement = e.target! as HTMLDivElement;

      if (!isBtnVisible && targetElement.scrollTop > OFFSET)
        setIsBtnVisible(true);
      else setIsBtnVisible(false);
    } else {
      const targetElement = e.target! as Document;

      // in some browsers it is documentElement.scrollTop and in others it its body.scrollTop
      if (
        !isBtnVisible &&
        (targetElement.documentElement.scrollTop > OFFSET ||
          targetElement.body.scrollTop > OFFSET)
      )
        setIsBtnVisible(true);
      else setIsBtnVisible(false);
    }
  }

  useEffect(() => {
    toggleHref();

    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [$isSearchOpen]);

  return (
    <a
      className={`fixed z-50 ${
        isBtnVisible ? "block" : "display-none"
      } text-lg cursor-pointer shadow-black shadow-sm right-4 top-4 px-3 py-1.5 
      bg-fg-base rounded-full text-skin-muted hoverable-btn hover:bg-fg-secondary`}
      ref={btnContainer}
    >
      ↑
    </a>
  );
}

export default ScrollTopBtn;

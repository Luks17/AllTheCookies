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
    const offSet = 200;

    if ($isSearchOpen) {
      if (!isBtnVisible && targetElement.scrollTop > offSet)
        setIsBtnVisible(true);
      else setIsBtnVisible(false);
    } else {
      // in some browsers it is documentElement.scrollTop and in others it its body.scrollTop
      if (
        !isBtnVisible &&
        (targetElement.documentElement.scrollTop > offSet ||
          targetElement.body.scrollTop > offSet)
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
    <div>
      <a
        className={`fixed z-50 ${
          isBtnVisible ? "block" : "display-none"
        } text-lg cursor-pointer shadow-black shadow-sm right-4 top-4 px-3 py-1.5 
      bg-fg-base rounded-full text-skin-muted`}
        ref={btnContainer}
      >
        ↑
      </a>
    </div>
  );
}

export default ScrollTopBtn;

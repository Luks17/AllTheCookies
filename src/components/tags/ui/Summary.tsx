import { useEffect, useRef, useState } from "react";

// markdoc creates ids for each heading
// this component uses that to search the markdoc contents for headings that are direct children
// of the article, then creates anchors for each one using the ids created by markdoc
function Summary() {
  const [items, setItems] = useState<JSX.Element>();
  const summaryContainer = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const content = document.querySelector(".content-body > article");

    if (content === null)
      throw new Error("Summary cannot be used outside an article");

    const headlines = content.querySelectorAll(
      "article > h1, article > h2, article > h3, article > h4, article > h5, article > h6"
    );

    const summaryItems = (
      <>
        {Array.from(headlines).map((headline, id) => (
          <li key={id} className="flex items-center">
            <a href={"#" + headline.id}>{"# " + headline.textContent}</a>
          </li>
        ))}
      </>
    );

    setItems(summaryItems);

    summaryContainer.current!.classList.toggle("scale-x-0");
  }, []);

  return (
    <aside
      className="bg-crust border-primary border-l-4 shadow-light-constrast shadow-sm p-5 my-6 rounded-r-2xl scale-x-0 transition-transform origin-top-left duration-200 min-h-[10rem]"
      ref={summaryContainer}
    >
      <h2 className="text-skin-base font-bold text-2xl indent-5 mb-3 underline underline-offset-4">
        Sumário
      </h2>
      <ul className="flex flex-col gap-y-1.5 text-lg">{items}</ul>
    </aside>
  );
}

export default Summary;

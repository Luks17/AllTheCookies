import Card from "./Card";
import Overlay from "./Overlay";

import { MagnifyingGlass } from "@/resources/static/Icons";
import type { PostFrontmatter } from "@/types/Posts";
import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "@/config.mjs";
import { closeSearch, isSearchOpen } from "@/resources/stores/nav-store";
import { useStore } from "@nanostores/react";

interface FuseResult {
  refIndex: number;
  item: PostFrontmatter;
}

function Search({ elementsToSearch }: { elementsToSearch: PostFrontmatter[] }) {
  const $isSearchOpen = useStore(isSearchOpen);
  const [inputFieldText, setInputFieldText] = useState("");
  const [searchResults, setSearchResults] = useState([] as FuseResult[]);
  const [showResults, setShowResults] = useState(false);
  const inputContainer = useRef<HTMLInputElement | null>(null);
  let userTypeTimerId = 0;

  const fuse = useMemo(
    () =>
      new Fuse(elementsToSearch, {
        keys: ["title", "description"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [elementsToSearch]
  );

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) =>
    setInputFieldText(e.currentTarget.value);

  function executeSearch() {
    const search = window.location.search;
    const pathname = window.location.pathname;

    setSearchResults(fuse.search(inputFieldText));

    if (inputFieldText.length > 1) {
      const searchParams = new URLSearchParams(search);

      searchParams.set("q", inputFieldText);
      history.replaceState(null, "", pathname + "?q=" + inputFieldText);

      setShowResults(true);
    } else {
      history.replaceState(null, "", pathname);
      setShowResults(false);
    }
  }

  function closeAndCleanSearch() {
    setInputFieldText("");
    // is this redundant? Yes, but it also bypasses the useEffect timeout
    history.replaceState(null, "", window.location.pathname);
    closeSearch();
  }

  useEffect(() => {
    const inputField = inputContainer.current!;
    const query = new URLSearchParams(window.location.search).get("q");

    // checks if the url has a query and sets it to the input field
    if (query !== null) {
      setInputFieldText(query);
      inputField.selectionStart = query.length;
    } else inputField.selectionStart = 0;
  }, []);

  // This useEffect tries to execute the search only after the user has finished typing,
  // so it delays the execution of the search by 1 second.
  // Every time the component is rerendered, react summons a new useEffect that has
  // a completely different timedId, so we need to clear the old timeout before creating
  // the new timer.
  useEffect(() => {
    // clears old timer if exists
    clearTimeout(userTypeTimerId);

    userTypeTimerId = setTimeout(executeSearch, 1000);

    return () => clearTimeout(userTypeTimerId);
  }, [inputFieldText]);

  return (
    <Overlay
      maxW_sm={false}
      closeFunction={closeAndCleanSearch}
      condition={$isSearchOpen}
    >
      <a id="search-top"></a>
      <p className="absolute w-full text-skin-muted font-bold text-center pr-4 mt-8">
        Busque posts em todo o site
      </p>
      <div className="mt-20 flex flex-col">
        <label className="relative mx-auto">
          <div className="absolute top-0 left-0 flex items-center h-full px-1 text-skin-muted">
            <MagnifyingGlass />
          </div>
          <input
            className="px-8 py-1 bg-fg-secondary outline-none focus:outline-primary rounded-xl text-skin-base placeholder:text-skin-muted placeholder:italic"
            type="text"
            value={inputFieldText}
            placeholder="Pesquise algo..."
            onChange={changeHandler}
            autoComplete="off"
            autoFocus
            ref={inputContainer}
          />
        </label>

        {showResults && <Results searchResults={searchResults} />}
      </div>
    </Overlay>
  );
}

function Results({ searchResults }: { searchResults: FuseResult[] }) {
  const [currentLastPost, setCurrentLastPost] = useState(SITE.postsPerPage);
  const len = searchResults.length;

  const navButtonsClasses =
    "text-skin-muted flex flex-col pb-5 hover:text-skin-subtext transition-colors font-semibold w-full items-center";

  let showedPosts = searchResults.slice(0, currentLastPost);

  function showMore() {
    const newLastPost = currentLastPost + SITE.postsPerPage;
    const newSlice = searchResults.slice(currentLastPost, newLastPost);

    showedPosts = showedPosts.concat(showedPosts, newSlice);
    setCurrentLastPost(newLastPost);
  }

  return (
    <div className="mt-6 text-skin-base">
      {len > 0 ? (
        <div className="flex flex-col items-center">
          <p className="mb-1.5">
            Encontramos <span className="text-skin-alternate">{len} </span>
            resultado{len > 1 ? "s" : ""} para sua busca
          </p>

          <ul>
            {showedPosts.map((result) => {
              return (
                <li className="my-3 w-[95%] mx-auto" key={result.refIndex}>
                  <Card post={result.item} />
                </li>
              );
            })}
          </ul>

          {currentLastPost < len ? (
            <button className={navButtonsClasses} onClick={showMore}>
              <span>Mostrar mais resultados</span>
              <span>⬇</span>
            </button>
          ) : (
            <a href="#search-top" className={navButtonsClasses}>
              <span>↑</span>
              <span>Voltar ao topo</span>
            </a>
          )}
        </div>
      ) : (
        <p className="w-full text-center p-20">
          Não encontramos <span className="text-skin-alternate">nenhum </span>
          resultado para sua busca
        </p>
      )}
    </div>
  );
}

export default Search;

import { MagnifyingGlass } from "@/resources/static/Icons";
import type { PostFrontmatter } from "@/types/Posts";
import Fuse from "fuse.js";
import { useEffect, useMemo, useRef, useState } from "react";

interface FuseResult {
  refIndex: number;
  item: PostFrontmatter;
}

function Search({ elementsToSearch }: { elementsToSearch: PostFrontmatter[] }) {
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
  // so it delays the execution of the search by 2 seconds.
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
    <>
      <label className="relative">
        <div className="absolute top-0 left-0 flex items-center h-full px-1 text-skin-muted">
          <MagnifyingGlass />
        </div>
        <input
          className="w-80 md:w-[36rem] lg:w-[48rem] h-12 px-8 py-1 bg-fg-secondary outline-none focus:outline-primary rounded-xl text-skin-base placeholder:text-skin-muted placeholder:italic"
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
    </>
  );
}

function Results({ searchResults }: { searchResults: FuseResult[] }) {
  const len = searchResults.length;

  return (
    <div className="mt-6 text-skin-base">
      {len > 0 ? (
        <div>
          <p>
            Encontramos <span className="text-skin-alternate">{len} </span>
            resultado{len > 1 ? "s" : ""} para sua busca
          </p>
        </div>
      ) : (
        <p>
          Não encontramos <span className="text-skin-alternate">nenhum </span>
          resultado para sua busca
        </p>
      )}
    </div>
  );
}

export default Search;

import { MagnifyingGlass } from "@/resources/static/Icons";

import { openSearch } from "@/resources/stores/nav-store";

function SearchButton() {
  return (
    <button
      aria-label="Abre pesquisa de posts"
      className="flex items-center"
      onClick={() => openSearch()}
    >
      <MagnifyingGlass />
    </button>
  );
}

export default SearchButton;

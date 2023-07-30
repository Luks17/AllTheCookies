import { MagnifyingGlass } from "@/resources/static/Icons";

import { openSearch } from "@/resources/stores/nav-store";

function SearchButton() {
  return (
    <button className="flex items-center" onClick={() => openSearch()}>
      <MagnifyingGlass />
    </button>
  );
}

export default SearchButton;

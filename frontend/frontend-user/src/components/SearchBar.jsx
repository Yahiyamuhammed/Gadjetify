import React from "react";

const SearchBar = ({ searchTerm }) => {
  return (
    <form className="flex items-center max-w-lg mx-auto">
      <label htmlFor="search-input" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        {/* Search Icon inside the input */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {/* Input field */}
        <input
          type="text"
          id="search-input"
          onChange={(e) => searchTerm(e.target.value.trim())}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:outline-none block w-full pl-10 pr-2.5 py-2"
          placeholder="Search something..."
        />
      </div>
    </form>
  );
};

export default SearchBar;

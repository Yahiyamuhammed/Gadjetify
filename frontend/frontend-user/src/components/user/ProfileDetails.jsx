import { useState } from 'react';
import { FiX, FiBook, FiUsers, FiMail, FiMapPin, FiClock, FiSearch, FiPlus, FiChevronRight, FiPlay, FiHelpCircle } from 'react-icons/fi';

const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700">
      {/* Main Grid */}
      <div className="xl:flex">
        {/* Sidebar Offcanvas */}
        <div 
          id="hs-pro-dupsd"
          className={`hs-overlay [--auto-close:xl] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 xl:relative xl:translate-x-0 xl:end-auto xl:right-auto dark:bg-neutral-800 dark:border-neutral-700`}
          role="dialog"
          aria-labelledby="hs-pro-dupsd-label"
        >
          <div className="flex flex-col h-full">
            {/* Close Button (mobile only) */}
            <div className="xl:hidden p-4">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-400"
                onClick={toggleSidebar}
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-200 dark:divide-neutral-700">
              {/* About Section */}
              <div className="pb-4">
                <h2 id="hs-pro-dupsd-label" className="text-lg font-semibold text-gray-900 dark:text-neutral-200 mb-4">
                  About
                </h2>

                {/* List */}
                <ul className="space-y-3">
                  <li>
                    <div className="inline-flex items-center gap-3 text-gray-700 dark:text-neutral-200">
                      <FiBook className="w-5 h-5 text-gray-400 dark:text-neutral-400" />
                      Organization
                    </div>
                  </li>
                  <li>
                    <div className="inline-flex items-center gap-3 text-gray-700 dark:text-neutral-200">
                      <FiMapPin className="w-5 h-5 text-gray-400 dark:text-neutral-400" />
                      Country
                    </div>
                  </li>
                  <li>
                    <div className="inline-flex items-center gap-3 text-gray-700 dark:text-neutral-200">
                      <FiClock className="w-5 h-5 text-gray-400 dark:text-neutral-400" />
                      Time zone
                    </div>
                  </li>
                  <li>
                    <div className="inline-flex items-center gap-3 text-gray-700 dark:text-neutral-200">
                      <FiMail className="w-5 h-5 text-gray-400 dark:text-neutral-400" />
                      Email
                    </div>
                  </li>
                </ul>
              </div>

              {/* Help Topics Section */}
              <div className="pt-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-neutral-500 mb-4">
                  Explore help topics
                </h2>

                {/* List Group */}
                <ul className="space-y-2">
                  {/* List Item */}
                  <li>
                    <a
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-200 transition-colors"
                      href="#"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-neutral-700 dark:text-neutral-300">
                        <FiPlay className="w-4 h-4 text-blue-500" />
                      </span>
                      <div className="flex-1">
                        <p>Preline Course</p>
                      </div>
                      <FiChevronRight className="w-5 h-5 text-gray-400" />
                    </a>
                  </li>

                  {/* List Item */}
                  <li>
                    <a
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-200 transition-colors"
                      href="#"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-neutral-700 dark:text-neutral-300">
                        <FiUsers className="w-4 h-4 text-purple-500" />
                      </span>
                      <div className="flex-1">
                        <p>Community Group</p>
                      </div>
                      <FiChevronRight className="w-5 h-5 text-gray-400" />
                    </a>
                  </li>

                  {/* List Item */}
                  <li>
                    <a
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-200 transition-colors"
                      href="#"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 dark:bg-neutral-700 dark:text-neutral-300">
                        <FiMail className="w-4 h-4 text-cyan-500" />
                      </span>
                      <div className="flex-1">
                        <p>Hire a Partner Expert</p>
                      </div>
                      <FiChevronRight className="w-5 h-5 text-gray-400" />
                    </a>
                  </li>

                  {/* List Item */}
                  <li>
                    <a
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 text-gray-700 dark:text-neutral-200 transition-colors"
                      href="#"
                    >
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-neutral-700 dark:text-neutral-300">
                        <FiHelpCircle className="w-4 h-4 text-indigo-500" />
                      </span>
                      <div className="flex-1">
                        <p>Help center</p>
                      </div>
                      <FiChevronRight className="w-5 h-5 text-gray-400" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Projects Card */}
          <div className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                Projects
              </h2>

              {/* Search and Add Button */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Search Input */}
                <div className="relative flex-1 sm:w-64">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FiSearch className="w-5 h-5 text-gray-400 dark:text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder:text-neutral-400"
                    placeholder="Search"
                  />
                </div>

                {/* Add Project Button */}
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  <FiPlus className="hidden sm:block w-4 h-4 mr-2" />
                  Add project
                </button>
              </div>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg
                className="w-40 h-20 text-gray-300 dark:text-neutral-600 mb-6"
                viewBox="0 0 178 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Simplified SVG placeholder */}
                <rect x="27" y="50.5" width="124" height="39" rx="7.5" fill="currentColor" className="dark:fill-neutral-800" />
                <rect x="34.5" y="58" width="24" height="24" rx="4" fill="currentColor" className="dark:fill-neutral-700/30" />
                <rect x="66.5" y="61" width="60" height="6" rx="3" fill="currentColor" className="dark:fill-neutral-700/30" />
                <rect x="19.5" y="28.5" width="139" height="39" rx="7.5" fill="currentColor" className="dark:fill-neutral-800" />
                <rect x="27" y="36" width="24" height="24" rx="4" fill="currentColor" className="dark:fill-neutral-700/70" />
                <rect x="12" y="6" width="154" height="40" rx="8" fill="currentColor" className="dark:fill-neutral-800" />
              </svg>

              <div className="mb-4">
                <p className="text-lg font-medium text-gray-800 dark:text-neutral-200">
                  No closed projects
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <FiPlus className="hidden sm:block w-4 h-4 mr-2" />
                Add project
              </button>
            </div>
          </div>

          {/* Events Card */}
          <div className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 p-6">
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg
                className="w-40 h-20 text-gray-300 dark:text-neutral-600 mb-6"
                viewBox="0 0 178 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Simplified SVG placeholder */}
                <rect x="27" y="50.5" width="124" height="39" rx="7.5" fill="currentColor" className="dark:fill-neutral-800" />
                <rect x="34.5" y="58" width="24" height="24" rx="4" fill="currentColor" className="dark:fill-neutral-700/30" />
                <rect x="66.5" y="61" width="60" height="6" rx="3" fill="currentColor" className="dark:fill-neutral-700/30" />
                <rect x="19.5" y="28.5" width="139" height="39" rx="7.5" fill="currentColor" className="dark:fill-neutral-800" />
                <rect x="27" y="36" width="24" height="24" rx="4" fill="currentColor" className="dark:fill-neutral-700/70" />
                <rect x="12" y="6" width="154" height="40" rx="8" fill="currentColor" className="dark:fill-neutral-800" />
              </svg>

              <div className="mb-4">
                <p className="text-lg font-medium text-gray-800 dark:text-neutral-200">
                  No events
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <FiPlus className="hidden sm:block w-4 h-4 mr-2" />
                Add event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
import React from 'react';

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded-xl shadow-md p-6">
      {/* SVG Background */}
      <figure>
        <svg
          className="w-full h-40"
          preserveAspectRatio="none"
          viewBox="0 0 1113 161"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <rect x="0.5" width="1112" height="161" rx="12" fill="white" />
            <rect x="1" width="1112" height="348" fill="#D9DEEA" />
            <path
              d="M512.694 359.31C547.444 172.086 469.835 34.2204 426.688 -11.3096H1144.27V359.31H512.694Z"
              fill="#C0CBDD"
            />
            <path
              d="M818.885 185.745C703.515 143.985 709.036 24.7949 726.218 -29.5801H1118.31V331.905C1024.49 260.565 963.098 237.945 818.885 185.745Z"
              fill="#8192B0"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect x="0.5" width="1112" height="161" rx="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </figure>

      {/* Avatar Section */}
      <div className="-mt-24 flex flex-col items-center">
        <div className="relative">
          <img
            className="w-32 h-32 rounded-full border-4 border-white dark:border-neutral-800 shadow-lg object-cover"
            src={user.avatarUrl}
            alt={user.name}
          />
          <button
            type="button"
            className="absolute bottom-0 right-0 bg-white dark:bg-neutral-800 border rounded-full p-1 shadow"
            title="Set status"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-neutral-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" x2="9.01" y1="9" y2="9" />
              <line x1="15" x2="15.01" y1="9" y2="9" />
            </svg>
          </button>
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          <h1 className="text-xl font-semibold dark:text-neutral-200">{user.name}</h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400">{user.username}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between">
        <a
          href="#edit-profile"
          className="inline-flex items-center justify-center bg-gray-100 dark:bg-neutral-700 px-4 py-2 rounded-md text-sm font-medium dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-600"
        >
          Edit
        </a>
        <nav className="mt-4 md:mt-0 flex space-x-4 overflow-x-auto">
          <a href="#my-profile" className="text-sm text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">My Profile</a>
          <a href="#teams" className="text-sm text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">Teams</a>
          <a href="#files" className="text-sm text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">Files</a>
          <a href="#connections" className="text-sm text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">Connections</a>
        </nav>
      </div>
    </div>
  );
};

export default ProfileCard;

// Example usage
// <ProfileCard user={{ name: 'Amanda Harvey', username: 'iam_amanda', avatarUrl: 'https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?...' }} />

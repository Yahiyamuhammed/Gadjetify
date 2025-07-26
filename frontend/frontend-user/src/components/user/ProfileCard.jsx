import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ProfileCard = ({ user }) => {
  return (
    <Card className="p-6">
      <figure>
        {/* Your existing SVG background */}
        {/* <svg className="w-full h-40" ...>...</svg> */}
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
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-0 right-0 p-1 rounded-full border bg-white dark:bg-neutral-800"
            title="Set status"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-neutral-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" x2="9.01" y1="9" y2="9" />
              <line x1="15" x2="15.01" y1="9" y2="9" />
            </svg>
          </Button>
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          <h1 className="text-xl font-semibold dark:text-neutral-200">{user.name}</h1>
          <p className="text-sm text-gray-500 dark:text-neutral-400">{user.username}</p>
        </div>
      </div>

      {/* Action Buttons and Tabs */}
      <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Button variant="secondary" size="sm">
          Edit
        </Button>

        <Tabs defaultValue="profile">
          <TabsList className="flex space-x-4 overflow-x-auto">
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </Card>
  )
}

export default ProfileCard

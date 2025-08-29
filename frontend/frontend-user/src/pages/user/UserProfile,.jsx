import AddressTab from "@/components/user/AddressTab";
import ProfileCard from "@/components/user/profile/ProfileCard";
import SidebarLayout from "@/components/user/ProfileDetails";
import { useAuthUser } from "@/hooks/useAuthUser";

const UserProfile = () => {
  // const { data: user } = useAuthUser();

  // console.log(user)

  return (
    <div className="p-4">
      <ProfileCard
        user={{
          avatarUrl:
            "https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?...",
        }}
      />
      {/* <SidebarLayout /> */}
      <AddressTab />
    </div>
  );
};

export default UserProfile;

import AddressTab from "@/components/user/AddressTab";
import ProfileCard from "@/components/user/ProfileCard";
import SidebarLayout from "@/components/user/ProfileDetails";
import { useAuthUser } from "@/hooks/useAuthUser";

const UserProfile=()=>{
    // const { data: user } = useAuthUser();

    // console.log(user)
  
    const usesr = {
        name: 'Amanda Harvey',
        username: 'iam_amanda',
        avatarUrl: 'https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?...'
      };


    return (
        <div className="p-4">
          <ProfileCard user={{avatarUrl: 'https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?...'}} />
          {/* <SidebarLayout /> */}
          <AddressTab />
        </div>
      );

  }


export default UserProfile
  
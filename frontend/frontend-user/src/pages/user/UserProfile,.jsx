
const UserProfile=()=>{
    const user = {
        name: 'Amanda Harvey',
        username: 'iam_amanda',
        avatarUrl: 'https://images.unsplash.com/photo-1659482634023-2c4fda99ac0c?...'
      };


    return (
        <div className="p-4">
          <ProfileCard user={user} />
        </div>
      );

  }


export default UserProfile
  
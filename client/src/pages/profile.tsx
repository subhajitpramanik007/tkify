import { ProfileCard } from "@/components/profile-card";
import UserLayout from "@/layout/user-layout";

export default function Profile() {
  return (
    <UserLayout>
      <div className="bg-background w-full flex justify-center p-8">
        <ProfileCard />
      </div>
    </UserLayout>
  );
}

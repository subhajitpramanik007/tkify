import React from "react";

import { Camera, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/loading-button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { useProfileCard } from "@/hooks/use-profile-card";

export function ProfileCard() {
  const {
    user,
    enableEdit,
    setEnableEdit,
    avatar,
    setAvatar,
    avatarUrl,
    setAvatarUrl,
    handleChange,
    handleUpdateMe,
    handleUploadAvatar,
    isPending
  } = useProfileCard();

  return (
    <div className="bg-background w-full flex justify-center p-8">
      <Card className="w-full max-w-3xl h-fit">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around gap-4">
            {/* Avatar */}
            <div className="relative group rounded-full border border-separate h-32 w-32">
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className="rounded-full h-32 w-32 object-cover" />
              ) : (
                <div className="absolute bg-muted rounded-full inset-0 flex items-center justify-center text-4xl font-semibold">
                  {user?.name?.charAt(0)}
                </div>
              )}
              <input
                id="avatar-upload"
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setAvatar(e.target.files[0]);
                    setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                disabled={enableEdit}
              />
              {/* Camera Icon */}
              {!avatar ? (
                <Button
                  className={cn(
                    "absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    enableEdit ? "opacity-100" : ""
                  )}
                  variant="outline"
                  size="icon"
                  onClick={() => document.getElementById("avatar-upload")?.click()}
                >
                  <Camera />
                </Button>
              ) : (
                <React.Fragment>
                  <Button
                    className="absolute bottom-0 right-0 rounded-full"
                    variant="outline"
                    size="icon"
                    onClick={handleUploadAvatar}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    className="absolute bottom-0 left-0 rounded-full"
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setAvatar(null);
                      setAvatarUrl(user?.avatar || null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </React.Fragment>
              )}
            </div>
            {/* Name, Email */}
            {enableEdit ? (
              <div className="flex flex-col justify-center space-y-1">
                <Input name="name" placeholder="Name" defaultValue={user?.name} onChange={handleChange} />
                <Input name="email" placeholder="Email" defaultValue={user?.email} disabled />
              </div>
            ) : (
              <div className="flex flex-col justify-center space-y-1">
                <div className="text-lg font-semibold">{user?.name}</div>
                <div className="text-sm text-muted-foreground"> {user?.email} </div>
              </div>
            )}
          </div>
          {/* Bio */}
          <div className="mt-4">
            <div className="text-lg font-semibold">Bio</div>
            {enableEdit ? (
              <Input name="bio" placeholder="Bio" defaultValue={user?.bio} onChange={handleChange} />
            ) : (
              <div className="text-sm text-muted-foreground">
                {user?.bio || "Add a bio to tell people more about yourself."}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-end space-x-4">
            {enableEdit ? (
              <>
                <Button onClick={() => setEnableEdit(false)} variant="outline">
                  Cancel
                </Button>
                <LoadingButton isLoading={isPending} onClick={handleUpdateMe} disabled={isPending}>
                  Save
                </LoadingButton>
              </>
            ) : (
              <Button onClick={() => setEnableEdit(true)}>Edit Profile</Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

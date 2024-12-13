import React from "react";
import { TUser } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@/hooks/use-session";
import { updateMeService, uploadAvatarService } from "@/services/user.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useProfileCard = () => {
  const {
    session: { user }
  } = useSession();

  const [enableEdit, setEnableEdit] = React.useState(false);
  const [avatar, setAvatar] = React.useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(user?.avatar || null);

  const [editUser, setEditUser] = React.useState<Partial<TUser>>({
    name: user?.name,
    email: user?.email,
    bio: user?.bio
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["user", "edit"],
    mutationFn: (data: Partial<TUser>) => updateMeService(data),
    onSuccess: () => {
      toast({ description: "Profile updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onError: () => {
      toast({ description: "Failed to update profile", variant: "destructive" });
    },
    onSettled: () => setEnableEdit(false)
  });

  const handleUpdateMe = () => {
    if (editUser.name === user?.name && editUser.bio === user?.bio) {
      setEnableEdit(false);
      toast({ description: "No changes to save" });
      return;
    }

    if (!editUser.name) {
      toast({ description: "Name is required", variant: "destructive" });
      return;
    }

    mutate({
      name: editUser.name,
      bio: editUser.bio
    });
  };

  const { mutate: updateAvatar } = useMutation({
    mutationKey: ["user", "avatar"],
    mutationFn: (data: FormData) => uploadAvatarService(data),
    onSuccess: () => {
      toast({ description: "Avatar updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      setAvatar(null);
    },
    onError: () => {
      toast({ description: "Failed to update avatar", variant: "destructive" });
    }
  });

  const handleUploadAvatar = () => {
    if (!avatar) {
      toast({ description: "No avatar to upload", variant: "destructive" });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", avatar);

    updateAvatar(formData);
  };

  return {
    user,
    enableEdit,
    setEnableEdit,
    avatar,
    setAvatar,
    avatarUrl,
    setAvatarUrl,
    editUser,
    handleChange,
    handleUpdateMe,
    handleUploadAvatar,
    isPending
  };
};

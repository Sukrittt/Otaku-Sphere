import { FC } from "react";
import { User } from "next-auth";
import { AvatarProps } from "@radix-ui/react-avatar";

import { Icons } from "@/components/Icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/Avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "email" | "image">;
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;

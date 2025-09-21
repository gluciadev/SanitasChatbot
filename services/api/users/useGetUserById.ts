import { useQuery } from "@tanstack/react-query";

import { usersKeyFactory } from "./usersKeyFactory";
import { getUserByUserId } from "@/services/domain/client/users";


type UseGetUserByUserId = Parameters<typeof getUserByUserId>[number];

const useGetUserById = ({ userId }: UseGetUserByUserId) => {
  const query = useQuery({
    enabled: Boolean(userId),
    queryKey: usersKeyFactory.getUserByUserId({ userId }),
    queryFn: () => getUserByUserId({ userId }),
  });

  return query;
};

export { useGetUserById };

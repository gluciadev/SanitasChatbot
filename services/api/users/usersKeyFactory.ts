export const usersKeyFactory = {
  all: () => ["all"],
  getUserByUserId: ({ userId }: { userId: string }) => [...usersKeyFactory.all(), "users", userId],
};

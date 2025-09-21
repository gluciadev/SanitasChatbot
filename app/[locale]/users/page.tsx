"use client";

import { Users } from "@/screens/users/Users";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/query";

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

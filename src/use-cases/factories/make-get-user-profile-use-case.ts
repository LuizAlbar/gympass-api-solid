import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository.ts";
import { GetUserProfileUseCase } from "../get-user-profile.ts";

export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUserRepository();
  const useCase = new GetUserProfileUseCase(prismaUserRepository);

  return useCase;
}

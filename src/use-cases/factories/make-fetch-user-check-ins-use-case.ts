import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history.ts";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.ts";

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}

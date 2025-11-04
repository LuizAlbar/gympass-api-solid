import { GetUserMetricsUseCase } from "../get-user-metrics.ts";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.ts";

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}

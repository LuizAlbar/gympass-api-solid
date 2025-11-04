import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repositories.ts";
import { FetchNeabyGymsUseCase } from "../fetch-nearby-gyms.ts";

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNeabyGymsUseCase(gymsRepository);

  return useCase;
}

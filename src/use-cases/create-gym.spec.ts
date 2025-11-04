import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.ts";
import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym.ts";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });
  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "MH Gym",
      description: null,
      phone: null,
      latitude: -7.2559995,
      longitude: -35.9261013,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});

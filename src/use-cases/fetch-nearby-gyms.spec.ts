import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.ts";
import { FetchNeabyGymsUseCase } from "./fetch-nearby-gyms.ts";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNeabyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNeabyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -7.2528275,
      longitude: -35.9367356,
    });
    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -7.0579036,
      longitude: -35.7620719,
    });

    // same coordinates as the Near Gym
    const { gyms } = await sut.execute({
      userLatitude: -7.2528275,
      userLongitude: -35.9367356,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});

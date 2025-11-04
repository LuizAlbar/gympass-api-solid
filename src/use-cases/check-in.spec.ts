import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository.ts";
import { CheckInUseCase } from "./check-in.ts";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository.ts";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.ts";
import { MaxDistanceError } from "./errors/max-distance-error.ts";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "My Gym",
      description: "",
      phone: "",
      latitude: -7.2559995,
      longitude: -35.9261013,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });
  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.2559995,
      userLongitude: -35.9261013,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice a day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.2559995,
      userLongitude: -35.9261013,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -7.2559995,
        userLongitude: -35.9261013,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.2559995,
      userLongitude: -35.9261013,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -7.2559995,
      userLongitude: -35.9261013,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in away from the gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "MhGym",
      description: "",
      phone: "",
      latitude: new Decimal(-7.2559995),
      longitude: new Decimal(-35.9261013),
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -7.1888581,
        userLongitude: -35.8648606,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});

import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserdId(user_id: string, page: number): Promise<CheckIn[]>;
  countByUserId(user_id: string): Promise<number>;
}

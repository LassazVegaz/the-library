import { User } from "@/generated/prisma/client";

type JwtPayload = Pick<User, "id">;

export default JwtPayload;

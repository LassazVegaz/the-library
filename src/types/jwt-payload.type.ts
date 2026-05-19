import { SafeUser } from "./user.type";

type JwtPayload = Pick<SafeUser, "id" | "role">;

export default JwtPayload;

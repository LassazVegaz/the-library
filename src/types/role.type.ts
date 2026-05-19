import ROLES from "@/constants/roles.constants";

type Role = (typeof ROLES)[keyof typeof ROLES];

export default Role;

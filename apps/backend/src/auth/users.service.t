import { Injectable } from "@nestjs/common";
import { Role } from "./roles.enum";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  private users = [
    {
      id: "1",
      username: "pmu",
      passwordHash: bcrypt.hashSync("pmu123", 10),
      role: Role.PMU
    },
    {
      id: "2",
      username: "scm",
      passwordHash: bcrypt.hashSync("scm123", 10),
      role: Role.SCM
    }
  ];

  async findByUsername(username: string) {
    return this.users.find((u) => u.username === username);
  }
}

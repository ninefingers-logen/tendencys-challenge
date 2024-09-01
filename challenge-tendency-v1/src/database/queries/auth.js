import { USERS_TABLE } from "../../utils/constants/tables";

export const add = `INSERT INTO ${USERS_TABLE} SET ?;`;

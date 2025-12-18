import {DataSource} from "typeorm";
import { HomeWork, Student, Teacher, User } from "./entities";
import { CreateMCQ } from "./entity2";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mathe209",
    database: "homework",
    synchronize: true,
    logging: true,
    entities: [User, HomeWork, CreateMCQ, Teacher, Student],
    migrations: [],
    subscribers: [],
});
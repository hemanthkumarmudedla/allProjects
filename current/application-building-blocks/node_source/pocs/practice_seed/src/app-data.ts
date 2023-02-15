import { DataSource } from "typeorm";
import { Department } from "./entities/department";
import { Employee } from "./entities/employee";

export const AppData = new DataSource({
    type: "mssql",
    host: "localhost",
    port:1433,
    username: "test",
    password: "test",
    database: "practice_seed",
    synchronize: true,
    logging: true,
    entities: ["./src/entities/**/*.ts"],
    migrations: ["./src/migrations/**/*.ts"],
    migrationsTableName: "migration_table",
    subscribers: [],
    options: {
        encrypt: false,
      },
})
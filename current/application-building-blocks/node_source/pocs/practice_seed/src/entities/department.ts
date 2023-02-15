import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Employee } from "./employee";

@Entity()
export class Department {
    @PrimaryColumn()
    deptId!: number;

    @Column()
    deptName!: string;

    @OneToMany(() => Employee, (emp) => emp.dept)
    employees!: Employee[];
}
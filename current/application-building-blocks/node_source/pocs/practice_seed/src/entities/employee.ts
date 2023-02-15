import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Department } from "./department";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    employeeId!: number

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    dateOfBirth!: string;

    @Column()
    mobileNo!: string;

    @Column()
    location!: string;

    @ManyToOne(() => Department, (dept) => dept.employees, { nullable: false})
    @JoinColumn({name: 'deptId'})
    dept!: Department;
}
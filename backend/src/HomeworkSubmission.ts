// entities/HomeworkSubmission.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    Column,
    OneToOne,
} from "typeorm";
import { Student, Teacher } from "./entities";
import { HomeWork } from "./entities";
import { MCQAnswer } from "./MCQAnswer";

@Entity("homework_submission")
export class HomeworkSubmission {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Student, { nullable: false, onDelete: "CASCADE" })
    student!: Student;

    @ManyToOne(() => HomeWork, { nullable: false, onDelete: "CASCADE" })
    homework!: HomeWork;

    @OneToMany(() => MCQAnswer, (answer: any) => answer.submission)
    answers!: MCQAnswer[];
    @Column()
    total!: number;

    @Column()
    correct!: number;

    @Column("float")
    score!: number; // percentage

    @CreateDateColumn({type: 'datetime'})
    submittedAt!: Date;
}

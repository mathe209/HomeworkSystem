// entities/MCQAnswer.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm";
import { HomeworkSubmission } from "./HomeworkSubmission";
import { CreateMCQ } from "./entity2";

@Entity("mcq_answer")
export class MCQAnswer {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => HomeworkSubmission, (s) => s.answers, {
        onDelete: "CASCADE",
    })
    submission!: HomeworkSubmission;

    @ManyToOne(() => CreateMCQ, { nullable: false })
    mcq!: CreateMCQ;

    @Column()
    selectedOption!: string;

    @Column({ default: false })
    isCorrect!: boolean;
}

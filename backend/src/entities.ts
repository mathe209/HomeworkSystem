import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, Index, CreateDateColumn } from "typeorm";
import { CreateMCQ } from "./entity2";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    email!: string;
    @Column()
    password!: string;
}
@Entity("teacher")
export class Teacher {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
    @Column()
    school!: string;
    
    @Column()
    email!: string;
    @Column({default: 'teacher'})
    role!: string;
    
    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @OneToMany(() => HomeWork, (hw) => hw.teacher)
    homeworks!: HomeWork[];
}
@Entity("student")
export class Student {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    name!: string;
    @Column()
    school!: string;
    @Column()
    grade!: string;
    @Column({default: 'student'})
    role!: string;
    @Column({type: 'varchar', length: 255})
    password!: string;

}

@Entity()
export class HomeWork {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    subject!: string;

    @CreateDateColumn()
    timeStamp!: Date;

    // Answer columns (add as many as needed)
    @Column()
    AnswerOne!: string;

    @Column()
    AnswerTwo!: string;

    @Column()
    AnswerThree!: string;

    @Column()
    AnswerFour!: string;

    @Column()
    AnswerFive!: string;

    // FK column stored in homework.teacherId
    @ManyToOne(() => Teacher, (t) => t.homeworks, { nullable: false, onDelete: "CASCADE" })
    @JoinColumn({ name: "teacherId" })
    teacher!: Teacher;

    @OneToMany(() => CreateMCQ, (mcq) => mcq.homework, { cascade: true })
    mcqs!: CreateMCQ[];
}


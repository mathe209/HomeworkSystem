import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, Index, CreateDateColumn } from "typeorm";
import { CreateMCQ } from "./entity2";
import { i } from "framer-motion/dist/types.d-DagZKalS";

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
    @Index()
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
    @Index()
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

    @Index()
    @Column()
    subject!: string;

    @CreateDateColumn({ type: "datetime" })
    timeStamp!: Date;

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

    // Each homework belongs to ONE teacher
    @ManyToOne(() => Teacher, (teacher) => teacher.homeworks, {
        nullable: false,
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "teacherId" })
    teacher!: Teacher;

    @OneToMany(() => CreateMCQ, (mcq) => mcq.homework, { cascade: true })
    mcqs!: CreateMCQ[];
}


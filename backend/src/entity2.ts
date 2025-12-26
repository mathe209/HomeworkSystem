import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { HomeWork } from "./entities";

@Entity("create_mcq")
export class CreateMCQ {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  grade!: string;
  
  @Column()
  question!: string;

  @Column()
  optionA!: string;

  @Column()
  optionB!: string;

  @Column()
  optionC!: string;

  @Column()
  optionD!: string;

  @Column({ nullable: true })
  optionE?: string;

  @Column()
  correctOption!: string;

  // FK column stored in create_mcq.homeworkId
  @ManyToOne(() => HomeWork, (hw) => hw.mcqs, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "homeworkId" })
  homework!: HomeWork;
}
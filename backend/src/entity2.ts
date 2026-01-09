import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, Index } from "typeorm";
import { HomeWork } from "./entities";

@Entity("create_mcq")
export class CreateMCQ {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  @Index()
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

@Entity ("membership")
  export class Membership {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    memberType!: string;
    @Column()
    name!: string
    @Column()
    email!: string
    @Column()
    phone!: string
    @Column({nullable: true})
    userQuery!: string
    @Column({nullable: true})
    message!: string
  }

@Entity("mentorship")
  export class Mentorship {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    mentorType!: string;
    @Column()
    name!: string
    @Column()
    email!: string
    @Column()
    phone!: string
    @Column({nullable: true})
    message!: string
}
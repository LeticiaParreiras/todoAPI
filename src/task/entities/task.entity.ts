import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number
      @Column()
      name: string;
    
  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  date?: string;
}

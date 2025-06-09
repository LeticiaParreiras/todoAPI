import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  date?: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}

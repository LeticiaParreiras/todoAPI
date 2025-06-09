import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}
  create(dto: CreateTaskDto, UserId: number) {
    const task = this.repository.create({ ...dto, user: { id: UserId } });
    if (!task){
      throw new BadRequestException('Erro in creating task');
    }
    return this.repository.save(task);
  }

  findAll(userId: number) {
    return this.repository.find({ where: { user: { id: userId } } });
    
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, userId: number, dto: UpdateTaskDto) {
    const task = await this.repository.findOne({
      where: { id: id, user: { id: userId } },
    });
    if (!task) return null;
    this.repository.merge(task, dto);
    return this.repository.save(task);
  }

  async remove(id: number, userId: number) {
    const task = await this.repository.findOne({
      where: { id: id, user: { id: userId } },
    });
    if (!task) return null
    return this.repository.remove(task);
  }
}

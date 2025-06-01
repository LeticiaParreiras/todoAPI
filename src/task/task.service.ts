import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()

export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>) {}
  create(dto: CreateTaskDto) {
    const developer = this.repository.create(dto);
    return this.repository.save(developer);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateTaskDto) {
    const task = await this.repository.findOneBy({ id });
    if (!task) return null;
    this.repository.merge(task, dto);
    return this.repository.save(task);
  }

  async remove(id: number) {
    const task = await this.repository.findOneBy({ id });
    if (!task) return null;
    return this.repository.remove(task);
}
}
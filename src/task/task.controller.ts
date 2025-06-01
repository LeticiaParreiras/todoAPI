import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    const task = await this.taskService.findAll();
    if(!task) return ("No task created")
      return (task)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
     const task = await this.taskService.findOne(+id);
     if(!task) throw new NotFoundException();
    return (task)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const task = await this.taskService.update(+id, updateTaskDto);
    if(!task) throw new NotFoundException();
    return (task)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const task = await this.taskService.remove(+id);
    if(!task) throw new NotFoundException();
    return ("Task delete")
  }
}

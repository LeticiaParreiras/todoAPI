import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: any) {
    return this.taskService.create(createTaskDto, req.user.userId);
  }

  @Get()
  async findAll(@Req() req: any) {
    const task = await this.taskService.findAll(req.user.userId);
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
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Req() req: any) {
    const task = await this.taskService.update(+id, req.user.userId ,updateTaskDto);
    if(!task) throw new NotFoundException();
    return (task)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const task = await this.taskService.remove(+id, req.user.userId);
    if(!task) throw new NotFoundException();
    return ("Task delete")
  }
}


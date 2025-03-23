import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { SubjectService } from '../subject/subject.service';
import { CreateSubjectDto } from '../subject/dto/create-subject.dto'
import { UpdateSubjectDto } from '../subject/dto/update-subject.dto'

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() dto: CreateSubjectDto) {
    return this.subjectService.create(dto);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubjectDto) {
    return this.subjectService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }
}

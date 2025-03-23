import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateStudentDto) {
    return this.prisma.student.create({
      data: {
        ...dto,
        updatedBy: dto.createdBy, 
      },
    });
  }
  

  findAll() {
    return this.prisma.student.findMany();
  }

  findOne(id: string) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateStudentDto) {
    return this.prisma.student.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.student.delete({ where: { id } });
  }
}

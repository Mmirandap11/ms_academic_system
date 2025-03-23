import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubjectDto } from '../subject/dto/create-subject.dto';
import { UpdateSubjectDto } from '../subject/dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: {
        ...dto,
        updatedBy: dto.createdBy,
      },
    });
  }

  findAll() {
    return this.prisma.subject.findMany();
  }

  findOne(id: string) {
    return this.prisma.subject.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateSubjectDto) {
    return this.prisma.subject.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.subject.delete({ where: { id } });
  }
}

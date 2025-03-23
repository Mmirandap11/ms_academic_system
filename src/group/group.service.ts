import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateGroupDto) {
    return this.prisma.group.create({
      data: {
        ...dto,
        updatedBy: dto.createdBy,
      },
    });
  }

  findAll() {
    return this.prisma.group.findMany({
      include: {
        subject: true,
        enrollments: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.group.findUnique({
      where: { id },
      include: {
        subject: true,
        enrollments: true,
      },
    });
  }

  update(id: string, dto: UpdateGroupDto) {
    return this.prisma.group.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.group.delete({ where: { id } });
  }
}

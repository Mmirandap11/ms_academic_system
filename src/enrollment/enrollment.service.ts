import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEnrollmentDto) {
    const group = await this.prisma.group.findUnique({
      where: { id: dto.groupId },
      include: { enrollments: true },
    });

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.enrollments.length >= group.maxCapacity) {
      throw new BadRequestException('Group is full');
    }

    const existing = await this.prisma.enrollment.findUnique({
      where: {
        studentId_groupId: {
          studentId: dto.studentId,
          groupId: dto.groupId,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('Student already enrolled in this group');
    }

    return this.prisma.enrollment.create({
      data: {
        ...dto,
        updatedBy: dto.createdBy,
      },
    });
  }

  findAll() {
    return this.prisma.enrollment.findMany({
      include: {
        student: true,
        group: {
          include: { subject: true },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.enrollment.findUnique({
      where: { id },
      include: {
        student: true,
        group: {
          include: { subject: true },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.enrollment.delete({ where: { id } });
  }
}

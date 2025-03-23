import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PrismaModule} from '../prisma/prisma.module';
import {StudentModule} from '../src/student/student.module'
import { SubjectModule } from './subject/subject.module';
import { GroupModule } from './group/group.module';
import { EnrollmentModule } from './enrollment/enrollment.module';


@Module({
  imports: [PrismaModule, StudentModule, SubjectModule, GroupModule, EnrollmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

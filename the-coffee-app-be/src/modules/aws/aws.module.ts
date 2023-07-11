import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { AppConfigModule } from "../../common/config/config.module";

@Module({
  imports: [AppConfigModule],
  providers: [AwsService],
  exports: [AwsService]
})
export class AwsModule {}

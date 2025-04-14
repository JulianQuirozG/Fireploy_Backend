import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { WorkerProcessor } from './dequeue/dequeue.processor';
import { systemProcessor } from './dequeue/dequeue.system.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost', // donde está Redis
        port: 6380,
      },
    }),
    BullModule.registerQueue(
      { name: 'deploy' }, // Cola para deploy
      { name: 'system' },
    ),
    WorkerProcessor,
    systemProcessor,
  ],
  providers: [AppService],
})
export class AppModule {}

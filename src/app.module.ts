import { Module } from '@nestjs/common';
import { BeerModule } from './beer-api/beer.module';

@Module({
  imports: [BeerModule]
})
export class AppModule {}

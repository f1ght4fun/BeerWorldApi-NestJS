import { Module } from '@nestjs/common';
import { BeerService } from './services/beer.service';
import { BeerController} from './controllers/beer.controller';
import { JsonSchemaValidatorModule } from 'src/utils/json-schema-validator/json-schema-validator.module';

@Module({
  imports: [JsonSchemaValidatorModule],
  controllers: [BeerController],
  providers: [BeerService],
})
export class BeerModule {}

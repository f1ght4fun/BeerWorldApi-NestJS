import { Module } from '@nestjs/common';
import { jsonSchemaValidatorFactory } from './factories/json-schema-validator.factory';
import { JsonSchemaValidatorService } from './services/json-schema-validator.service';
import { JSON_SCHEMA_VALIDATOR_FACTORY_TOKEN } from './tokens/validator.token';

@Module({
  providers: [
    { provide: JSON_SCHEMA_VALIDATOR_FACTORY_TOKEN, useValue: jsonSchemaValidatorFactory },
    JsonSchemaValidatorService
  ],
  exports: [JsonSchemaValidatorService]
})
export class JsonSchemaValidatorModule {}

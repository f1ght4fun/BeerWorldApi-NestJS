import { jsonSchemaValidatorFactory } from '../factories/json-schema-validator.factory';

export { Ajv, Options } from 'ajv';
export type JsonSchemaValidatorFactoryType = typeof jsonSchemaValidatorFactory;
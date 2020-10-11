import { Ajv, Options } from "ajv";
import * as ajv from 'ajv';

export function jsonSchemaValidatorFactory(config: Partial<Options> = {}): Ajv {
    return new ajv(config);
}
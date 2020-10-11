import { Inject, Injectable } from '@nestjs/common';
import { Observable, pipe, UnaryFunction } from 'rxjs';
import { throwIf } from 'rxjs-boost/lib/operators';
import { Ajv, JsonSchemaValidatorFactoryType } from '../models/validator.model';
import { JSON_SCHEMA_VALIDATOR_FACTORY_TOKEN } from '../tokens/validator.token';

@Injectable()
export class JsonSchemaValidatorService {
  private validator: Ajv = this.jsviFactory();

  get Validator(): Ajv {
    return this.validator;
  }

  get ValidatorInstance(): Ajv {
    return this.jsviFactory();
  }

  get ValidatorFactory(): JsonSchemaValidatorFactoryType {
    return this.jsviFactory;
  }

  constructor(@Inject(JSON_SCHEMA_VALIDATOR_FACTORY_TOKEN) private jsviFactory: JsonSchemaValidatorFactoryType) {}

  validateOperator = <T>(schema: object, validator?: Ajv): UnaryFunction<Observable<T>, Observable<T>> => {
    const vObj = validator || this.Validator;

    return pipe(
      throwIf(
        (data: T) => !vObj.validate(schema, data),
        () => vObj.errorsText()
      )
    );
  }
}

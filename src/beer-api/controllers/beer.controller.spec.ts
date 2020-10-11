import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { JsonSchemaValidatorModule } from '../../utils/json-schema-validator/json-schema-validator.module';
import { JsonSchemaValidatorService } from '../../utils/json-schema-validator/services/json-schema-validator.service';
import { BeerService } from '../services/beer.service';
import { BeerController } from './beer.controller';

describe('BeerController', () => {
  let app: TestingModule;
  let bService: BeerService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [JsonSchemaValidatorModule],
      controllers: [BeerController],
      providers: [{
        provide: JsonSchemaValidatorService,
        useValue: {
          Validator: {
            validate: () => true
          },
          errors: []
        }
      }, BeerService],
    }).compile();

    bService = app.get<BeerService>(BeerService);
  });

  describe('beerController', () => {
    it('should call beer service method to get all beers', () => {
      const spy = spyOn(bService, 'fetchAllBeers').and.stub();
      const beerController = app.get<BeerController>(BeerController);

      beerController.getAll();

      expect(spy).toHaveBeenCalled();
    });

    it('should call beer service method to search beer by name', () => {
      const spy = spyOn(bService, 'searchBeers').and.stub();
      const beerController = app.get<BeerController>(BeerController);

      beerController.search('banana');

      expect(spy).toHaveBeenCalled();
    });

    it('should call beer service method to insert beer', () => {
      const spy = spyOn(bService, 'insert').and.stub();
      const beerController = app.get<BeerController>(BeerController);

      beerController.insertBeer({} as any);

      expect(spy).toHaveBeenCalled();
    });

    describe('Override', () => {
      beforeAll(async () => {
        app = await Test.createTestingModule({
          imports: [JsonSchemaValidatorModule],
          controllers: [BeerController],
          providers: [{
            provide: JsonSchemaValidatorService,
            useValue: {
              Validator: {
                validate: () => false
              },
              errors: []
            }
          }, BeerService],
        }).compile();
      });

      it('should call beer service method to insert beer and receive error', async () => {   
         const beerController = app.get<BeerController>(BeerController);
   
         await expect(() => beerController.insertBeer({} as any).toPromise()).toThrowError(BadRequestException);
       });
    });

  });
});

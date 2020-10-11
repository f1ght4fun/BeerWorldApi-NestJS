import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BeerService } from '../services/beer.service';
import { Beer } from '../models/beer.model';
import { Observable } from 'rxjs';
import { JsonSchemaValidatorService } from '../../utils/json-schema-validator/services/json-schema-validator.service';
import { beerSchema } from '../schemas/beer.schema';
import { newBeerSchema } from '../schemas/new-beer.schema';

@Controller('beer')
export class BeerController {
  constructor(
    private readonly beerService: BeerService,
    private readonly validatorService: JsonSchemaValidatorService
  ) {}

  @Get()
  getAll(): Observable<Beer[]> {
    return this.beerService.fetchAllBeers();
  }

  @Get('find')
  search(@Query('s') search: string): Observable<Beer[]> {
    return this.beerService.searchBeers(search);
  }

  @Post()
  insertBeer(@Body('beer') beer: Beer): Observable<Beer> {
    if (!this.validatorService.Validator.validate(newBeerSchema, beer)) {
      throw new BadRequestException('Invalid Beer', JSON.stringify(this.validatorService.Validator.errors))
    }    

    return this.beerService.insert(beer);
  }

  @Put(':id')
  updateBeer(@Param('id') id, @Body('beer') beer: Beer): Observable<Beer> {
    if (!this.validatorService.Validator.validate(beerSchema, beer)) {
      throw new BadRequestException('Invalid Beer', JSON.stringify(this.validatorService.Validator.errors))
    }    

    if (!this.beerService.findById(id)) {
      throw new BadRequestException('Invalid Beer')
    }

    return this.beerService.update(beer);
  }
}

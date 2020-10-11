import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Beer } from '../models/beer.model';
import * as uuid from 'uuid-v4';

@Injectable()
export class BeerService {
  private readonly beerCollection$$: BehaviorSubject<Record<string, Beer>> = new BehaviorSubject<Record<string, Beer>>({});
  private readonly beerCollection$: Observable<Record<string, Beer>> = this.beerCollection$$.asObservable();

  private get BeerCollection(): Record<string, Beer> {
    return this.beerCollection$$.getValue();
  }

  private set BeerCollection(value: Record<string, Beer>) {
    this.beerCollection$$.next(value);
  }

  fetchAllBeers = (): Observable<Beer[]> => this.beerCollection$.pipe(
    map(col => Object.values(col)),
    take(1)
  );  

  searchBeers = (searchString: string): Observable<Beer[]> => this.beerCollection$.pipe(
    map(col => Object.values(col).filter(b => b.name.search(new RegExp(searchString, "i")) > -1)),
    take(1)
  );

  findById = (id: string): Beer => this.BeerCollection[id];

  insert = (item: Beer): Observable<Beer> => {
    const newBeer = {...item, ...{ id: uuid() } };

    this.BeerCollection = { ...this.BeerCollection, ...{ [newBeer.id] : newBeer } };

    return of(newBeer);
  }

  update = (item: Beer): Observable<Beer> => {
    this.BeerCollection = { ...this.BeerCollection, ...{ [item.id] : item } };

    return of(item);
  }
}

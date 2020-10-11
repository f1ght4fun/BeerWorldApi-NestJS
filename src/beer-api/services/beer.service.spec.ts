import { BeerType } from '../enums/beer-type.enum';
import { BeerService } from './beer.service';

describe('BeerService', () => {
  it('should insert new beer', async () => {
    const srv = new BeerService();
    
    srv.insert({ name: 'banana', beerType: BeerType.LAGER }).subscribe();
    srv.fetchAllBeers().subscribe((col) => expect(col.length).toEqual(1));
  });

  it('should find new beer by name after search', async () => {
    const srv = new BeerService();
    
    srv.insert({ name: 'banana', beerType: BeerType.LAGER }).subscribe();
    srv.searchBeers('bAn').subscribe((col) => expect(col.length).toEqual(1));
  });

  it('should update new beer', async () => {
    const srv = new BeerService();
    let collection;

    srv.insert({ name: 'banana', beerType: BeerType.LAGER }).subscribe();
    srv.searchBeers('bAn').subscribe((col) => (collection = col));

    expect(collection.length).toBe(1);
    expect(srv.findById(collection[0].id)).not.toBeUndefined();

    srv.update({...collection[0], ...{ rating: 5 } });

    srv.searchBeers('bAn').subscribe((col) => (collection = col));
    expect(collection[0].rating).toEqual(5);

  });
});
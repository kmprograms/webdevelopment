import {Component, OnInit} from '@angular/core';
import {Person} from './model/person';
import {Product} from './model/product';
import {Car} from './model/car';
import {Observable, Observer, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {TypeaheadMatch} from 'ngx-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // TYPEAHEAD 1
  private selectedColor: string;
  private colors: string[] = [
    'Acid green',
    'Alabaster',
    'Almond',
    'Amaranth',
    'Amazon',
    'Amber',
    'Apricot',
    'Auburn',
    'Avocado',
    'Azure'
  ];

  // TYPEAHEAD 2
  private selectedPersonName: string;
  private people: Person[] = [
    { id: 1, name: 'Andy', surname: 'Smith' },
    { id: 2, name: 'Andrew', surname: 'Green' },
    { id: 3, name: 'Johny', surname: 'Sleepwalker' },
    { id: 4, name: 'Jim', surname: 'Amaranth' }
  ];

  // TYPEAHEAD 3
  private selectedProductId: number;
  private selectedProduct: Product;
  private products: Product[] = [
    { id: 1, name: 'Oranges', price: 4.5 },
    { id: 2, name: 'Apples', price: 3.7 },
    { id: 3, name: 'Potatoes', price: 1.5 },
    { id: 4, name: 'Tomatoes', price: 3.4 }
  ];

  // TYPEAHEAD 4
  private asyncSelectedCarModel: string;
  private asyncSelectedCar: Car;
  private typeaheadLoading: boolean;
  private asyncCars: Observable<Car>;
  private cars: Car[] = [
    { id: 1, model: 'BMW', speed: 120 },
    { id: 2, model: 'AUDI', speed: 200 },
    { id: 3, model: 'MAZDA', speed: 180 },
    { id: 4, model: 'TOYOTA', speed: 170 },
    { id: 5, model: 'OPEL', speed: 210 },
    { id: 6, model: 'RENAULT', speed: 180 },
    { id: 7, model: 'CITROEN', speed: 170 },
    { id: 8, model: 'MERCEDES', speed: 190 }
  ];

  constructor() {}

  ngOnInit(): void {
    this.asyncCars = Observable
      .create((observer: Observer<Car>) => observer.next(this.asyncSelectedCar))
      .pipe(mergeMap((token: string) => this.getCarsAsObservable(token)));
  }

  getCarsAsObservable(token: string): Observable<Car[]> {
    const query = new RegExp(token, 'i');
    return of(
      this.cars.filter((car: Car) => query.test(car.model))
    );
  }

  onSelect($event: TypeaheadMatch): void {
    this.selectedProductId = $event.item.id;
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.asyncSelectedCar = e.item;
  }
}

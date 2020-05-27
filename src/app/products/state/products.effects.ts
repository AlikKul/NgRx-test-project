import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductsService } from '../products.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as productsActions from './products.actions';
import * as globalActions from '../../shared/state/global.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.GetProducts),
    map((action: productsActions.GetProducts) => action.payload),
    switchMap((name: string) => this.productsService.getProducts(name).pipe(
      map((products: Product[]) => (new productsActions.GetProductsSuccess(products))),
      catchError(error => of(new productsActions.GetProductsFail(error)))
    ))
  );

  @Effect()
  addNewProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.AddNewProduct),
    map((action: productsActions.AddNewProduct) => action.payload),
    switchMap((product: Product) =>
      this.productsService.addNewProduct(product).pipe(
        map(() => (new productsActions.AddNewProductSuccess())),
        catchError(error => of(new productsActions.AddNewProductFail(error)))
      )
    )
  );

  @Effect()
  addNewProductSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.AddNewProductSuccess),
    switchMap(() => of(new globalActions.SetAlert('New product successfully added.')))
  );

  @Effect()
  saveEditedProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.SaveEditedProduct),
    map((action: productsActions.SaveEditedProduct) => action.payload),
    switchMap((product: Product) =>
      this.productsService.updateProduct(product).pipe(
        map(() => (new productsActions.SaveEditedProductSuccess())),
        catchError(error => of(new productsActions.SaveEditedProductFail(error)))
      )
    )
  );

  @Effect()
  saveEditedProductSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.SaveEditedProductSuccess),
    switchMap(() => of(new globalActions.SetAlert('Product successfully updated.')))
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.DeleteProduct),
    map((action: productsActions.DeleteProduct) => action.payload),
    switchMap((id: string) =>
      this.productsService.deleteProduct(id).pipe(
        map(() => (new productsActions.DeleteProductSuccess())),
        catchError(error => of(new productsActions.DeleteProductFail(error)))
      )
    )
  );

  @Effect()
  deleteProductSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.DeleteProductSuccess),
    switchMap(() => of(new globalActions.SetAlert('Product deleted.')))
  );

}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductsService } from '../products.service';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as productsActions from './products.actions';
import * as globalActions from '../../shared/state/global.actions';
import { map, switchMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store
  ) {}

  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.GetProducts),
    map((action: productsActions.GetProducts) => {
      this.store.dispatch(new globalActions.SetShowLoader(true));
      return action.payload;
    }),
    switchMap((name: string) => this.productsService.getProducts(name).pipe(
      map((products: Product[]) => (new productsActions.GetProductsSuccess(products))),
      catchError(error => of(new productsActions.AddNewProductFail(error)))
    ))
  );

  @Effect()
  getProductsSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.GetProductsSuccess),
    switchMap(() => of(new globalActions.SetShowLoader(false)))
  );

  @Effect()
  addNewProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.AddNewProduct),
    map((action: productsActions.AddNewProduct) => {
      this.store.dispatch(new globalActions.SetShowLoader(true));
      return action.payload;
    }),
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
    mergeMap(() => [
      new globalActions.SetAlert('New product successfully added.'),
      new globalActions.SetShowLoader(false)
    ])
  );

  @Effect()
  saveEditedProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.SaveEditedProduct),
    map((action: productsActions.SaveEditedProduct) => {
      this.store.dispatch(new globalActions.SetShowLoader(true));
      return action.payload;
    }),
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
    mergeMap(() => [
      new globalActions.SetAlert('Product successfully updated.'),
      new globalActions.SetShowLoader(false)
    ])
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.DeleteProduct),
    map((action: productsActions.DeleteProduct) => {
      this.store.dispatch(new globalActions.SetShowLoader(true));
      return action.payload;
    }),
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
    mergeMap(() => [
      new globalActions.SetAlert('Product deleted.'),
      new globalActions.SetShowLoader(false)
    ])
  );

}

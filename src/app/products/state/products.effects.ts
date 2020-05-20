import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductsService } from '../products.service';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as productsActions from './products.actions';
import * as globalActions from '../../shared/state/global.actions';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
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
    map((action: productsActions.GetProducts) => action.payload),
    switchMap((name: string) => this.productsService.getProducts(name).pipe(
      map((products: Product[]) => (new productsActions.GetProductsSuccess(products))),
      catchError(error => of(new productsActions.AddNewProductFail(error)))
    ))
  );

  @Effect()
  addNewProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.AddNewProduct),
    map((action: productsActions.AddNewProduct) => action.payload),
    switchMap((product: Product) =>
      this.productsService.addNewProduct(product).pipe(
        map(() => (new productsActions.AddNewProductSuccess())),
        tap(() => this.store.dispatch(new globalActions.SetAlert('New product successfully added.'))),
        catchError(error => of(new productsActions.AddNewProductFail(error)))
      )
    )
  );

  @Effect()
  saveEditedProduct$: Observable<Action> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.SaveEditedProduct),
    map((action: productsActions.SaveEditedProduct) => action.payload),
    switchMap((product: Product) =>
      this.productsService.updateProduct(product).pipe(
        map(() => (new productsActions.SaveEditedProductSuccess())),
        tap(() => this.store.dispatch(new globalActions.SetAlert('Product successfully updated.'))),
        catchError(error => of(new productsActions.SaveEditedProductFail(error)))
      )
    )
  );

  @Effect()
  deleteProduct$: Observable<any> = this.actions$.pipe(
    ofType(productsActions.ProductsActionsTypes.DeleteProduct),
    map((action: productsActions.DeleteProduct) => action.payload),
    switchMap((id: string) =>
      this.productsService.deleteProduct(id).pipe(
        map(() => (new productsActions.DeleteProductSuccess())),
        tap(() => this.store.dispatch(new globalActions.SetAlert('Product deleted.'))),
        catchError(error => of(new productsActions.DeleteProductFail(error)))
      )
    )
  );

}

import { GlobalState } from '../shared/state/global.reducer';
import { UsersState } from '../users/state/users.reducer';
import { ProductsState } from '../products/state/products.reducer';

export interface State {
  global: GlobalState;
  users: UsersState;
  products: ProductsState;
}

import { UsersState } from '../users/state/users.reducer';
import { ProductsState } from '../products/state/products.reducer';

export interface State {
  users: UsersState;
  products: ProductsState;
}

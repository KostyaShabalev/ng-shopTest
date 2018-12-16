import { User } from './user';
import { Product } from './product.model';

export class Order {
  id: null;
  date?: null;
  client: User;
  total: number;
  items: {
    [key: string]: {
      product: Product,
      quantity: number
    }
  };
}

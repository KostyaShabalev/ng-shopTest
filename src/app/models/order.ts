export class Order {
  id: null;
  date?: null;
  client: {
    id: string;
    login: string;
    password: string;
    iat: number;
    exp: number;
  };
  total: number;
  items: {
    [key: string]: {
      product: {
        id?: string,
        title: string,
        description: string,
        category_id?: string,
        category_title: string,
        price: number,
        stock: number,
        thumbnail: string
      },
      quantity: number
    }
  };
}

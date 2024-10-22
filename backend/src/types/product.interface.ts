export interface Product {
  _id: number;
  category?: string;
  name: string;
  description: string;
  brand: string;
  model: string;
  variation: Array<{
    images: string[];
    width: string;
    height: string;
    depth: string;
    price: number;
    quantite: number;
    filter: {
      name: string;
      value: string;
    };
  }>;
}

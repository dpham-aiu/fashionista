export class Product {
  _id: Number;
  productName: String;
  productDescription: String;
  price: Number;
  imageURL: String;
  quantity: { type: Number; default: 0 };
  company: String;
  companyName: String;
}

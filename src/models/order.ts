
export class Order {
  datePlaced: number;
  items: any[];
  constructor(public userId: string, public shipping: any, cart: any) {
    this.datePlaced = new Date().getTime();
    this.items = cart.map(i => {
      // console.log("i", i)
      return {
        product: {
          title: i.product.title,
          imageUrl: i.product.imageUrl,
          price: i.product.price
        },
        quantity: i.quantity,
        totalPrice: i.product.price * i.quantity
      }
    })
  }
}

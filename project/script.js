const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

class GoodsItem {
  constructor({ title = 'Default', price = 0 }) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `
    <div class="goods-item">
      <h3>${this.title}</h3>
      <div class="goods-itemImg"></div>
      <p>${this.price}</p>
    </div>
  `
  }
}

class GoodsList {
  fetchData() {
    this.list = goods;
  }

  render() {
    const goodsList = this.list.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render()
    }).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
  }

  getTotalPrice() {
    const totalPrice = goods.reduce((total, goods) =>
      total + goods.price, 0);
    console.log(totalPrice);
  }
}

const goodsList = new GoodsList(goods);
goodsList.fetchData()
goodsList.render()
goodsList.getTotalPrice()
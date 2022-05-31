const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const BASA_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GET_GOODS_ITEMS_URL = `${BASA_URL}/catalogData.json`;
const GET_BASKET_URL = `${BASA_URL}/getBasket.json`;

function service(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url)
  const loadHandler = () => {
    callback(JSON.parse(xhr.response));
  }
  xhr.onload = loadHandler;

  xhr.send();
}


class GoodsItem {
  constructor({ product_name = 'Default', price = 0 }) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `
    <div class="goods-item">
      <h3>${this.product_name}</h3>
      <div class="goods-itemImg"></div>
      <p>${this.price}</p>
    </div>
  `
  }
}

class GoodsList {
  list = [];
  fetchData(callback) {
    service(GET_GOODS_ITEMS_URL, (data) => {
      this.list = data;
      callback();
    });
  }

  render() {
    const goodsList = this.list.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render()
    }).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
  }

  getTotalPrice() {
    return goods.reduce((total, goods) => total + goods.price, 0);
  }
}

class BasketGoods {
  list = [];
  fetchData(callback = () => { }) {
    service(GET_BASKET_URL, (data) => {
      this.list = data;
      callback();
    })
  };
}

const goodsList = new GoodsList(goods);
goodsList.fetchData(() => {
  goodsList.render();
});

const basketGoods = new BasketGoods();
basketGoods.fetchData();
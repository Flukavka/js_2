'use strict'

const BASA_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GET_GOODS_ITEMS_URL = `${BASA_URL}/catalogData.json`;
const GET_BASKET_URL = `${BASA_URL}/getBasket.json`;

function service(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url)
    xhr.send();
    xhr.onload = () => {
      resolve(JSON.parse(xhr.response))
    }
  })
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
  filteredItems = [];
  fetchData() {
    const prom = service(GET_GOODS_ITEMS_URL).then((data) => {
      this.list = data;
      this.filteredItems = data;
    });
    return prom;
  }

  filterItems(value) {
    this.filteredItems = this.list.filter(({ product_name }) => {
      return (new RegExp(value, 'gui')).test(product_name);
    })
  }

  render() {
    const goodsList = this.filteredItems.map(item => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render()
    }).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
  }
}

class BasketGoods {
  list = [];
  fetchData() {
    service(GET_BASKET_URL, (data) => {
      this.list = data;
    });
  }
}

const goodsList = new GoodsList();
goodsList.fetchData().then(() => {
  goodsList.render();
});

const basketGoods = new BasketGoods();
basketGoods.fetchData();



const input = document.querySelector('.search_text');
document.querySelector('.search_button').addEventListener('click', () => {
  goodsList.filterItems(input.value);
  goodsList.render();
});

input.addEventListener('keydown', () => {
  goodsList.filterItems(input.value);
  goodsList.render();
});

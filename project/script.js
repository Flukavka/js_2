'use strict'

const BASA_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GET_GOODS_ITEMS_URL = `${BASA_URL}/catalogData.json`;
const GET_BASKET_URL = `${BASA_URL}/getBasket.json`;

async function service(url) {
  return fetch(url).then((res) => res.json());
}

class BasketGoods {
  items = [];
  fetchData() {
    service(GET_BASKET_URL, (data) => {
      this.items = data;
    });
  }
}


window.onload = () => {
  const root = new Vue({
    el: '#root',
    data: {
      items: [],
      searchValue: '',
      /* cardVision: false, */
    },
    mounted() {
      service(GET_GOODS_ITEMS_URL).then((data) => {
        this.items = data;
      });
    },
    computed: {
      getTotalPrice() {
        return this.items.reduce((prev, { price }) => {
          return prev + price;
        }, 0)
      },
      filteredItems() {
        return this.items.filter(({ product_name }) => {
          return (new RegExp(this.searchValue, 'gui')).test(product_name);
        })
      },
    },
    methods: {
      visibleItem() {
        const openEl = document.querySelector('.cart-button');
        const hiddenEl = document.querySelector('.hidden');
        const closeEl = document.querySelector('.basket_headerBlock__mainClose');
        openEl.addEventListener('click', () => {
          hiddenEl.classList.toggle('basket_hidden');
        });

        closeEl.addEventListener('click', () => {
          hiddenEl.classList.add('basket_hidden');
        });
      },
    },

  })

  const goodsItem = Vue.component('goods-item', {
    props: ['item'],
    template: `
    <div class="goods-item">
               <h3>{{item.product_name}}</h3>
               <div class="goods-itemImg"></div>
               <p>{{item.price}}</p>
            </div>
    `
  })
}
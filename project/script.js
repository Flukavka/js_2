'use strict'

const BASA_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const GET_GOODS_ITEMS_URL = `${BASA_URL}/catalogData.json`;
const GET_BASKET_URL = `${BASA_URL}/getBasket.json`;

async function service(url) {
  return fetch(url).then((res) => res.json());
}


window.onload = () => {
  const root = new Vue({
    el: '#root',
    data: {
      items: [],
      searchValue: '',
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
};

const goodsItem = Vue.component('goods-item', {
  props: ['item'],
  template: `
  <div class="goods-item">
             <h3>{{item.product_name}}</h3>
             <div class="goods-itemImg"></div>
             <p>{{item.price}}</p>
             <button class="goods-itemBtn">В корзину</button>
          </div>
  `
});

const goodsSearh = Vue.component('searh', {
  template: `
  <input type="text" class="search_text" placeholder="Наименование продукта" @input="$emit('input', $event.target.value)"/>
  `},
  {
    computed: {
      filteredItems() {
        return this.items.filter(({ product_name }) => {
          return (new RegExp(this.searchValue, 'gui')).test(product_name);
        })
      }
    }
  });

const goodsBasket = Vue.component('basket', {
  data() {
    return {
      basketGoodsItem: []
    }
  },
  mounted() {
    service(GET_BASKET_URL).then((data) => {
      this.items = data;
    });
  },
  template: `
  <div class="basket">
               <div class="hidden basket_hidden">
                  <div class="basket_headerBlock">
                     <div class="basket_headerBlock__main">
                        <div class="basket_headerBlock__mainHeadding">Корзина</div>
                        <div class="basket_headerBlock__mainClose"><img src="img/closePurple.svg" alt="close"></div>
                     </div>
                     <div class="basket_headerBlock__goods">
                        <div class="basket_headerBlock__goodsName">Наименование товара</div>
                        <div class="basket_headerBlock__goodsPrice">Стоимость</div>
                        <div class="basket_headerBlock__goodsCount">Количество</div>
                     </div>
                  </div>
                  <div class="basket_userBlock">
                     <div class="basket_userBlock__productName">Default</div>
                  <div class="basket_userBlock__productPrice">
                     <span class="basket_userBlock__productPriceValue">0</span>
                     <span class="basket_userBlock__productPriceValute">₽</span>
                  </div>
                  <div class="basket_userBlock__productCount">
                     <input class="basket_userBlock__productCountValue" placeholder="1" type="tel">
                     <span class="basket_userBlock__productCountDesignation">шт</span>
                  </div>
                  <button class="basket_userBlock__deleteBtn">Удалить</button>
                  </div>
                  <div class="basket_totalBlock">
                     <div class="basket_totalBlock__headding">Итого</div>
                     <div class="basket_totalBlock__price">
                        <span class="basket_totalBlock__priceValue">0</span>
                        <span class="basket_totalBlock__priceValute">₽</span>
                     </div>
                  </div>
                  <button class="basket_orderBtn">Заказать</button>
               </div>
            </div>
  `
})

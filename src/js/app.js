import {settings, select} from './settings.js';
import Product from './Components/Product.js';
import Cart from './Components/Cart.js';

const app = {
  initData: function(){
    const thisApp = this;
    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.product;
    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);
        thisApp.data.products = parsedResponse;
        app.initMenu();
      });
    console.log('thisApp.data', JSON.stringify(thisApp.data));
  },
  initMenu: function(){
    const thisApp = this;
    for (let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },
  init: function(){
    const thisApp = this;
    thisApp.initData();
  },
  initCart: function(){
    const thisApp = this;
    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);
    thisApp.productList = document.querySelector(select.containerOf.menu);
    thisApp.productList.addEventListener('add-to-cart', function(event){
      app.cart.add(event.detail.product);
    });
  },
};
app.init();
app.initCart();

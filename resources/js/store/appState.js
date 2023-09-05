import { makeAutoObservable } from "mobx";

class appState {

  categories = [];
  cartTotal = JSON.parse(localStorage.getItem('cart'))?.cartTotal || 0;

  constructor() {
    makeAutoObservable(this);
  }

  changeCategories(values) {   
    this.categories = values;
  }
  changeCartTotal(n) {   
    this.cartTotal = n;
  }

  get allCategories() {
    return this.categories;
  }

  get cartTotalVal() {
    return this.cartTotal;
  }

}

export default new appState();

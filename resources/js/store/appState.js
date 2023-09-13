import { makeAutoObservable } from "mobx";

class appState {

  categories = [];
  cartTotal = JSON.parse(localStorage.getItem('cart'))?.cartTotal || 0;
  snackOpen = false;
  snackSeverity = 'success';
  snackText = '';
  orderId = 38;

  constructor() {
    makeAutoObservable(this);
  }

  changeCategories(values) {
    this.categories = values;
  }

  changeCartTotal(n) {
    this.cartTotal = n;
  }

  openSnackbar(severity, text) {
    this.snackSeverity= severity;
    this.snackText = text;
    this.snackOpen = true;
  }

  closeSnackbar() {
    this.snackOpen = false;
  }

  changeOrderId(id) {
    this.orderId = id;
  }

  get allCategories() {
    return this.categories;
  }

  get cartTotalVal() {
    return this.cartTotal;
  }

  get snackbarOpen() {
    return this.snackOpen;
  }
  get snackbarSeverity() {
    return this.snackSeverity;
  }
  get snackbarText() {
    return this.snackText;
  }

  get orderIdVal() {
    return this.orderId;
  }

}

export default new appState();

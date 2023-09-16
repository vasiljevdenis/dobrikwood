import { makeAutoObservable } from "mobx";

class appState {

  categories = [];
  cartTotal = JSON.parse(localStorage.getItem('cart'))?.cartTotal || 0;
  snackOpen = false;
  snackSeverity = 'success';
  snackText = '';
  orderId = 0;
  address = {
    city: '',
    street: '',
    house: ''
  };
  customOrderModal = false;

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

  changeAddress(a) {
    this.address = a;
  }

  openCustomOrderModal() {
    this.customOrderModal = true;
  }

  closeCustomOrderModal() {
    this.customOrderModal = false;
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

  get addressVal() {
    return this.address;
  }

  get customOrderModalVal() {
    return this.customOrderModal;
  }

}

export default new appState();

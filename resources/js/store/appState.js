import { makeAutoObservable } from "mobx";

class appState {

  categories = [];

  constructor() {
    makeAutoObservable(this);
  }

  changeCategories(values) {   
    this.categories = values;
  }

  get allCategories() {
    return this.categories;
  }

}

export default new appState();

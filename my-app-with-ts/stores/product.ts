import { runInAction, makeAutoObservable } from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import axios from "axios";
import { ICategory } from "../models";

enableStaticRendering(typeof window === "undefined");

export class ProductStore {
  categoryList: Array<ICategory> = [];

  constructor() {
    makeAutoObservable(this);
  }

  getCategoryList = async () => {
    const api = "http://192.168.1.13:6001/v1/grandet_public/nft_get_categories";
    const { data } = await axios.post(api);

    runInAction(() => {
      this.categoryList = data.data;
    });
  };

  hydrate = (data: any) => {
    if (!data) return;

    this.categoryList = [...data.categoryList];
  };
}

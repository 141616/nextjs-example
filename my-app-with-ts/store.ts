import {
  action,
  observable,
  computed,
  runInAction,
  makeObservable,
  makeAutoObservable,
} from "mobx";
import { enableStaticRendering } from "mobx-react-lite";
import axios from "axios";
import { ICategory } from "./models";

enableStaticRendering(typeof window === "undefined");

export class Store {
  lastUpdate = 0;
  light = false;

  categoryList: Array<ICategory> = [];

  timer: any = null;

  constructor() {
    makeAutoObservable(this);
    // makeObservable(this, {
    //   lastUpdate: observable,
    //   light: observable,
    //   start: action,
    //   hydrate: action,
    //   timeString: computed,
    //   categoryList: observable,
    //   getCategoryList: action.bound,
    // });
  }

  start = () => {
    this.timer = setInterval(() => {
      runInAction(() => {
        this.lastUpdate = Date.now();
        this.light = true;
      });
    }, 1000);
  };

  get timeString() {
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    const format = (t: Date) =>
      `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(
        t.getUTCSeconds()
      )}`;
    return format(new Date(this.lastUpdate));
  }

  stop = () => clearInterval(this.timer);

  getCategoryList = async () => {
    const api = "http://192.168.1.13:6001/v1/grandet_public/nft_get_categories";
    const { data } = await axios.post(api);

    runInAction(() => {
      this.categoryList = data.data;
    });
  };

  hydrate = (data: any) => {
    if (!data) return;

    this.lastUpdate = data.lastUpdate !== null ? data.lastUpdate : Date.now();
    this.light = !!data.light;

    this.categoryList = [...data.categoryList];
  };
}

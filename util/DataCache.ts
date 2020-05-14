class DataCache {
  millisecondsToLive: number;
  fetchFunction: Function;
  cache: any;
  fetchDate: Date;
  single: boolean; // if the cache should be an object with key value pairs or just the data itself

  constructor(fetchFunction: Function, single = true, minutesToLive = 60 * 24) {
    this.millisecondsToLive = minutesToLive * 60 * 1000;
    this.fetchFunction = fetchFunction;
    this.cache = single ? {} : null;
    this.getData = this.getData.bind(this);
    this.resetCache = this.resetCache.bind(this);
    this.isCacheExpired = this.isCacheExpired.bind(this);
    this.fetchDate = new Date(0);
    this.single = single;
  }
  isCacheExpired() {
    return (
      this.fetchDate.getTime() + this.millisecondsToLive < new Date().getTime()
    );
  }
  getData(...params: any) {
    if (this.single) {
      if (!this.cache[params[0]] || this.isCacheExpired()) {
        return this.fetchFunction(params).then((data: any) => {
          this.cache[params[0]] = data;
          this.fetchDate = new Date();
          return data;
        });
      } else {
        return Promise.resolve(this.cache[params[0]]);
      }
    }

    if (!this.cache || this.isCacheExpired()) {
      return this.fetchFunction(params).then((data: any) => {
        this.cache = data;
        this.fetchDate = new Date();
        return data;
      });
    } else {
      return Promise.resolve(this.cache);
    }
  }
  resetCache() {
    this.fetchDate = new Date(0);
  }
}

export default DataCache;

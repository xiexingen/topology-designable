/* eslint-disable @typescript-eslint/ban-types */
export default class EventBus {
  private eventMap: {
    [key:string]: Array<Function>
  };
  constructor() {
    this.eventMap = {};
  }
  on(eventName:string, callback:Function) {
    if (!this.eventMap[eventName]?.length) {
      this.eventMap[eventName] = [];
    }
    this.eventMap[eventName].push(callback);
  }
  off(eventName:string, callback:Function) {
    this.eventMap[eventName] = this.eventMap[eventName].filter(item=>item !== callback);
  }
  emit(eventName:string, ...args: unknown[]) {
    if (this.eventMap[eventName]) {
      this.eventMap[eventName].forEach(callback => callback(...args));
    }
  }
}

export default class LocalStorage {
  static get(key: string, fallback) {
    const value = localStorage.getItem(key);
    return (value) ? JSON.parse(value) : fallback;
  }

  static set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static clearFromLocalStorage(keysToDelete) {
    for (const key of keysToDelete) {
      window.localStorage.removeItem(key);
    }
  }
}

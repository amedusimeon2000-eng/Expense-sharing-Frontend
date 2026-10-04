import localForage from 'localforage';

localForage.config({
  driver: [localForage.INDEXEDDB, localForage.LOCALSTORAGE],
  name: 'splitbook',
  version: 1.0,
});

export class LocalForageActions {
  static store = async (key, data) => {
    await localForage.setItem(key, data);
  };

  static fetch = async (key) => {
    const token = await localForage.getItem(key);
    return token;
  };

  static delete = async (key) => {
    await localForage.removeItem(key);
  };
}

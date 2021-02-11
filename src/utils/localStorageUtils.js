
export const getLocalStorageUtils = (key, initialValue = null) => {
  const storedValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  };

  const setValue = value => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const clearValue = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue, clearValue];
};

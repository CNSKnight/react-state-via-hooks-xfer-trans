// [https://flow.org/en/docs/types/generics/](generically typed) functions
export const getValue = <Gen1>(key: string, initVal: Gen1): Gen1 => {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initVal
    return item ? JSON.parse(item) : initVal;
  } catch (error) {
    // If error also return initVal
    console.log(error);
    return initVal;
  }
};

export const setValue = <Gen1>(key: string, val: Gen1): void => {
  try {
    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(val));
  } catch (error) {
    // A more advanced implementation would handle the error case
    console.log(error);
  }
};

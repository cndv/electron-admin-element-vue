/**
 * 数组合并并去重
 * @param arr1 数组1
 * @param arr2 数组2
 */
export function mergeUnique<T>(arr1: Array<T>, arr2: Array<T>): Array<T> {
  const arr: Array<T> = arr1;
  for (let index = 0, len = arr2.length; index < len; index += 1) {
    if (!arr.includes(arr2[index])) {
      arr.push(arr2[index]);
    }
  }

  return arr;
}

/**
 * 数组去重
 * @param arr 数组
 */
export function unique<T>(arr: Array<T>): Array<T> {
  const array: Array<T> = [];
  for (let index = 0, len = arr.length; index < len; index += 1) {
    if (!array.includes(arr[index])) {
      array.push(arr[index]);
    }
  }
  return array;
}


export function deepClone(obj: Object): Object {
  const newObj = Array.isArray(obj) ? [] : {}

  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj && typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
      }
    }
  }

  return newObj
}


export function setDataNull(data: Object): any {
  let key: string

  for (key in data) {
    switch (typeof data[key]) {
      case 'object':
        data[key] = {};
        break;
      case 'number':
        data[key] = 0;
        break;

      default:
        data[key] = '';
        break;
    }
  }

  return data
}
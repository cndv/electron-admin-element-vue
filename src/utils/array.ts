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


export function deepClone<T>(obj: object): T {
  const newObj = Array.isArray(obj) ? [] : {}

  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj && typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
      }
    }
  }

  return <T>newObj
}


export function setDataNull(data: Object): Object {
  let key: string

  for (key in data) {
    const isArray: boolean = (data[key] instanceof Array)
    const type: string = typeof data[key]

    // console.log(isArray, type, data[key])

    if (isArray) {
      data[key] = [];
    } else if (type == 'object') {
      data[key] = {};
    } else if (type == 'number') {
      data[key] = 0;
    } else {
      data[key] = '';
    }
  }

  return data
}
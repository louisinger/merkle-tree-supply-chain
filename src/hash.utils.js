import sha256 from 'crypto-js/sha256'

/**
 * Function that zip two array.
 * zip(['one', 'two', 'three'], [1, 2, 3]) ====> [['one', 1], ['two', 2], ['three', 3]]
 * @param {Array<any>} arr1 first array
 * @param {Array<any>} arr2 second array
 */
function zip (arr1, arr2) {
  return arr1.map((k, i) => [k, arr2[i]])
}

/**
 * Return the hash of the object.
 * @param {Object!} data the data object of the traceable.
 * @param {string!} prefix the prefix to add.
 */
export function objectSHA256 (data, prefix = '') {
  const hash = sha256.create()
  const keyValuePairs = zip(Object.keys(data), Object.values(data))
  keyValuePairs.sort()
  const valueToHash = keyValuePairs.toString()
  hash.update(prefix + valueToHash)
  return hash.hex()
}
import sha256 from 'crypto-js/sha256'
import { config } from 'dotenv'
config()

const prefix = process.env.HASH_PREFIX

/**
 * Returns the hash of an object given as parameter.
 * @param {String} data the object to digest.
 */
export default function hash (data) {
  return sha256(prefix + data)
}

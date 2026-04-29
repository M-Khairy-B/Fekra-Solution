import type { Address } from '../types'

export function formatAddress(address: Address): string {
  return `${address.street}, ${address.city} ${address.zipcode}`
}

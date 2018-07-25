import { orderBy } from 'lodash'

export const isPositive = change => parseFloat(change) > 0

export const sortCryptos = (
  cryptos,
  key = 'quotes.USD.price',
  order = 'desc'
) =>
  orderBy(cryptos, key, order)

export const isValidInput = input => /^[0-9]+([,.][0-9]+)?$/g.test(input)

export const formatCoinValue = (coins, price) => {
  let c = parseFloat(coins), p = parseFloat(price)
  if (Number.isNaN(c) || Number.isNaN(p)) return 0
  return (c * p).toFixed(3)
}

export const toTitleCase = str => {
  return str.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

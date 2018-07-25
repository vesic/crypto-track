import { 
  isPositive, 
  sortCryptos, 
  isValidInput, 
  formatCoinValue,
  toTitleCase
 } from './crypto-helpers.js'

describe("crypto-helpers", () => {
  it("returns true if positive is passed", () => {
    expect(isPositive('1')).toBe(true);
    expect(isPositive(1)).toBe(true);
  });

  it("returns false if negative is passed", () => {
    expect(isPositive('-1')).toBe(false);
    expect(isPositive(-1)).toBe(false);
  });
});

describe("sortCryptos()", () => {
  let cryptos;
  beforeEach(() => {
    cryptos = [
      {name:'crypto1', value:'1'},
      {name:'crypto2', value:'2'},
      {name:'crypto3', value:'3'},
    ]
  });

  it("sorts by key asc", () => {
    expect(sortCryptos(cryptos, 'value', 'asc')[0].name).toEqual('crypto1');
  });

  it("sorts by key desc", () => {
    expect(sortCryptos(cryptos, 'value', 'desc')[0].name).toEqual('crypto3');
  });
});

describe("isValidInput()", () => {
  it("returns false is input is invalid", () => {
    expect(isValidInput('')).toBe(false);
    expect(isValidInput('123abc')).toBe(false);
  });

  it("returns true is input is valid", () => {
    expect(isValidInput('123')).toBe(true);
  });
});

describe('formatCoinValue()', () => {
  it('returns 0 if value isNaN', () => {
    expect(formatCoinValue('a', 1)).toEqual(0)
    expect(formatCoinValue(1, 'a')).toEqual(0)
  })

  it('returns `2.000` if 1 and 2 are passed', () => {
    expect(formatCoinValue(1, 2)).toEqual('2.000')
  })
})

describe('toTitleCase()', () => {
  it('returns Hello World when hello world is passed', () => {
    expect(toTitleCase('hello world')).toEqual('Hello World')
  })
})

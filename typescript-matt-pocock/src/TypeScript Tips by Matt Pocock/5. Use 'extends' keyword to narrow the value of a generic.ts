// https://www.totaltypescript.com/tips/use-extends-keyword-to-narrow-the-value-of-a-generic

// Given an object that can be deeply nested

const obj = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: 'cool',
    d: 2,
  },
};

// We can use extends here to say the FirstKey needs to be keyof Obj and the SecondKey keyof Obj[FirstKey]

export const getDeepValue = <
  Obj,
  FirstKey extends keyof Obj,
  SecondKey extends keyof Obj[FirstKey]
>(
  obj: Obj,
  firstKey: FirstKey,
  secondKey: SecondKey
): Obj[FirstKey][SecondKey] => {
  return {} as any;
};


// We want to get a deep value from an object

const result = getDeepValue(obj, 'bar', 'd');

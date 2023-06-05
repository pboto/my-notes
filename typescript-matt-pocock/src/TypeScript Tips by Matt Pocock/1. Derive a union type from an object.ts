/*
https://www.totaltypescript.com/tips/derive-a-union-type-from-an-object

Given the fruitCounts object, we want to create a type that allows to have just one fruit count.

const fruitCounts = {
  apple: 1,
  pear: 4,
  banana: 26
};

const singleFruitCount: NewSingleFruitCount = {
  apple: 1,
};

*/

// Set the initial object

const fruitCounts = {
  apple: 1,
  pear: 4,
  banana: 26,
};

// Create a fruitCounts type

type FruitCounts = typeof fruitCounts;

// Create an union type with all possible fruits

type Fruits = keyof FruitCounts;

// Take each key in FruitCounts and setting its type to an empty object

type NewSingleFruitCount1 = {
  [K in Fruits]: {};
};

// Map over this type to get rid of those parent keys, and fully create an union type

type NewSingleFruitCount2 = {
  [K in Fruits]: {
    [K2 in K]: number;
  };
}[Fruits];

// Generalize the type

type SingleFieldObject <T> = {
  [K in keyof T]: {
    [K2 in K]: number;
  };
}[keyof T];

// Crete an object with just one fruit count

export const singleFruitCount: SingleFieldObject<typeof fruitCounts> = {
  apple: 2,
};

const x = 2
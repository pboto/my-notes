/**
 * Pure Functions
 * A pure function is a function that always produces the same output for the same input and has no side effects.
 * It does not modify any external state or variables and relies solely on the input parameters.
 * */

function double(num: number): number {
  return num * 2;
}

function square(num: number): number {
  return num * num;
}

/** In functional programming, a functor is an object or data structure that can be mapped over.
 * It provides a way to apply a function to the values inside the functor while preserving its structure.
 * In TypeScript, functors can be implemented using classes or interfaces.
 * */

class MyFunctor<T> {
  constructor(private value: T) {}

  map<R>(fn: (value: T) => R): MyFunctor<R> {
    return new MyFunctor<R>(fn(this.value));
  }
}

const myNumber = new MyFunctor(5);
const doubledNumber = myNumber.map(double);

console.log(doubledNumber); // Output: MyFunctor<number> { value: 10 }

/**In summary, a functor in TypeScript is an object or data structure that implements the map method,
 * allowing us to apply functions to the values it holds while maintaining the functor's structure.
 * It promotes functional programming principles by enabling transformations and avoiding direct modifications of values. */

/** We can define a functor that maps arrays of values to arrays of transformed values. */

// Functor interface
interface Functor<T> {
  map<U>(fn: (value: T) => U): Functor<U>;
}

// ArrayFunctor class
class ArrayFunctor<T> implements Functor<T> {
  constructor(private readonly array: T[]) {}

  map<U>(fn: (value: T) => U): ArrayFunctor<U> {
    const transformedArray = this.array.map(fn);
    return new ArrayFunctor<U>(transformedArray);
  }
}

/**
 * In this example, we define the Functor interface with a single method map, which takes a function and returns a new functor with the transformed values.
 * The ArrayFunctor class implements this interface and represents the functor for arrays.
 * Here's how you can use the ArrayFunctor: */

const originalArray = [1, 2, 3, 4, 5];
const functor = new ArrayFunctor(originalArray);

const doubledFunctor = functor.map(double);
console.log(doubledFunctor); // ArrayFunctor [ 2, 4, 6, 8, 10 ]

const squaredFunctor = functor.map(square);
console.log(squaredFunctor); // ArrayFunctor [ 1, 4, 9, 16, 25 ]

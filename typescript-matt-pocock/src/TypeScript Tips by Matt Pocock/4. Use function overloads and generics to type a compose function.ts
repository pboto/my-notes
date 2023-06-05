// https://www.totaltypescript.com/tips/use-function-overloads-and-generics-to-type-a-compose-function

// Here we have a compose function which takes in multiple other functions and produces another function.

export function compose<Input, FirstArg>(
  func: (input: Input) => FirstArg
): (input: Input) => FirstArg;

export function compose<Input, FirstArg, SecondArg>(
  func: (input: Input) => FirstArg,
  func2: (input: FirstArg) => SecondArg
): (input: Input) => SecondArg;

export function compose<Input, FirstArg, SecondArg, ThirdArg>(
  func: (input: Input) => FirstArg,
  func2: (input: FirstArg) => SecondArg,
  func3: (input: SecondArg) => ThirdArg
): (input: Input) => ThirdArg;

export function compose(...args: any[]) {
  return {} as any;
}

// Let's call the compose function passing it the first function.

const addOne = (a: number) => {
  return a + 1;
};

let result1 = compose(addOne);

// We add a second function.

const numToString = (a: number) => {
  return a.toString();
};

let result2 = compose(addOne, numToString);

// We add a third function.

const stringToNum = (a: string) => {
  return parseInt(a);
};

let result3 = compose(addOne, numToString, stringToNum);

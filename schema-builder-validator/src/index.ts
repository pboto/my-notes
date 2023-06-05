/**
 * https://medium.com/@awekening_bro/create-a-schema-builder-and-validator-library-from-scratch-in-typescript-268d5e7b4f70
 */

interface Parser<T> {
  parse: (value: unknown) => T;
}

const StringParser: Parser<string> = {
  parse: (value: unknown) => {
    if (typeof value !== 'string') throw new Error('invalid type!');
    return value;
  },
};

function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string!');
  }
}

type ParseFunc<T> = () => Parser<T>;

type Schema<T> = Record<string, ParseFunc<T>>;

const z = () => ({
  string: () => ({
    parse: (val: unknown): undefined | string => {
      console.log(val)
      assertIsString(val);
      return val;
    },
  }),
});

const schema = z().string();

schema.parse('hello'); // -> "hello"

schema.parse(5); // -> throws Error

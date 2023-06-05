/*
https://www.totaltypescript.com/tips/use-in-operator-to-transform-a-union-to-another-union

Given this type:

type Entity =
  | {
      kind: 'user';
    }
  | {
      kind: 'post';
    }
  | {
      kind: 'comment';
    };

Get a new type where a field is dynamically added to each possible Entity value This field contains the respective Id and its name is <kind>Id)

type EntityWithId0 =
  | {
      kind: 'user';
      userId: string;
    }
  | {
      kind: 'post';
      postId: string;
    }
  | {
      kind: 'comment';
      commentId: string;
    };

*/

// Define the initial type

type Entity =
  | {
      kind: 'user';
    }
  | {
      kind: 'post';
    }
  | {
      kind: 'comment';
  };
    
// Get a type with the possible values of the Entity kind field

type step1 = Entity['kind'];

// Get an object type where the fields names are equal to these values

type step2 = { [EntityKind in Entity['kind']]: {} };

// Add the kind field to each object field

type step3 = { [EntityKind in Entity['kind']]: { kind: EntityKind } };

// Turn this type into an Union type

type step4 = {
  [EntityKind in Entity['kind']]: { kind: EntityKind };
}[Entity['kind']];

// Add the Id field

type EntityWithId = {
  [EntityKind in Entity['kind']]: { kind: EntityKind } & Record<
    `${EntityKind}Id`,
    string
  >;
}[Entity['kind']];

// Use this type

const result: EntityWithId = {
  kind: 'comment',
  commentId: '123',
};

console.log({ result });
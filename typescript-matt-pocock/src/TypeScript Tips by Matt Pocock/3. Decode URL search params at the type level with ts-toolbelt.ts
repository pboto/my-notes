/*
We want to take this following query:

const query = `/home?a=foo&b=wow`;

And turn it into an object like this:

const obj3: Union.Merge<QueryParams> = {
  a: 'foo',
  b: 'wow',
};

*/

import { String, Union } from 'ts-toolbelt';

// Set a query value

const query0 = `/home?a=foo&b=wow`;

// Create a new type equal to the type of the query variable

type Query = typeof query0;

// Create a type that contains the second query part

type SecondQueryPart = String.Split<Query, '?'>[1]

// Create a type containing the query elements

type QueryElements = String.Split<SecondQueryPart, '&'>

// Set a new object type with all QueryElements (each QueryElement is set to an empty object)

type QueryParams_temp0 = {
  [QueryElement in QueryElements[number]]: {}
};

// Modify the type so that each QueryElement object has one field containing the QueryElement value (the field key is named 'key')

type QueryParams_temp1 = {
  [QueryElement in QueryElements[number]]: {
    key: QueryElement;
  };
};

// Change the field key so that it contains the first part of the QueryElement (on the left side of the '=' symbol)

type QueryParams_temp2 = {
  [QueryElement in QueryElements[number]]: {
    [Key in String.Split<QueryElement, "=">[0]]: QueryElement;
  };
};

// Change the field value so that it contains the second part of the QueryElement (on the right side of the '=' symbol)

type QueryParams_temp3 = {
  [QueryElement in QueryElements[number]]: {
    [Key in String.Split<QueryElement, '='>[0]]: String.Split<
      QueryElement,
      '='
    >[1];
  };
};

// Iterate over each each member of the object type, since we don't want it to be the nested structure, just the key value pairs of the query params.

type QueryParams_temp4 = {
  [QueryElement in QueryElements[number]]: {
    [Key in String.Split<QueryElement, '='>[0]]: String.Split<
      QueryElement,
      '='
    >[1];
  };
}[QueryElements[number]];

// Merge the QueryParams into an object.

type QueryParams_temp5 = Union.Merge<QueryParams_temp4>;

// Define an object

const queryParams: QueryParams_temp5 = {
  a: 'foo',
  b: 'wow',
};

// Get the final type representation replacing all intermediate steps

type QueryParams<Query extends string> = Union.Merge<
  {
    [QueryElement in String.Split<String.Split<Query, '?'>[1], '&'>[number]]: {
      [Key in String.Split<QueryElement, '='>[0]]: String.Split<
        QueryElement,
        '='
      >[1];
    };
  }[String.Split<String.Split<Query, '?'>[1], '&'>[number]]
>;

// If we change the query string, the object type is automatically changed.

const query1 = `/home?a=foo&b=wow&c=new`;

type Query1Params = QueryParams<typeof query1>

const query1Params: Query1Params = {
  a: 'foo',
  b: 'wow',
  c: 'new'
};

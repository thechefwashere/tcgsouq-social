import test from 'node:test';
import assert from 'node:assert/strict';
import { assertReadOnly } from '../src/lib/shopify.js';

const allowed = [
  '{ shop { ianaTimezone } }',
  'query Orders($first: Int!) { orders(first: $first) { nodes { id } } }',
  'query Ql($q: String!) { shopifyqlQuery(query: $q) { tableData { rows } } }',
  // The word appears inside a string argument, not as an operation.
  'query Q { products(first: 1, query: "title:mutation") { nodes { id } } }',
  // ...and inside a comment.
  '# mutation productUpdate would go here\n{ shop { name } }',
  // A field that merely starts with the letters is not an operation.
  'query Q { mutationSafeField { id } }',
];

const refused = [
  'mutation { productUpdate(product: {id: "gid://shopify/Product/1"}) { product { id } } }',
  'mutation Rename($id: ID!) { productUpdate(product: {id: $id}) { product { id } } }',
  'query A { shop { name } }\nmutation B { productDelete(input: {id: "x"}) { deletedProductId } }',
  'subscription { orders { id } }',
  '  mutation  (  $x: ID! )  { noop }',
];

test('read-only queries are allowed through', () => {
  for (const q of allowed) assert.doesNotThrow(() => assertReadOnly(q), q);
});

test('mutations and subscriptions are refused', () => {
  for (const q of refused) {
    assert.throws(() => assertReadOnly(q), /read-only|Refusing/, q);
  }
});

/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
type TodoListFooter_user$ref = any;
type TodoList_user$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type TodoApp_user$ref: FragmentReference;
declare export opaque type TodoApp_user$fragmentType: TodoApp_user$ref;
export type TodoApp_user = {|
  +id: string,
  +userId: string,
  +totalCount: number,
  +completedCount: number,
  +$fragmentRefs: TodoListFooter_user$ref & TodoList_user$ref,
  +$refType: TodoApp_user$ref,
|};
export type TodoApp_user$data = TodoApp_user;
export type TodoApp_user$key = {
  +$data?: TodoApp_user$data,
  +$fragmentRefs: TodoApp_user$ref,
};
*/


const node/*: ReaderFragment*/ = {
  "kind": "Fragment",
  "name": "TodoApp_user",
  "type": "User",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "userId",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "totalCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "completedCount",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TodoListFooter_user",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "TodoList_user",
      "args": null
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = 'ecccdb5a17f0428603f76e1bbaa8ea9d';
module.exports = node;

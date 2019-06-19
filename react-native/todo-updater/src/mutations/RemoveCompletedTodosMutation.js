// @flow
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
    commitMutation,
    graphql,
    Disposable,
    Environment,
    //RecordSourceSelectorProxy,
  } from 'react-relay-offline';
  
  import {ConnectionHandler} from 'relay-runtime';
  
  const mutation = graphql`
    mutation RemoveCompletedTodosMutation($input: RemoveCompletedTodosInput!) {
      removeCompletedTodos(input: $input) {
        deletedTodoIds
        user {
          completedCount
          totalCount
        }
      }
    }
  `;
  
  function sharedUpdater(
    store,
    user,
    deletedIDs,
  ) {
    const userProxy = store.get(user.id);
    const conn = ConnectionHandler.getConnection(userProxy, 'TodoList_todos');
  
    // Purposefully type forEach as void, to toss the result of deleteNode
    deletedIDs.forEach(
      (deletedID) => ConnectionHandler.deleteNode(conn, deletedID),
    );
  }
  
  function commit(
    environment,
    todos,
    user,
  ) {
    const input = {
      userId: user.userId,
    };
  
    commitMutation(environment, {
      mutation,
      variables: {
        input,
      },
      updater: (store) => {
        const payload = store.getRootField('removeCompletedTodos');
        const deletedIds = payload.getValue('deletedTodoIds');
  
        // $FlowFixMe `payload.getValue` returns mixed, not sure how to check refinement to $ReadOnlyArray<string>
        sharedUpdater(store, user, deletedIds);
      },
      optimisticUpdater: (store) => {
        // Relay returns Maybe types a lot of times in a connection that we need to cater for
        const completedNodeIds = todos.edges
          ? todos.edges
              .filter(Boolean)
              .map((edge) => edge.node)
              .filter(Boolean)
              .filter((node) => node.complete)
              .map((node) => node.id)
          : [];
  
        const userRecord = store.get(user.id);
        userRecord.setValue(userRecord.getValue('totalCount')-completedNodeIds.length, 'totalCount');
        userRecord.setValue(0, 'completedCount');
        sharedUpdater(store, user, completedNodeIds);
      },
    });
  }
  
  export default {commit};
  
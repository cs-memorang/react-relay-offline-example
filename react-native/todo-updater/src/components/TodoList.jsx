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

//import MarkAllTodosMutation from '../mutations/MarkAllTodosMutation';
import Todo from './Todo';

import React, {useState} from 'react';
import {createPaginationContainer, graphql} from 'react-relay-offline';
import { Text, ScrollView, RefreshControl, FlatList, Button, StyleSheet } from "react-native";

// import styled from "styled-components/native";

// const StyledMain = styled.View`
//   position: relative;
//   z-index: 2;
//   border: 1px solid #e6e6e6;
// `;

const TodoList = ({
  relay,
  user,
  user: {todos, totalCount, completedCount},
}) => {
  /*const handleMarkAllChange = (e: any) => {
    const complete = e.currentTarget.checked;

    if (todos) {
      MarkAllTodosMutation.commit(relay.environment, complete, todos, user);
    }
  };*/

  const [ refreshing, setRefreshing ] = useState(false);
  const onRefresh = async () => {
    //setRefreshing(true);
    //refetch({}, {}, () => setRefreshing(false))
    
  }

  const nodes =
    todos && todos.edges
      ? todos.edges
          .filter(Boolean)
          .map((edge) => edge.node)
          .filter(Boolean)
      : [];

  return (
  <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} style={styles.StyledMain}/>}>
  {nodes.map((node) => (
          <Todo key={node.id} todo={node} user={user} />
        ))}
   <Button 
   title={"Load more"}
   onPress={() => {
     if(relay.hasMore()){
       relay.loadMore()
     }
   }} ></Button>    
</ScrollView>);
 /* (
   
        <Text key={item.node.id}>{item.node.hallName}</Text>
    <section className="main">
      <input
        checked={totalCount === completedCount}
        className="toggle-all"
        onChange={handleMarkAllChange}
        type="checkbox"
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {nodes.map((node: Node) => (
          <Todo key={node.id} todo={node} user={user} />
        ))}
      </ul>
    </section>
  );*/
};

const styles = StyleSheet.create({
  StyledMain: {
    // position: relative,
    zIndex: 2,
    borderStyle: 'solid',
    borderRadius: 1,
    borderColor: '#e6e6e6',

  }
})

export default createPaginationContainer(TodoList, {
  user: graphql`
    fragment TodoList_user on User
    @argumentDefinitions(
        count: {type: "Int", defaultValue: 3}
        cursor: {type: String},
      ) {
     
      todos(
        first: 2 , 
        after: $cursor
        # max GraphQLInt
      ) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            complete
            ...Todo_todo
          }
        }
      }
      id
      userId
      totalCount
      completedCount
      ...Todo_user
    }
  `,
}, {
  direction: 'forward',
  getConnectionFromProps(props) {
    return props.user && props.user.todos;
  },
  // This is also the default implementation of `getFragmentVariables` if it isn't provided.
  getFragmentVariables(prevVars, totalCount) {
    return {
      ...prevVars,
      count: totalCount,
    };
  },
  getVariables(props, {count, cursor}, fragmentVariables) {
    return {
      cursor,
      userId : fragmentVariables.userId
    };
  },
  query: graphql`
    # Pagination query to be fetched upon calling 'loadMore'.
    # Notice that we re-use our fragment, and the shape of this query matches our fragment spec.
    query TodoListQuery($userId: String ,   $cursor: String) {
          user(id: $userId ) {
            ...TodoList_user @arguments( cursor: $cursor)
          }
        }
  `
});

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

import RemoveCompletedTodosMutation from '../mutations/RemoveCompletedTodosMutation';

import React from 'react';
import {graphql, createFragmentContainer} from 'react-relay';

import { Text, Button } from 'react-native-elements';
import { View } from 'react-native';

import styled, {css} from "styled-components/native";

const StyledContainer = styled.View`
  flexDirection: row;
  backgroundColor: #fff;
  justifyContent: center;
  alignItems: center;
`;

const StyleButtonContainer = styled.View`
  flex: 1;
`;

const StyledLabel = styled(Text)`
  text-align: center;
`;

const TodoListFooter = ({
  relay,
  user,
  user: {todos, completedCount, totalCount},
}: any) => {
  const completedEdges =
    todos && todos.edges
      ? todos.edges.filter(
          (edge: any) => edge && edge.node && edge.node.complete,
        )
      : [];

  const handleRemoveCompletedTodosClick = () => {
    RemoveCompletedTodosMutation.commit(
      relay.environment,
      {
        edges: completedEdges,
      },
      user,
    );
  };

  const numRemainingTodos = totalCount - completedCount;

  return (
    <StyledContainer>
      <StyleButtonContainer>
      <StyledLabel h4>
      {numRemainingTodos + " Item" + (numRemainingTodos === 1 ? '' : 's') +" left"}
        </StyledLabel>
        </StyleButtonContainer>

        <StyleButtonContainer>
        <Button
        onPress={handleRemoveCompletedTodosClick}
        title="Clear completed"
        disabled={completedCount == 0}
        accessibilityLabel="Clear completed"
      />
      </StyleButtonContainer>
    </StyledContainer>
  );
};

export default createFragmentContainer(TodoListFooter, {
  user: graphql`
    fragment TodoListFooter_user on User 
    
    @argumentDefinitions(
        count: {type: "Int", defaultValue: 3}
        cursor: {type: String}
      ) {
      id
      userId
      completedCount
      todos(
        first: 2 ,
        after :$cursor# max GraphQLInt
      ) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            complete
          }
        }
      }
      totalCount
    }
  `,
});

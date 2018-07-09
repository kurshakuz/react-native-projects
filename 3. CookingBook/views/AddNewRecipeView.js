import {
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import InputRecipe from '../InputRecipe';

const CREATE_RECIPE = gql`
  mutation addRecipe($title: String!, $fileId: ID, $description: String, $ingredients: [String!]!, $instructions: [String!]!) {
    createRecipe(title: $title, fileId: $fileId, description: $description, ingredients: $ingredients, instructions: $instructions) {
      id
      title
    }
  }
`;

class AddNewRecipeView extends React.Component {
  state = {
    newRecipe: {},
  };

  addNewRecipe = (recipe, createRecipe) => {
    // console.log(recipe)
    this.setState({
      newRecipe: recipe,
    });

    createRecipe({
      variables: {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        fileId: recipe.fileId,
      }
    });
  };

  render() {
    return (
      <ScrollView>
        {/* <KeyboardAvoidingView
          style={{ marginHorizontal: 20 }}
          keyboardVerticalOffset={64}
          behavior="position"
          enabled> */}

          <Mutation mutation={CREATE_RECIPE}>
              {(createRecipe, {data, loading, error}) => (
              <View>
                <InputRecipe
                  navigation={this.props.navigation}
                  addNewRecipe={(recipe) => this.addNewRecipe(recipe, createRecipe)}
                />
                <View>
                    {loading
                      ? <ActivityIndicator />
                      : (
                        <Text />
                      )
                    }
                  </View>
              </View>
            )}

          </Mutation>

        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    );
  }
}

export default AddNewRecipeView;

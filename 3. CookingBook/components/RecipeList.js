import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';
import {
  TextInput,
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Divider,
  Title,
  Paragraph,
  Provider as PaperProvider,
} from 'react-native-paper';

const GET_ALL_RECIPES = gql`
{
  allRecipes {
    title
    id
    description
    ingredients
    instructions
    file {
      url
    }
  }
}
`;

class RecipeList extends React.Component {
  keyExtractor = item => item.id;

  handleOnPress = recipe => {
    this.props.navigation.navigate('Recipe', { recipe: recipe });
  };

  renderItem = ({ item: recipe }) => (
    <Card style={{flex: 1}}>
      <CardContent>
        <Text style={{ fontWeight: 'bold' }}>{recipe.title}</Text>
        <Text numberOfLines={3}>{recipe.description}</Text>
      </CardContent>
      <CardCover
        source={{
          uri: recipe.file.url,
        }}
      />
      <CardActions style={{ justifyContent: 'space-between' }}>
        <Button onPress={() => this.handleOnPress(recipe)}>
          Посмотреть рецепт
        </Button>
        <TouchableOpacity>
          <Image 
            style={{width: 20, height: 20, margin: 10 }}
            source = {{ uri: 'https://png.icons8.com/metro/1600/hearts.png'}} />
          </TouchableOpacity>
      </CardActions>
    </Card>
  );

  render() {
    return (
      <Query query={GET_ALL_RECIPES}>
        {({ loading, data, error, refetch }) =>
          loading ? (
            <ActivityIndicator />
          ) : (
            <View style={{ flex: 1}} > 
              <Button
                raised
                style={{ height: 40}} 
                // color='#2980b9'
                onPress={() => this.props.navigation.navigate('AddNewRecipe')}>
                Добавить новый рецепт
              </Button>
              
              <FlatList
                style={{ flex: 10}} 
                refreshing={data.networkStatus === 4}
                onRefresh={() => refetch()}
                ItemSeparatorComponent={Divider}
                keyExtractor={this.keyExtractor}
                data={data ? data.allRecipes : []}
                renderItem={this.renderItem}
              />
            </View>
          )
        }
      </Query>
    );
  }
}

export default RecipeList;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { createStackNavigator } from 'react-navigation';
import {
  Button,
  TextInput,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import RecipeList from './components/RecipeList';
import RecipeView from './components/views/RecipeView';
import LoginView from './components/views/LoginView';
import AddNewRecipeView from './components/views/AddNewRecipeView';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjj6w03zg1gh20183xvg2z5du',
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Ваши рецепты',
  };
  render() {
    return <HomeView navigation={this.props.navigation} />;
  }
}

class RecipeScreen extends React.Component {
  static navigationOptions = {
    title: 'Рецепт',
  };
  render() {
    return <RecipeView navigation={this.props.navigation} />;
  }
}

class AddNewRecipeScreen extends React.Component {
  static navigationOptions = {
    title: 'Добавить новый рецепт',
  };
  render() {
    return <AddNewRecipeView navigation={this.props.navigation} />;
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return <LoginView navigation={this.props.navigation} />;
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Recipe: RecipeScreen,
    AddNewRecipe: AddNewRecipeScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3498db',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <ApolloProvider client={client}>
          <RootStack />
        </ApolloProvider>
      </PaperProvider>
    );
  }
}

class HomeView extends React.Component {
  render() {
    return <RecipeList navigation={this.props.navigation} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

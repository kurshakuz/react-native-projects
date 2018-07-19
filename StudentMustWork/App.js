import React, { Component, AppRegistry } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import HomeScreen from './Screens/HomeScreen';
import NewTaskScreen from './Screens/NewTaskScreen';
import AllTasksScreen from './Screens/AllTasksScreen';
import TaskDetailsScreen from './Screens/TaskDetailsScreen';

const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjjqxapsi0jnd0114ndj1bmup',
});


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3949AB',
    accent: '',
  }
};


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    NewTask: NewTaskScreen,
    AllTasks: AllTasksScreen,
    TaskDetails: TaskDetailsScreen,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3949AB',
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
      <PaperProvider theme={theme}>
        <ApolloProvider client={client}>
          <RootStack />
        </ApolloProvider>
      </PaperProvider>
    );
  }
}

export default App;

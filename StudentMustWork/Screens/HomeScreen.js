import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Студенты на помощь!',
  };

  _handleOnPressSeeTasks = () => {
    this.props.navigation.navigate('AllTasks');
  };

  _handleOnPressAddTask = () => {
    this.props.navigation.navigate('NewTask');
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-around'}}>

        <View>
          <Text style={styles.text}>
            Все самые и интересные и свежие подработки в одном месте!
          </Text>
        </View>

        <View>
          <Button raised primary onPress={this._handleOnPressSeeTasks}>
            Просмотреть все задачи
          </Button>
          <Button raised primary onPress={this._handleOnPressAddTask}>
            Добавить задачу
          </Button>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    // fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },

});

export default HomeScreen;

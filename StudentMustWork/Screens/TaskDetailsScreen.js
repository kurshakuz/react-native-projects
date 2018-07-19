import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

class TaskDetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.task.title}`,
  });

  render() {
    const task = this.props.navigation.state.params.task;
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.header}>{task.title}</Text>
          <Text style={styles.subheader}>Описание:</Text>
          <Text style={styles.text}>{task.description}</Text>
          <Text style={styles.subheader}>Вознаграждение: </Text>
          <Text style={styles.text}>{task.reward} ₸</Text>
          <Text style={styles.subheader}>Дедлайн: </Text>
          <Text style={styles.text}>
            {new Date(task.deadline).toLocaleDateString()}{' '}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Связаться с заказчиком</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  subheader: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontSize: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    margin: 20,
  },
  subContainer: {
    flex: 10,
  },
});

export default TaskDetailsScreen;

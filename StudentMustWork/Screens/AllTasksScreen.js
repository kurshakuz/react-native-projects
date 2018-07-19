import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Divider from 'react-native-paper';

const GET_ALL_TASKS = gql`
{
  allTasks {
    title
    id
    description
    reward
    deadline
  }
}
`;

class AllTasksScreen extends React.Component {
  static navigationOptions = {
    title: 'Все задачи',
  };

  keyExtractor = item => item.id;

  handleOnpressTask = (task) => {
    this.props.navigation.navigate('TaskDetails', {task: task});
  };

  renderItem = ({ item: task }) => (
    <TouchableOpacity onPress={() => this.handleOnpressTask(task)} style={{ margin: 20 }}>
      <Text style={{fontWeight: 'bold'}}>{task.title}</Text>
      <Text>Описание: {task.description}</Text>
      <Text>Вознаграждение: {task.reward} ₸</Text>
      <Text>Дедлайн: {new Date(task.deadline).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
  
  render() {
    return (
      <Query query={GET_ALL_TASKS}>
      {({ loading, data, error, refetch }) =>
        loading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ flex: 1, alignItems: 'stretch' }}> 
            <FlatList
              refreshing={data.networkStatus === 4}
              onRefresh={() => refetch()}
              ItemSeparatorComponent={Divider}
              keyExtractor={this.keyExtractor}
              data={data ? data.allTasks : []}
              renderItem={this.renderItem}
            />
          </View>
        )
      }
      </Query>
    );
  }
}

export default AllTasksScreen;

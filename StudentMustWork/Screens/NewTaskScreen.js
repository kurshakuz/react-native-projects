import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import DatePicker from 'react-native-datepicker';

//$deadline: DateTime!,
//deadline: $deadline

const CREATE_TASK = gql`
  mutation createTask($description: String!, $reward: Int!, $title: String!, $deadline: DateTime!) {
    createTask(title: $title, description: $description, reward: $reward, deadline: $deadline) {
      id
      title
    }
  }
`;

class NewTasksScreen extends React.Component {
  static navigationOptions = {
    title: 'Добавить новую задачу',
  };

  state = {
    title: '',
    description: '',
    reward: 0,
    preRequisites: [],
    deadline: "",
  };

  handleOnPressAddTask = createTask => {
    if (this.state.title && this.state.description && this.state.reward && this.state.deadline) {
      createTask({
        variables: {
          title: this.state.title,
          description: this.state.description,
          reward: parseInt(this.state.reward),
          deadline: (new Date(this.state.deadline).toISOString()),
        },
      });

      this.props.navigation.goBack();
    }
  };

  render() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const maxDate = new Date(year + 1, month, day);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.header}>Добавить новую задачу</Text>
          </View>
          <KeyboardAvoidingView padding={20}>
            <View style={styles.subContainer}>
              <Text>Заголовок (1-2 слова):</Text>
              <TextInput
                placeholder="Перевод текста"
                onChangeText={title => this.setState({ title })}
              />
            </View>

            <View style={styles.subContainer}>
              <Text>Описание:</Text>
              <TextInput
                placeholder="Требуется перевести текст с англ на рус..."
                onChangeText={description => this.setState({ description })}
              />
            </View>

            <View style={styles.subContainer}>
              <Text>Вознаграждение:</Text>
              <TextInput
                placeholder="15000тг"
                keyboardType="numeric"
                onChangeText={reward => this.setState({ reward })}
              />
            </View>

            <View style={styles.subContainer}>
              <Text>Крайний срок:</Text>
              <DatePicker
                style={{ width: 300 }}
                date={this.state.deadline}
                mode="datetime"
                placeholder="Выберите дату"
                format="YYYY-MM-DDTHH:mm:ss"
                minDate={new Date()}
                maxDate={maxDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                onDateChange={deadline => {
                  this.setState({ deadline: deadline });
                }}
              />
            </View>

            <Mutation mutation={CREATE_TASK}>
              {(createTask, { data, loading, error }) => (
                <View>
                  <Button
                    raised
                    primary
                    onPress={() => this.handleOnPressAddTask(createTask)}>
                    Отправить заказ!
                  </Button>
                  <View>{loading ? <ActivityIndicator /> : <Text />}</View>
                </View>
              )}
            </Mutation>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    margin: 10,
  },
  subContainer: {
    flex: 1,
  },
});

export default NewTasksScreen;

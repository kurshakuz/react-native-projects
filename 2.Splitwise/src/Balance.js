import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Alert } from 'react-native';
import { ListItem, List, Button } from 'react-native-elements';

class Balance extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calculateYouAreOwed = bills => {
    let youAreOwed = 0;
    for (let i = 0; i < bills.length; i++) {
      const amountPerParticipant = bills[i].amountPaid / bills[i].billParticipants.length;
      const numOfParticipantsWtYou =  bills[i].billParticipants.length - 1;
      if (bills[i].payerId === '0') {
        youAreOwed += amountPerParticipant*(numOfParticipantsWtYou);
      }
    }
    return youAreOwed.toFixed(2);
  };

  calculateYouOwe = bills => {
    let youOwe = 0;
    for (let i = 0; i < bills.length; i++) {
      const amountPerParticipant = bills[i].amountPaid / bills[i].billParticipants.length;
      if (bills[i].payerId !== '0') {
        youOwe += amountPerParticipant;
      }
    }
    return youOwe.toFixed(2);
  };

  render() {
    // console.log(this.props.bills[0].amountPaid)
    // console.log(this.props.bills[0].payerId)
    // console.log(this.props.bills[0].billParticipants.length)

    const youOwe = this.calculateYouOwe(this.props.bills);
    const youAreOwed = this.calculateYouAreOwed(this.props.bills);
    const totalBalance = youAreOwed -youOwe;

    return (
      <View style={styles.balanceRow}>
        <View style={styles.balanceUnit}>
          <Text>You owe: </Text>
          <Text>{youOwe} ₸</Text>
        </View>
        <View style={styles.balanceUnit}>
          <Text>You are owed:</Text>
          <Text>{youAreOwed} ₸</Text>
        </View>
        <View style={styles.balanceUnit}>
          <Text>Total balance:</Text>
          <Text>{totalBalance} ₸</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  balanceRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceUnit: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    alignItems: 'center',
  },
});

export default Balance;

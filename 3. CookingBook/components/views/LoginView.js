import {
    ActivityIndicator,
    FlatList,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Button,
    Image,
    KeyboardAvoidingView,
  } from 'react-native';
import React from 'react';
import {
  Divider,
  TextInput,
  Provider as PaperProvider,
} from 'react-native-paper';
    
class LoginView extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo}
            source={{uri: 'http://cdn.onlinewebfonts.com/svg/img_58616.png'}}
          />

          <Text style={styles.title}>Все ваши рецеты в одном месте</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            underlineColor="#FFF"
            style={styles.input}
            placeholderTextColor="rgba(255,255,255,0.9)"
            placeholder="username"
            returnKeyType="next"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            returnKeyType="go"
            secureTextEntry
            placeholderTextColor="rgba(255,255,255,0.7)"
            placeholder="password"
          />

          <TouchableOpacity style={styles.buttonContainer} onPress={() => (this.props.navigation.navigate('Home'))}>
            <Text style={styles.buttonText}>LOGIN!</Text>
          </TouchableOpacity>
        </View>
        
      </KeyboardAvoidingView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#3498db'
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9,
  },
  formContainer: {
    padding: 10,
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.7)",
    marginBottom: 10,
    //color: '#FFF',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  }
}
  
export default LoginView;
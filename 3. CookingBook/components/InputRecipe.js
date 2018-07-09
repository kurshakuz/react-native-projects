import {
    FlatList,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
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
import {ImagePicker, Permissions} from 'expo';
  
class InputeRecipe extends React.Component {
  state = {
    title: '',
    ingredients: [],
    tempIngredient: '',
    instructions: [],
    tempInstruction: '',
    description: '',
    fileId: '',
  };
  
  _keyExtractor = (item, index) => item.id;
  
  handleAddIngredient = () => {
    this.setState(prevState => ({
      ingredients: [...prevState.ingredients, this.state.tempIngredient],
      tempIngredient: '',
    }));
  };
  
    handleAddInstruction = () => {
      this.setState(prevState => ({
        instructions: [...prevState.instructions, this.state.tempInstruction],
        tempInstruction: '',
      }));
    };

    handleUploadButtonPress = async () => {
      const FILE_UPLOAD_URL = 'https://api.graph.cool/file/v1/cjj6w03zg1gh20183xvg2z5du';

      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const photo = await ImagePicker.launchImageLibraryAsync();

      let formData = new FormData();
      formData.append('data', { uri: photo.uri, name: 'image.png', type: 'multipart/form-data'})

      await fetch(FILE_UPLOAD_URL, {
        method: 'POST',
        body: formData
      }).then(response => {
        return response.json()
      }).then(file => {
        // const fileId = file.id
        this.setState({
          fileId: file.id,
        })
      })
    }
  
    render() {
      return (
        <ScrollView>
          <KeyboardAvoidingView
          style={{ flex: 1 ,marginHorizontal: 20 }}
          contentContainerStyle={{ flex: 1 }}
          keyboardVerticalOffset={64}
          behavior="padding"
          enabled>
          <React.Fragment>

            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={this.handleUploadButtonPress} style={{ height: 44, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green'}}>
                  <Text style={{ fontSize: 18, paddingHorizontal: 24, color: 'white'}}>
                    Прикрепить картинку
                  </Text>
                </Button>
            </View>

            <React.Fragment>
                <Text style={styles.title}>Название блюда:</Text>
                <TextInput
                placeholder="Введите название блюда сюда: "
                onChangeText={text =>
                    this.setState({
                    title: text,
                    })
                }
                />
            </React.Fragment>
    
            <React.Fragment>
                <Text style={styles.title}>Описание:</Text>
                <TextInput
                placeholder="Введите описание блюда сюда: "
                onChangeText={text =>
                    this.setState({
                    description: text,
                    })
                }
                />
            </React.Fragment>
    
            <React.Fragment>
                <Text style={styles.title}>Ингредиенты:</Text>
    
                <FlatList
                ItemSeparatorComponent={Divider}
                data={this.state.ingredients}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <Text>{item}</Text>}
                />
    
                <TextInput
                placeholder="Введите ингредиенты сюда: "
                value={this.state.tempIngredient}
                onChangeText={text =>
                    this.setState({
                    tempIngredient: text,
                    })
                }
                />
    
                <Button raised onPress={this.handleAddIngredient}>
                Добавить ингредиент
                </Button>
            </React.Fragment>
    
            <React.Fragment>
                <Text style={styles.title}>Инструкции:</Text>
                <FlatList
                ItemSeparatorComponent={Divider}
                data={this.state.instructions}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <Text>{item}</Text>}
                />
    
                <TextInput
                placeholder="Введите инструкции сюда: "
                value={this.state.tempInstruction}
                onChangeText={text =>
                    this.setState({
                    tempInstruction: text,
                    })
                }
                />
    
                <Button raised onPress={this.handleAddInstruction}>
                Добавить инструкцию
                </Button>
            </React.Fragment>
    
            <React.Fragment>
                <Button
                raised
                primary
                disabled={
                    !(
                    this.state.title &&
                    this.state.ingredients &&
                    this.state.instructions &&
                    this.state.fileId
                    )
                }
                onPress={() =>
                    this.props.addNewRecipe({
                    title: this.state.title,
                    ingredients: this.state.ingredients,
                    instructions: this.state.instructions,
                    description: this.state.description,
                    fileId: this.state.fileId,
                    })
                }>
                Сохранить блюдо!
                </Button>
            </React.Fragment>
            </React.Fragment>
        </KeyboardAvoidingView>
      </ScrollView>
      );
    }
  }
  
  const styles = {
    title: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
  };
  
  export default InputeRecipe;
  
import React, { Component } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TextInput,TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {parseJwt, usuarioAutenticado} from '../SRC/Services/auth';

import api from '../SRC/Services/api.js';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            senha : '',
        }
    }

Login = async() => {
        try {
          const resposta = await api.post('/Login', {
            email : this.state.email,
            senha : this.state.senha,
          });
    
          this.setState({email : '', senha : ''})

          await AsyncStorage.setItem('wallfertas-chave-autenticacao', resposta.data.token);

          console.log(parseJwt());

          //EXIBE NO CONSOLE APENAS O TIPO DE USUARIO
          console.log(parseJwt().role);

          if(parseJwt().role === "1"){
                console.log(this.props);
                console.log(usuarioAutenticado());
                this.props.navigation.navigate('home');
          }
              
          if(parseJwt().role === "2"){
                    console.log(this.props);
                    console.log(usuarioAutenticado());
                    this.props.navigation.navigate('home');
          }

        }catch(error) {
          console.warn(error)
        }
      }



render(){
        return(
            <View style={styles.imageBackground}>
            <Image source={require('../assets/img/W2.png')} style={styles.imagelogo}/>
              <View style={styles.containerLogin}>
                <TextInput
                  placeholder = 'E-Mail'
                  placeholderTextColor = '#fff'
                  keyboardType = 'email-address'
                  style={styles.inputCadastro}
                  onChangeText={email => this.setState({ email })}
                  value = {this.state.email}
                />
    
                <TextInput
                  placeholder = 'Senha'
                  placeholderTextColor = '#fff'
                  secureTextEntry = {true}
                  style={styles.inputCadastro}
                  onChangeText={senha => this.setState({ senha })}
                  value = {this.state.senha}
                />
    
                <TouchableOpacity 
                  style={styles.btnLogin} 
                  onPress = {this.Login}
                >
                  <Text style = {styles.btnText}>Logar</Text>
                </TouchableOpacity>
              </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  imageBackground : {
    flex: 1,
    justifyContent: 'center',
    backgroundColor : 'blue'
  },

  imagelogo : {
    marginTop : 10,
    marginLeft : '25%',
    marginBottom : -150,
    width : '50%',
    flex : 0.4
    
  },
  inputCadastro : {
    width: 260,
    height: 40, 
    backgroundColor: '#7C8FA6',
    marginBottom: 25,
    paddingLeft: 15,
    borderRadius : 4,
    shadowColor :'#000',
    shadowOffset : {
        width: 2, height: 2
    },
    shadowOpacity: 0.2
  },

  btnLogin : {
    backgroundColor: '#275C9F',
    width: 120,
    height: 30,
    borderRadius: 4,
    textAlign: 'center',
    paddingTop: 5,
    shadowColor :'#000',
    shadowOffset : {
        width: 3, height: 3
    },
    shadowOpacity: 0.3,
  },

  btnText : {
    color: '#fff'
  },

  containerLogin : {
    marginTop: '30%',
    alignItems: 'center',
  }
})



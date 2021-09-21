import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ToastAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 32,
  },
  textInput: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  loginButton: {
    backgroundColor: 'navy',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 24,
  },
});

const API_URL = 'http://10.0.2.2:2000';

const Login = props => {
  const dispatch = useDispatch();
  const globalAuth = useSelector(state => state.auth);

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const inputHandler = (field, value) => {
    setLoginForm({
      ...loginForm,
      [field]: value,
    });
    // console.log(loginForm);
  };

  const loginButtonHandler = () => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username: loginForm.username,
        password: loginForm.password,
      },
    })
      .then(result => {
        // ToastAndroid.show(
        //   `Correct ID and Password, ${result.data[0].username} & ${result.data[0].password}`,
        //   ToastAndroid.LONG,
        // );
        if (result.data.length) {
          AsyncStorage.setItem('username', result.data[0].username)
            .then(() => {
              // Interceptor ada di M3S6C6
              // memasukkan interceptors untuk menandai user yg sedang menggunakan app ke bagian backend
              // Menyimpan id interceptor ke dalam AsyncStorage
              const myInterceptor = Axios.interceptors.request.use(request => {
                request.headers['NAMA-USER'] = result.data[0].username;
                return request;
                // request ini mengandung angka yg berfungsi sebagai id dari request
              });

              AsyncStorage.setItem('interceptorId', myInterceptor.toString())
                .then(() => {
                  dispatch({
                    type: 'CHANGE_USERNAME',
                    payload: result.data[0].username,
                    // `result.data adalah array yg berisikan object di masing2 indexnya. Index yg berisi adalah index ke-0`
                  });
                })
                .catch(() => {
                  console.log('AsyncStorage interceptor error');
                });
            })
            .catch(err => {
              console.log('ERROR');
            });
        } else {
          ToastAndroid.show('Wrong Username / Password', ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        console.log(err);
      });

    // AsyncStorage.setItem('username', loginForm.username)
    //   .then(result => {
    //     dispatch({
    //       type: 'CHANGE_USERNAME',
    //       payload: loginForm.username,
    //       // mengirim payload yg berisi props `username` dr TextInput yg masuk ke fungsi `inputHandler`
    //     });
    //   })
    //   .catch(err => {
    //     console.log('error');
    //   });
  };

  const consoleLogGlobalAuth = () => {
    //console.log(globalAuthLogin.username);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{...styles.main}}>
        {/* <TouchableOpacity
          style={{...styles.loginButton}}
          onPress={consoleLogGlobalAuth}>
          <Text style={{color: 'white'}}>Test Console Log globalAuth</Text>
        </TouchableOpacity> */}
        <View>
          <Text>Username</Text>
          <View style={{...styles.textInput, marginBottom: 12}}>
            <TextInput
              onChangeText={text => {
                inputHandler('username', text);
              }}
              placeholder="Your Username"
            />
          </View>
          <Text>Password</Text>
          <View style={{...styles.textInput}}>
            <TextInput
              onChangeText={text => inputHandler('password', text)}
              secureTextEntry
              // secureTextEntry mirip dengan input text="password" di HTML
              placeholder="Your Password"
            />
          </View>
          <TouchableOpacity
            style={{...styles.loginButton}}
            onPress={loginButtonHandler}>
            <Text style={{color: 'white'}}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{alignSelf: 'center', marginTop: 18}}
            onPress={() => props.navigation.push('Register')}>
            <Text>Register a new account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

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
    dispatch({
      type: 'CHANGE_USERNAME',
      payload: loginForm.username,
      // mengirim payload yg berisi props `username` dr TextInput yg masuk ke fungsi `inputHandler`
    });
  };

  const consoleLogGlobalAuth = () => {
    //console.log(globalAuthLogin.username);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{...styles.main}}>
        <Text>Username: {globalAuth.username}</Text>
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

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
  registerButton: {
    backgroundColor: 'navy',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 24,
  },
});

const Register = () => {
  const dispatch = useDispatch();
  const globalAuth = useSelector(state => state.auth);

  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
  });

  const inputHandler = (field, value) => {
    setRegisterForm({
      ...registerForm,
      [field]: value,
    });
  };

  const registerButtonHandler = () => {
    dispatch({
      type: 'CHANGE_USERNAME',
      payload: registerForm.username,
      // mengirim payload yg berisi props `username` dr TextInput yg masuk ke fungsi `inputHandler`
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{...styles.main}}>
        <View>
          <Text>Username</Text>
          <View style={{...styles.textInput, marginBottom: 12}}>
            <TextInput
              onChangeText={text => inputHandler('username', text)}
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
            style={{...styles.registerButton}}
            onPress={registerButtonHandler}>
            <Text style={{color: 'white'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

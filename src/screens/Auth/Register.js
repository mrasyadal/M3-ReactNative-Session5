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
  Alert,
} from 'react-native';
import Axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const API_URL = 'http://10.0.2.2:2000';

const Register = () => {
  const dispatch = useDispatch();

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
    // Mengecek apakah username yang diregister sudah digunakan
    Axios.get(`${API_URL}/users`, {
      params: {
        username: registerForm.username,
      },
    })
      // Misal proses mendapatkan data berhasil (apapun datanya, termasuk data kosong)
      .then(result => {
        // `result.data` merupakan array yg berisi data user yang ada di users.
        // `result.data` dalam contoh ini berisi `username`, `password`, dan `id`
        if (!result.data.length) {
          // Jika mendapatkan data kosong a.k.a. belum ada username yg dicari
          // Menyimpan data user di db.json
          Axios.post(`${API_URL}/users`, {
            username: registerForm.username,
            password: registerForm.password,
          })
            .then(() => {
              // Menyimpan data user di local storage
              AsyncStorage.setItem('username', registerForm.username)
                .then(() => {
                  // ----- DIBUAT COMMENT DI M3S6C6 ------
                  // dispatch({
                  //   type: 'CHANGE_USERNAME',
                  //   payload: registerForm.username,
                  // });
                  //
                  // Interceptor ada di M3S6C6
                  // memasukkan interceptors untuk menandai user yg sedang menggunakan app ke bagian backend
                  // Menyimpan id interceptor ke dalam AsyncStorage
                  const myInterceptor = Axios.interceptors.request.use(
                    request => {
                      request.headers['NAMA-USER'] = registerForm.username;
                      return request;
                      // request ini mengandung angka yg berfungsi sebagai id dari request
                    },
                  );

                  AsyncStorage.setItem(
                    'interceptorId',
                    myInterceptor.toString(),
                  )
                    .then(() => {
                      dispatch({
                        type: 'CHANGE_USERNAME',
                        payload: registerForm.username,
                        // `result.data adalah array yg berisikan object di masing2 indexnya. Index yg berisi adalah index ke-0`
                      });
                    })
                    .catch(() => {
                      console.log('AsyncStorage interceptor error');
                    });
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        }
        // Jika `result.data.length` ada isinya a.k.a. ada data untuk `username` tsb (username, password, id)
        else {
          // Munculkan alert di android
          ToastAndroid.show('Username has been used', ToastAndroid.SHORT);
          // Munculkan alert di iOS
          // Alert.alert('Username has been used');
        }
      })
      // Jika berhasil mendapatkan data dari db.json (error server, etc)
      .catch(err => {});

    // Diganti di M3S6C4
    // dispatch({
    //   type: 'CHANGE_USERNAME',
    //   payload: registerForm.username,
    //   // mengirim payload yg berisi props `username` dr TextInput yg masuk ke fungsi `inputHandler`
    // });
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

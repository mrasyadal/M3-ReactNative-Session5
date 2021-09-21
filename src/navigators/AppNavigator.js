import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import MainTab from './MainTab';
import Comments from '../screens/Comments';
import TopTabNav from './TopTabNav';
import MainStack from './MainStack';
import UserProfile from '../screens/UserProfile';
import TopComments from '../screens/TopComments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const globalAuth = useSelector(state => state.auth);

  const checkAuth = () => {
    AsyncStorage.getItem('username')
      .then(result => {
        const myInterceptor = Axios.interceptors.request.use(request => {
          request.headers['NAMA-USER'] = result;
          return request;
          // request ini mengandung angka yg berfungsi sebagai id dari request
        });

        AsyncStorage.setItem('interceptorId', myInterceptor.toString())
          .then(() => {
            dispatch({
              type: 'CHANGE_USERNAME',
              payload: result,
            });
          })
          .catch(() => {
            console.log('AsyncStorage interceptor error');
          });
      })
      .catch(err => {
        console.log('error');
      });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      {globalAuth.username ? (
        <>
          <Stack.Screen name="Main" component={MainTab} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;

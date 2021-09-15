import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import MainTab from './MainTab';
import Comments from '../screens/Comments';
import TopTabNav from './TopTabNav';
import MainStack from './MainStack';
import UserProfile from '../screens/UserProfile';
import TopComments from '../screens/TopComments';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const globalAuth = useSelector(state => state.auth);

  return (
    <Stack.Navigator initialRouteName="Login">
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

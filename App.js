import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainStack from './src/navigators/MainStack';
import MainTab from './src/navigators/MainTab';

// import Home from './src/screens/Home';
// import UserProfile from './src/screens/UserProfile';
// import Comments from './src/screens/Comments';

const App = () => {
  return (
    <NavigationContainer>
      <MainTab />
    </NavigationContainer>
  );
};

export default App;

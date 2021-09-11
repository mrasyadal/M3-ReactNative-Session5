import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
//import MainStack from './src/navigators/MainStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import UserProfile from './src/screens/UserProfile';
import Comments from './src/screens/Comments';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Stack.Navigator memiliki initial route name 'Home' yang mengeset `Home` jadi menu utama*/}
        {/* Stack.Navigator berisi Home, UserProfile, dan Comments */}
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Comments" component={Comments} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

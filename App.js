import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './src/navigators/MainTab';

// import Home from './src/screens/Home';
// import UserProfile from './src/screens/UserProfile';
// import Comments from './src/screens/Comments';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './src/redux/reducers/index.js';
import AppNavigator from './src/navigators/AppNavigator';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <MainTab /> */}
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

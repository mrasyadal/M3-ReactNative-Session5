import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Comments from '../screens/Comments';
import TopComments from '../screens/TopComments';

const TopTab = createMaterialTopTabNavigator();

const TopTabNav = () => {
  return (
    <TopTab.Navigator screenOptions={{headerShown: false, lazy: true}}>
      <TopTab.Screen
        name="AllComments"
        component={Comments}
        options={{title: 'All Comments'}}
      />
      <TopTab.Screen
        name="TopComments"
        component={TopComments}
        options={{title: 'Top Comments'}}
      />
    </TopTab.Navigator>
  );
};

export default TopTabNav;

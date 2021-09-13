import React from 'react';
import {Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import UserProfile from '../screens/UserProfile';
import Comments from '../screens/Comments';
import MainStack from './MainStack';
import TopTabNav from './TopTabNav';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomTab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <BottomTab.Navigator
      screenOptions={
        // fungsi {route} => akan dipanggil untuk setiap `xxx.Screen` yang ada di dalam `xxx.Navigator`
        // {route} adalah bentuk destructure object yg dijadikan parameter fungsi di atas
        // `route` merupakan object yang memilki properties di dalamnya
        ({route}) => {
          return {
            tabBarIcon: ({focused, size, color}) => {
              // `focused` bertipe boolean, akan memberitahu apakah kita sekarang berada di screen yg ini atau tidak
              // `color` adalah color tulisan di suatu screen. Variabel ini akan digunakan untuk menentukan warna icon
              // `size` adalah size tulisan di suatu screen. Variabel ini akan digunakan untuk menentukan ukuran icon
              // dalam hal ini, `color` ditentukan oleh `tabBarActiveTintColor: 'crimson'`}}
              let iconName;

              if (route.name === 'MainStack') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Comments') {
                iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            // kalau mau nambahin props di screenOptions yang lain ketika ada fungsi return,
            // masukin props di dalam return di line 20
            tabBarActiveTintColor: 'crimson',
            tabBarStyle: {
              borderRadius: 16,
              // `width` dan `alignSelf` tidak berguna karena position diset sbg absolute
              // width: Dimensions.get('window').width - 32,
              // alignSelf: 'center',
              position: 'absolute',
              left: 16,
              right: 16,
              bottom: 16,
            },
          };
        }
      }>
      {/* <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="UserProfile" component={UserProfile} /> */}
      <BottomTab.Screen
        name="MainStack"
        component={MainStack}
        options={{title: 'Menu'}}
      />
      <BottomTab.Screen name="Comments" component={TopTabNav} />
    </BottomTab.Navigator>
  );
};

export default MainTab;

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/types/typings';
import { store } from './src/store/store';
import { Home } from './src/screens/Home';
import { Post } from './src/screens/Post';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Post" component={Post} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

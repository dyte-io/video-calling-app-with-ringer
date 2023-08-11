import React, {useEffect} from 'react';
import Register from './src/pages/Register';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useGlobalStore} from './src/store';
import ContactList from './src/pages/ContactList';
import {NavigationRoutesWithParams} from './src/types/navigation';
import JoinCall from './src/pages/JoinCall';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator<NavigationRoutesWithParams>();

function App(): JSX.Element {
  const username = useGlobalStore(state => state._username);

  useEffect(() => {
    messaging()
      .subscribeToTopic('activeMeeting')
      .then(() => console.log('Subscribed to topic!'));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={username === '' ? 'register' : 'contact-list'}>
        <Stack.Screen
          name="register"
          component={Register}
          options={{
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="contact-list"
          component={ContactList}
          options={{headerShadowVisible: false}}
        />
        <Stack.Screen
          name="join-call"
          component={JoinCall}
          options={{
            headerStyle: {
              backgroundColor: '#141414',
            },
            headerTintColor: '#2160fd',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

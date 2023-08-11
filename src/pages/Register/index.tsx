import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useGlobalStore} from '../../store';
import {RegisterScreenProps} from '../../types/navigation';

export default function Register({
  navigation,
}: RegisterScreenProps): JSX.Element {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const _username = useGlobalStore(store => store._username);
  const _setUsername = useGlobalStore(store => store.setUsername);
  const _setName = useGlobalStore(store => store.setName);

  function handleSubmit() {
    _setUsername(username);
    setUsername('');

    _setName(fullName);
    setFullName('');

    navigation.push('contact-list');
  }

  useEffect(() => {
    if (_username !== '') {
      navigation.push('contact-list');
    }
  }, [_username, navigation]);

  return (
    <View className="h-screen w-scren bg-white p-4 flex flex-col justify-center">
      <View
        className="bg-white rounded-xl p-4 translate-y-[-100px]"
        style={{elevation: 2}}>
        <Text className="text-4xl font-black text-black mb-6 text-center">
          Register
        </Text>
        <Text className="text-lg font-bold text-black mb-2">Enter Name</Text>
        <TextInput
          className="border border-slate-300 rounded-xl text-lg px-4 text-black"
          placeholder="Enter your name"
          placeholderTextColor="#888"
          onChangeText={newText => setFullName(newText)}
          defaultValue={fullName}
        />
        <Text className="text-lg font-bold text-black mb-2 mt-4">
          Enter Username
        </Text>
        <TextInput
          className="border border-slate-300 rounded-xl text-lg px-4 text-black"
          placeholder="Enter your username"
          placeholderTextColor="#888"
          onChangeText={newText => setUsername(newText)}
          defaultValue={username}
        />
        <TouchableOpacity
          className="w-full p-2 rounded-xl bg-dyte-blue mt-4"
          onPress={handleSubmit}>
          <Text className="text-white text-xl text-center font-bold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

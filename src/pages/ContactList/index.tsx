import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {contacts, log, reOpenApp} from '../../utils';
import {Contact, FirebaseSnapshot, Meeting} from '../../types/general';
import {ContactListScreenProps} from '../../types/navigation';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import RNCallKeep from 'react-native-callkeep';
import {useGlobalStore} from '../../store';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {callerSetupOptions} from '../JoinCall/Callkeep';

export default function ContactList({navigation}: ContactListScreenProps) {
  const username = useGlobalStore(state => state._username);
  const [details, setDetails] = useState<{
    meeting: Meeting;
    caller: Contact;
  } | null>(null);

  function initiateCall(contact: Contact) {
    console.log(contact);
    navigation.push('join-call', {contact});
  }

  const onPayload = useCallback(
    (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      if (!remoteMessage.data) {
        console.log('empty data');
        return;
      }

      const payload = JSON.parse(
        remoteMessage.data.payload,
      ) as FirebaseSnapshot;
      const {meeting, contact, caller} = payload;

      log('payload: ', payload);

      if (contact.username === username) {
        console.log(username);
        setDetails({meeting, caller});
        RNCallKeep.displayIncomingCall(uuidv4(), caller.username, caller.name);
      } else {
        console.log('BAD USERNAME');
      }
    },
    [username],
  );

  useEffect(() => {
    return messaging().onMessage(onPayload);
  }, [onPayload]);

  useEffect(() => {
    return messaging().setBackgroundMessageHandler(async remoteMessage => {
      onPayload(remoteMessage);
      return Promise.resolve();
    });
  }, [onPayload]);

  function onEndCallAction(data: {callUUID: string}) {
    const {callUUID} = data;
    RNCallKeep.endCall(callUUID);
  }

  useEffect(() => {
    function onAnswerCallAction(data: {callUUID: string}) {
      const {callUUID} = data;
      RNCallKeep.endCall(callUUID);
      reOpenApp();

      if (details) {
        log('details', details);
        navigation.push('join-call', {
          contact: {name: '', username: '', icon: ''},
          caller: details.caller,
          activeMeeting: details.meeting,
        });
      } else {
        console.log('DETAILS NULL');
      }
    }

    try {
      RNCallKeep.setup(callerSetupOptions);
      RNCallKeep.setAvailable(true);
      RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
      RNCallKeep.addEventListener('endCall', onEndCallAction);
    } catch (err) {
      log('initializeCallKeep error:', err);
    }
  }, [details, navigation]);

  return (
    <View className="p-4 pt-8 bg-white min-h-screen">
      <Text className="text-black text-4xl font-bold mb-4">My Contacts</Text>
      <View>
        {contacts.map(contact => (
          <TouchableOpacity
            key={contact.username}
            onPress={() => initiateCall(contact)}
            className="flex flex-row justify-start items-center gap-x-4 my-2">
            <Image
              source={{uri: contact.icon}}
              className="w-16 h-16 rounded-full"
            />
            <Text className="text-black text-xl">{contact.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Contact, Meeting} from './general';

export type NavigationRoutesWithParams = {
  register: undefined;
  'contact-list': undefined;
  'join-call': {contact: Contact; caller?: Contact; activeMeeting?: Meeting};
};

export type RegisterScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'register'
>;

export type ContactListScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'contact-list'
>;

export type JoinCallScreenProps = NativeStackScreenProps<
  NavigationRoutesWithParams,
  'join-call'
>;

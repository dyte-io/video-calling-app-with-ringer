import {Contact, Meeting} from '../types/general';
import axios from 'axios';
import {server_url} from '../utils';

export function notifyServer(payload: {
  meeting?: Meeting;
  contact: Contact;
  caller: Contact;
}) {
  axios.post(server_url + '/onInitMeeting', payload).then(({data}) => {
    console.log('sent to ' + server_url + '/onInitMeeting');
    console.log(data);
  });
}

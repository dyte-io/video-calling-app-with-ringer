import {create} from 'zustand';
import axios from 'axios';
import {Meeting, ParticipantDetails} from '../types/general';
import {log} from '../utils';

interface State {
  _username: string;
  _fullName: string;
  _token: string;
  setUsername: (username: string) => void;
  setName: (name: string) => void;
  createMeeting: () => Promise<Meeting>;
  addParticipant: (
    meetId: string,
    username: string,
    fullName: string,
  ) => Promise<ParticipantDetails>;
}

const basic_token =
  'MjIyMzg3OWQtMmNmZi00NzcwLWJlYTAtMmI0NThhMGQ1NThkOjllYzlkMDE5NDM1NmIzNjk4M2Qw';

export const useGlobalStore = create<State>(set => ({
  _username: '',
  _fullName: '',
  _token: basic_token,
  setUsername: username => set(() => ({_username: username})),
  setName: name => set(() => ({_fullName: name})),
  createMeeting: _createMeeting,
  addParticipant: _addParticipant,
}));

function _createMeeting() {
  return new Promise<Meeting>((resolve, reject) => {
    axios
      .post(
        'https://api.cluster.dyte.in/v2/meetings',
        {
          title: 'Meeting-' + Math.random().toString(8),
        },
        {
          headers: {
            Authorization: `Basic ${basic_token}`,
          },
        },
      )
      .then(({data}) => {
        if (data.success) {
          resolve(data.data);
        }

        reject('failed');
      })
      .catch(err => {
        log('cannot create meeting', err);
        reject('failed');
      });
  });
}

function _addParticipant(meetId: string, username: string, fullName: string) {
  return new Promise<ParticipantDetails>((resolve, reject) => {
    axios
      .post(
        `https://api.cluster.dyte.in/v2/meetings/${meetId}/participants`,
        {
          name: fullName,
          preset_name: 'group_call_host',
          custom_participant_id: username,
        },
        {
          headers: {
            Authorization: `Basic ${basic_token}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({data}) => {
        if (data.success) {
          resolve(data.data);
        }
        reject('failed');
      })
      .catch(_ => {
        reject('failed');
      });
  });
}

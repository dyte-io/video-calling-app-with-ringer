export interface Contact {
  username: string;
  name: string;
  icon: string;
}

export interface Meeting {
  id: string;
  created_at: string;
  record_on_start: boolean;
  updated_at: string;
  live_stream_on_start: boolean;
  status: string;
  title: string;
}

export interface ParticipantDetails {
  created_at: string;
  updated_at: string;
  id: string;
  name: string;
  picture: string;
  custom_participant_id: string;
  preset_id: string;
  token: string;
}

export interface FirebaseSnapshot {
  meeting: Meeting;
  contact: Contact;
  caller: Contact;
}

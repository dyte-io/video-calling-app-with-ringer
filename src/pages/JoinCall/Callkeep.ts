import {PermissionsAndroid} from 'react-native';

export const callerSetupOptions = {
  ios: {
    appName: 'ReactNativeWazoDemo',
    imageName: 'sim_icon',
    supportsVideo: false,
    maximumCallGroups: '1',
    maximumCallsPerCallGroup: '1',
  },
  android: {
    alertTitle: 'Permissions Required',
    alertDescription:
      'This application needs to access your phone calling accounts to make calls',
    cancelButton: 'Cancel',
    okButton: 'ok',
    imageName: 'sim_icon',
    additionalPermissions: [PermissionsAndroid.PERMISSIONS.READ_CONTACTS],
  },
};

class Caller {
  currentCallId = null;
  constructor() {
    this.currentCallId = null;

    // Add RNCallKeep Events
    // RNCallKeep.addEventListener(
    //   'didReceiveStartCallAction',
    //   this.didReceiveStartCallAction,
    // );
    // RNCallKeep.addEventListener('answerCall', this.onAnswerCallAction);
    // RNCallKeep.addEventListener('endCall', this.onEndCallAction);
    // RNCallKeep.addEventListener(
    //   'didDisplayIncomingCall',
    //   this.onIncomingCallDisplayed,
    // );
    // RNCallKeep.addEventListener(
    //   'didPerformSetMutedCallAction',
    //   this.onToggleMute,
    // );
    // RNCallKeep.addEventListener('didToggleHoldCallAction', this.onToggleHold);
    // RNCallKeep.addEventListener('didPerformDTMFAction', this.onDTMFAction);
    // RNCallKeep.addEventListener(
    //   'didActivateAudioSession',
    //   this.audioSessionActivated,
    // );
  }

  // Initialise RNCallKeep
  // setup = () => {
  //   try {
  //     RNCallKeep.setup(callerSetupOptions);
  //     RNCallKeep.setAvailable(true); // Only used for Android, see doc above.
  //   } catch (err) {
  //     console.error('initializeCallKeep error:', err.message);
  //   }
  // };
  //
  // // Use startCall to ask the system to start a call - Initiate an outgoing call from this point
  // startCall = ({handle, localizedCallerName}) => {
  //   // Your normal start call action
  //   RNCallKeep.startCall(this.getCurrentCallId(), handle, localizedCallerName);
  // };
  //
  // reportEndCallWithUUID = (callUUID, reason) => {
  //   RNCallKeep.reportEndCallWithUUID(callUUID, reason);
  // };
  //
  // // Event Listener Callbacks
  //
  // didReceiveStartCallAction = data => {
  //   let {handle, callUUID, name} = data;
  //   // Get this event after the system decides you can start a call
  //   // You can now start a call from within your app
  // };
  //
  //
  // onEndCallAction = data => {
  //   let {callUUID} = data;
  //   RNCallKeep.endCall(this.getCurrentCallId());
  //
  //   this.currentCallId = null;
  // };
  //
  // // Currently iOS only
  // onIncomingCallDisplayed = data => {
  //   let {error} = data;
  //   // You will get this event after RNCallKeep finishes showing incoming call UI
  //   // You can check if there was an error while displaying
  // };
  //
  // onToggleMute = data => {
  //   let {muted, callUUID} = data;
  //   // Called when the system or user mutes a call
  // };
  //
  // onToggleHold = data => {
  //   let {hold, callUUID} = data;
  //   // Called when the system or user holds a call
  // };
  //
  // onDTMFAction = data => {
  //   let {digits, callUUID} = data;
  //   // Called when the system or user performs a DTMF action
  // };
  //
  // audioSessionActivated = data => {
  //   // you might want to do following things when receiving this event:
  //   // - Start playing ringback if it is an outgoing call
  // };
  //
  // getCurrentCallId = () => {
  //   if (!this.currentCallId) {
  //     this.currentCallId = uuid.v4();
  //   }
  //
  //   return this.currentCallId;
  // };

  render() {}
}

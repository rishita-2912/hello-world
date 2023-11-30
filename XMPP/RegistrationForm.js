/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {client, xml, jid} from '@xmpp/client';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    try {
      const xmpp = client({
        service: 'wss://192.168.1.119:7443',
        domain: 'samvaad.com',
      });

      // Connect to the XMPP server
      await xmpp.start();

      // Construct the registration stanza
      const registrationPayload = xml(
        'iq',
        {type: 'set', id: 'register'},
        xml(
          'query',
          {xmlns: 'jabber:iq:register'},
          xml('username', {}, username),
          xml('password', {}, password),
        ),
      );

      // Send the registration request
      await xmpp.send(registrationPayload);

      // Handle successful registration
    } catch (error) {
      // Handle registration failure
      console.error('Registration failed:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationForm;

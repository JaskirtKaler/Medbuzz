import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Backarrow from '../Components/Svg/Backarrow';
import PaperAirplaneIcon from '../Components/Svg/PaperAirplaneIcon';
import MessageBubble from './MessageBubble';

const Inbox: React.FC = () => {
  const navigation = useNavigation();

  // tester messages for user and client
  const [messages, setMessages] = useState([
    { id: 1, text: 'client', sender: 'ATS', date: '10:30 AM' },
    { id: 2, text: 'user', sender: 'User', date: '10:32 AM' },
  ]);

  const [inputText, setInputText] = useState('');
  const [clientName] = useState('tester name');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'User',
        date: new Date().toLocaleTimeString(),
      };

      const atsReply = {
        id: messages.length + 2,
        text: 'MESSAGE FROM ATS', // standard message from ats reply
        sender: 'ATS',
        date: new Date().toLocaleTimeString(),
      };

      setMessages([...messages, userMessage, atsReply]);
      setInputText('');
      Keyboard.dismiss();
    }
  };

  // keyboard avoiding code
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Backarrow width={30} height={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.clientName}>{clientName}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        keyboardShouldPersistTaps='handled'
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} isUserMessage={message.sender === 'User'} />
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Start typing..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <PaperAirplaneIcon width={24} height={24} color="#000" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  messagesContainer: {
    padding: 10,
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    position: 'absolute',
    right: 15,
    bottom: 2,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Inbox;

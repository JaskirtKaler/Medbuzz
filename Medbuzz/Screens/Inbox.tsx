import React, { useEffect, useState } from 'react';
import { View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Backarrow from '../Components/Svg/Backarrow';
import PaperAirplaneIcon from '../Components/Svg/PaperAirplaneIcon';
import MessageBubble from './MessageBubble';
import { useUnreadMessages } from '../Components/Utility/UnreadMessagesContext';
const {width, height} = Dimensions.get('window'); // screen max width and height


const Inbox: React.FC = () => {
  const navigation = useNavigation<any>();

  
  // tester messages for user and client
  const [messages, setMessages] = useState([
    { id: 1, text: 'Would you like our HR team to contact you for any assistance in finding a job? Answer Yes or No', sender: 'ATS', date: new Date().toLocaleTimeString() },
  ]);

  const [inputText, setInputText] = useState('');
  const [clientName] = useState('Medbuzz HR');

  const { incrementUnreadCount, resetUnreadCount } = useUnreadMessages();


  const handleSendMessage = () => {
    if (inputText.trim()) {
      const userMessage = {
        id: Date.now() + Math.random(),
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

      setMessages([...messages, userMessage]);
      incrementUnreadCount();
      handleResponse(inputText);
      setInputText('');
      Keyboard.dismiss();
    }
  };

  const handleResponse = (message: string) => {
    const yesPattern = /\byes\b/i;
    const noPattern = /\bno\b/i;

    switch (true) {
      case yesPattern.test(message):
        // Handle "yes" response
        const atsReplyYes = {
          id: Date.now() + Math.random(),
          text: 'Thank you! Medbuzz HR will be in contact with you shortly.',
          sender: 'Medbuzz HR',
          date: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, atsReplyYes]);
        incrementUnreadCount();
        break;

        case noPattern.test(message):
          const atsReplyNo = {
            id: messages.length + 1,
            text: "We understand! If you change your mind, our team is always here to help. Don’t hesitate to reach out at any time.",
            sender: 'Medbuzz HR',
            date: new Date().toLocaleTimeString(),
          };
          setMessages((prevMessages) => [...prevMessages, atsReplyNo]);
          incrementUnreadCount();
          break;

      default:
        // Handle any other response
        console.log("No specific response detected; no action taken.");
        break;
    }
  };

  return (


    <View style={styles.container}>
            {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('MessagePage')}}>
          <Backarrow width={40} height={40} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{clientName}</Text>
        <View style={styles.placeholder} />
      </View>
      
 
      

      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        keyboardShouldPersistTaps='handled'
        style={{ flexGrow: 1 }}
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
          <PaperAirplaneIcon width={24} height={Platform.OS === 'ios' ? height * 0.105 : 24} color="#000" />
        </TouchableOpacity>
      </View>
      </View>
      





  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: height * (Platform.OS === 'ios' ? 0.125 : 0.1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: Platform.OS === 'ios' ? 'flex-end' : 'center',
    paddingBottom: Platform.OS === 'ios' ? '5%' : 0,
    backgroundColor: '#FFF',
    elevation: 5, // This will add a box shadow for Android
    shadowColor: '#000', // this will add a box shadow for IOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  placeholder: {
    width: 40,
  },
  spacer: {
    width: width,
    height: height * .01,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 0,
    backgroundColor: 'transparent',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    paddingVertical: Platform.OS === 'ios' ? 8 : 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
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

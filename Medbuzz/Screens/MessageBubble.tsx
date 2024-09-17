import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// message bubble prop
interface MessageBubbleProps {
  message: {
    text: string;
    date: string;
  };
  isUserMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUserMessage }) => {
  return (
    <View style={[
      styles.messageContainer,
      isUserMessage ? styles.userMessageContainer : styles.atsMessageContainer,
    ]}>
      <View
        style={[
          styles.messageBubble,
          isUserMessage ? styles.userMessage : styles.atsMessage,
        ]}
      >
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
      <Text style={styles.messageDate}>{message.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  atsMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '99%',
    padding: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  atsMessage: {
    backgroundColor: '#ffffff', 
  },
  userMessage: {
    backgroundColor: '#C2EEE7', 
    borderColor: '#ccc',
    borderWidth: 1,
  },
  messageText: {
    color: '#000',
  },
  messageDate: {
    fontSize: 10,
    marginTop: 5,
    color: '#888',
    textAlign: 'center',
  },
});

export default MessageBubble;

import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Modal, Alert } from 'react-native';
import Profile from '../Components/Svg/Profile.tsx'; // Assuming you have an SVG for profile pics
import moment from 'moment'; // For time formatting
import Backarrow from '../Components/Svg/Backarrow';
import { useNavigation } from '@react-navigation/native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Trashcan from '../Components/Svg/Trashcan';
import messaging from '@react-native-firebase/messaging'; // Import Firebase messaging
import notifee, { AndroidStyle, AndroidImportance } from '@notifee/react-native';
import { v4 as uuidv4 } from 'uuid';
import { Button } from 'react-native'; // Import Button



// Define the structure of a message
interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
  isDeletable: boolean;
}

// Define the structure of a sender
interface Sender {
  id: string;
  name: string;
  companyName: string;
  profilePicture: string;
  unreadCount: number;
}

const MessagePage = () => {
  // Navigation hook from React Navigation
  const navigation = useNavigation<any>();

  // State to control modal visibility and selected sender
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSender, setSelectedSender] = useState<string | null>(null);

  // Inactivity timer reference
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const INACTIVITY_TIMEOUT = 300000; // 5 minutes in milliseconds

  // Reset inactivity timer
  const resetTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    
    inactivityTimer.current = setTimeout(() => {
      sendInactivityNotification();
    }, INACTIVITY_TIMEOUT);
  };

  // Function to send inactivity notification
  const sendInactivityNotification = async () => {
    const title = 'You have unread messages!';
    const body = 'Check your messages to see what you missed.';
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  };


  // Handler for the back arrow button
  const handleBack = () => {
    navigation.goBack();
    console.log("backarrow clicked");
  };

  // Sample state for senders
  const [senders, setSenders] = useState<Sender[]>([
    { id: '1', name: 'Radixsol HR', companyName: 'Radixsol', profilePicture: '', unreadCount: 1 },
    { id: '2', name: 'Person 1', companyName: 'Company Name', profilePicture: '', unreadCount: 3 },
    { id: '3', name: 'Person 2', companyName: 'Company Name', profilePicture: '', unreadCount: 2 },
    { id: '5', name: 'Person 3', companyName: 'Company Name', profilePicture: '', unreadCount: 0 },
    { id: '7', name: 'Person 2', companyName: 'Company Name', profilePicture: '', unreadCount: 1 }
  ]);

  // Sample state for messages
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: '1', content: 'Welcome to Medbuzz!', timestamp: Date.now(), isDeletable: false },
    { id: '2', senderId: '2', content: 'Hello there!', timestamp: Date.now() - 3600 * 1000, isDeletable: true },
    { id: '3', senderId: '3', content: 'How are you?', timestamp: Date.now() - 7200 * 1000, isDeletable: true },
    { id: '7', senderId: '5', content: 'How are you?', timestamp: Date.now() - 7200 * 1000, isDeletable: true },
  ]);


  // Firebase setup and notification listener
  useEffect(() => {
    // Request permission for notifications
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted.');
      }
    };

    // Get FCM token
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
    };


    
    // Listen for foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new message arrived!', JSON.stringify(remoteMessage));
      // Show an alert when a new message comes in
      Alert.alert('New message!', remoteMessage.notification?.title ?? 'You have a new message');

      const newMessage: Message = {
        id: remoteMessage.data?.messageId || uuidv4(),  // Replace with a unique ID
        senderId: remoteMessage.data?.senderId || 'unknown_sender', // Replace with senderId from remoteMessage
        content: remoteMessage.notification?.body || 'New message content',
        timestamp: Date.now(),
        isDeletable: true,
      };
      addMessage(newMessage);

    });

    requestUserPermission();
    getToken();

    return unsubscribe;
  }, []);

  

    // Function to add a new message
    const addMessage = (newMessage: Message) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
      const senderExists = senders.find(sender => sender.id === newMessage.senderId);
  
      if (senderExists) {
        // If sender already exists, update unread count
        const updatedSenders = senders.map(sender => {
          if (sender.id === newMessage.senderId) {
            const updatedUnreadCount = sender.unreadCount + 1;
            sendNotification(sender.name, updatedUnreadCount);
            return { ...sender, unreadCount: updatedUnreadCount };
          }
          return sender;
        });
        setSenders(updatedSenders);
      } else {
        // If sender does not exist, add sender to senders state
        const newSender: Sender = {
          id: newMessage.senderId,
          name: `Sender ${newMessage.senderId}`, // Placeholder name
          companyName: 'Unknown Company', // Placeholder company
          profilePicture: '', // Placeholder profile picture
          unreadCount: 1,
        };
        setSenders(prevSenders => [...prevSenders, newSender]);
        sendNotification(newSender.name, 1);
      }
    };

    const sendNotification = async (senderName: string, unreadCount: number) => {
      // This is where you can customize your notification
      const title = `New message from ${senderName}`;
      const body = `You have ${unreadCount} unread messages from ${senderName}`;
    
      
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'default',
        importance: AndroidImportance.HIGH,
      });
  
      // Display the notification
      await notifee.displayNotification({
        title: title,
        body: body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher', // Add your small icon here
          pressAction: {
            id: 'default',
          },
        },
      });

            // Assuming you're in the foreground, use an alert for demo purposes
            Alert.alert(title, body);
    };
  

  // Handler for pressing a sender item
  const handlePress = (senderId: string) => {
    console.log(`Clicked on sender with ID: ${senderId}`);
    // Navigate to the detail view or perform other actions here
    // navigation.navigate('MessageDetail', { senderId });
  };

  // Handler for pressing the trash can icon
  const handleTrashcanPress = (senderId: string) => {
    setSelectedSender(senderId);
    setModalVisible(true);
  };

  // Handler for deleting a conversation
  const handleDelete = () => {
    if (selectedSender) {
      setSenders(senders.filter(sender => sender.id !== selectedSender));
      setMessages(messages.filter(message => message.senderId !== selectedSender));
      setModalVisible(false);
      setSelectedSender(null);
    }
  };

  // Handler for canceling the delete action
  const handleCancel = () => {
    setModalVisible(false);
    setSelectedSender(null);
  };

  // Render right swipe actions (trash can)
  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, senderId: string) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0], // Adjusted to start off-screen and slide into view
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.trashContainer, {
          transform: [{ translateX }],
        }]}
      >
        <TouchableOpacity onPress={() => handleTrashcanPress(senderId)}>
          <Trashcan width={30} height={30} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Render individual sender items in the list
  const renderItem = ({ item }: { item: Sender }) => {
    // Find the last message for this sender
    const lastMessage = messages.find((message) => message.senderId === item.id);
    // Format the time since the last message
    const timeAgo = lastMessage ? moment(lastMessage.timestamp).fromNow() : '';

    return (
      <GestureHandlerRootView>
        {item.name === 'Radixsol HR' ? (
          // Render without swipe for 'Radixsol HR'
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <View style={styles.encasing}>
              <Profile style={{ marginLeft: 15 }} width={50} height={50} color={"#000"} />
              <View style={styles.messageInfo}>
                <Text style={styles.username}>{item.name}</Text>
                <Text style={styles.companyName}>{item.companyName}</Text>
              </View>
              <View style={styles.rightInfo}>
                <Text style={styles.timeAgo}>{timeAgo}</Text>
                {item.unreadCount > 0 && (
                  <View style={styles.unreadCountContainer}>
                    <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
          
        ) : (
          // Render with swipe for other users
          <Swipeable
            renderRightActions={(progress) => renderRightActions(progress, item.id)}
            onSwipeableLeftOpen={() => console.log(`Swiped left on ${item.name}`)}
          >
            <TouchableOpacity onPress={() => handlePress(item.id)}>
              <View style={styles.encasing}>
                <Profile style={{ marginLeft: 15 }} width={50} height={50} color={"#000"} />
                <View style={styles.messageInfo}>
                  <Text style={styles.username}>{item.name}</Text>
                  <Text style={styles.companyName}>{item.companyName}</Text>
                </View>
                <View style={styles.rightInfo}>
                  <Text style={styles.timeAgo}>{timeAgo}</Text>
                  {item.unreadCount > 0 && (
                    <View style={styles.unreadCountContainer}>
                      <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
      </GestureHandlerRootView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <View style={styles.backArrowContainer}>
        <TouchableOpacity onPress={handleBack}>
          <View style={styles.backArrow}>
            <Backarrow width={40} height={40} color={"#000"} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Messages</Text>
      <Button title="Test Notification" onPress={() => sendNotification('Radixsol HR', 1)} />

      {/* FlatList to render list of senders */}
      <FlatList
        data={senders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      {/* Confirmation Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none" // No animation
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Would you like to delete this conversation?</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete Conversation</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingLeft: 10,
    color: 'black',
  },
  backArrowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 10,
    paddingTop: Platform.OS === 'ios' ? 45 : 10,
  },
  backArrow: {
    justifyContent: 'flex-start',
  },
  encasing: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingVertical: 12,
    paddingRight: 5,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageInfo: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  companyName: {
    fontSize: 14,
    color: '#666',
  },
  rightInfo: {
    alignItems: 'flex-end',
  },
  timeAgo: {
    fontSize: 12,
    color: 'black',
  },
  unreadCountContainer: {
    marginTop: 4,
    backgroundColor: '#0EA68D',
    borderRadius: 0, // Square corners
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unreadCount: {
    color: 'white',
    fontWeight: 'bold',
  },
  trashContainer: {
    backgroundColor: '#DB0000', // Red color for trashcan
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    right: 0, // Align to the right side
    top: 0, // Align to the top
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  deleteButton: {
    backgroundColor: '#BE0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default MessagePage;
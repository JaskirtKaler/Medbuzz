import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Modal, Platform, Dimensions } from 'react-native';
import Profile from '../Components/Svg/Profile.tsx'; // Assuming you have an SVG for profile pics
import moment from 'moment'; // For time formatting
import Backarrow from '../Components/Svg/Backarrow';
import { useNavigation } from '@react-navigation/native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Trashcan from '../Components/Svg/Trashcan';
import { useUnreadMessages } from '../Components/Utility/UnreadMessagesContext';
const {width, height} = Dimensions.get('window'); // screen max width and height


// Define the structure of a message
interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp?: number;
  isDeletable: boolean;
}

// Define the structure of a sender
interface Sender {
  id: string;
  name: string;
  companyName: string;
  profilePicture: string;
  unreadCount: number;
  lastUnreadMessageTimestamp: number | null;

}

const MessagePage = () => {
  
  // Navigation hook from React Navigation
  const navigation = useNavigation<any>();

  const { unreadCount, incrementUnreadCount, resetUnreadCount } = useUnreadMessages(); // Access resetUnreadCount from context

    // This effect will log the unread count whenever it changes
    useEffect(() => {
      console.log('Unread messages:', unreadCount);
    }, [unreadCount]);

  // State to control modal visibility and selected sender
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSender, setSelectedSender] = useState<string | null>(null);

  // Handler for the back arrow button
  const handleBack = () => {
    navigation.navigate('Homepage');
    console.log("backarrow clicked");
  };


// Assuming you're receiving new messages in the context and updating the state accordingly

// Update the useEffect to also listen to changes in messages
useEffect(() => {
  // Update senders with actual unread counts and timestamps from the context
  const updatedSenders = senders.map(sender => {
    // Find the last message for this sender
    const lastMessage = messages
      .filter((message) => message.senderId === sender.id)
      .sort((a, b) => b.timestamp - a.timestamp)[0]; // Get the latest message

    // Update the lastUnreadMessageTimestamp if there's a new message
    const lastUnreadMessageTimestamp = lastMessage ? lastMessage.timestamp : null;

    return {
      ...sender,
      unreadCount: sender.id === '1' ? unreadCount : 0, // Radixsol HR has the unread count
      lastUnreadMessageTimestamp, // Update the timestamp here
    };
  });
  setSenders(updatedSenders);
}, [unreadCount, messages]); // Add messages to the dependencies

  // Sample state for senders
  const [senders, setSenders] = useState<Sender[]>([
    { id: '1', name: 'Radixsol HR', companyName: 'Radixsol', profilePicture: '', unreadCount: 0, lastUnreadMessageTimestamp: null  },
    { id: '2', name: 'Person 1', companyName: 'Company Name', profilePicture: '', unreadCount: 0 , lastUnreadMessageTimestamp: null },
    { id: '3', name: 'Person 2', companyName: 'Company Name', profilePicture: '', unreadCount: 0 , lastUnreadMessageTimestamp: null }
  ]);

  // Sample state for messages
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', senderId: '1', content: 'Welcome to Medbuzz!', timestamp: Date.now(), isDeletable: false },
    { id: '2', senderId: '2', content: 'Hello there!', isDeletable: true },
    { id: '3', senderId: '3', content: 'How are you?', isDeletable: true },
  ]);


  // Handler for pressing a sender item
  const handlePress = (senderId: string) => {
    console.log(`Clicked on sender with ID: ${senderId}`);
    if (senderId === '1') { // Assuming '1' is the ID for 'Radixsol HR'
      navigation.navigate('Inbox'); // Navigate to Inbox when 'Radixsol HR' is clicked
    }
  };

  const handleMarkAsRead = () => {
    resetUnreadCount(); // Reset unread count when marking as read
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
  const lastMessage = messages
    .filter((message) => message.senderId === item.id && !message.isRead) // Filter for unread messages
    .sort((a, b) => b.timestamp - a.timestamp)[0]; // Sort to get the latest unread message

      // Format the time since the last unread message
  const timeAgo = lastMessage ? moment(lastMessage.timestamp).fromNow() : 'No messages yet';


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
                {item.unreadCount > 0 && <Text style={styles.timeAgo}>{timeAgo}</Text>}
                {item.unreadCount > 0 &&(
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
                {item.unreadCount > 0 && <Text style={styles.timeAgo}>{timeAgo}</Text>}
                {item.unreadCount > 0 &&(
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Backarrow width={40} height={40} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Messages</Text>
        <View style={styles.placeholder} />
      </View>
      {/* Spacer */}
      <View style={styles.spacer}></View>

      {/* Mark as Read Button */}
      <TouchableOpacity style={styles.markAsReadButton} onPress={handleMarkAsRead}>
        <Text style={styles.markAsReadText}>Mark as Read</Text>
      </TouchableOpacity>

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
    height: height * .075,
  },
  backArrowContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingBottom: 10,
    paddingTop: 10,
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
    markAsReadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  markAsReadButton: {
    backgroundColor: '#0EA68D',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 0,
    alignSelf: 'flex-end',
    marginRight: 5,
    marginBottom: 10,
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

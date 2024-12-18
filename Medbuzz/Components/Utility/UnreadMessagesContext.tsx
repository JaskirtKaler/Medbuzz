import React, { createContext, useContext, useState, ReactNode } from 'react';

type UnreadMessagesContextType = {
  unreadCount: number;
  resetUnreadCount: () => void;
  incrementUnreadCount: () => void;
};

const UnreadMessagesContext = createContext<UnreadMessagesContextType | undefined>(undefined);

type UnreadMessagesContextProviderProps = {
  children: ReactNode;
};

export const UnreadMessagesContextProvider: React.FC<UnreadMessagesContextProviderProps> = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const resetUnreadCount = () => setUnreadCount(0);
  const incrementUnreadCount = () => setUnreadCount((count) => count + 1);

  return (
    <UnreadMessagesContext.Provider value={{ unreadCount, resetUnreadCount, incrementUnreadCount }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
};

export const useUnreadMessages = () => {
  const context = useContext(UnreadMessagesContext);
  if (!context) {
    throw new Error('useUnreadMessages must be used within an UnreadMessagesContextProvider');
  }
  return context;
};

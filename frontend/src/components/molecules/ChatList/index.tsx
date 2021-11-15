import ChatComponent from '~/atoms/Chat';
import { Chat } from '~/types/Chat';

const ChatList = ({ chatList }: { chatList: Chat[] }) => {
  return (
    <>
      {chatList.map((element: Chat, i: number) => (
        <ChatComponent key={i} {...element} />
      ))}
    </>
  );
};

export default ChatList;

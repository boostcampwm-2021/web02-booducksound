import { Socket } from 'socket.io';

import io from '~/sockets/io';
import getGameRoom from '~/sockets/utils/getGameRoom';
import getNextRound from '~/sockets/utils/getNextRound';
import replaceText from '~/sockets/utils/replaceText';
import { SocketEvents } from '~/types/SocketEvents';
import serverRooms from '~/variables/serverRooms';

function handleSendChat(this: Socket, uuid: string, name: string, text: string, color: string) {
  try {
    const socket = this;
    if (!serverRooms[uuid]) return;

    const currentMusicInfo = serverRooms[uuid].musics[serverRooms[uuid].curRound - 1];
    const isAnswer = currentMusicInfo.answers.some((answer: string) => replaceText(answer) === replaceText(text));

    if (serverRooms[uuid].status === 'waiting' || !isAnswer || serverRooms[uuid].players[socket.id].answer) {
      return io.to(uuid).emit(SocketEvents.RECEIVE_CHAT, { name, text, status: 'message', color });
    }

    serverRooms[uuid].players[socket.id].answer = true;
    serverRooms[uuid].players[socket.id].score += Math.max(100 - serverRooms[uuid].answerCount * 20, 10);
    serverRooms[uuid].answerCount += 1;
    io.to(uuid).emit(SocketEvents.RECEIVE_ANSWER, { uuid, name, text: '', status: 'answer' });
    io.to(uuid).emit(SocketEvents.SET_GAME_ROOM, getGameRoom(uuid));

    const { answerCount, players, needAnswerRatio } = serverRooms[uuid];
    if (answerCount >= Object.keys(players).length * needAnswerRatio) {
      getNextRound(uuid, { type: 'ANSWER', answerCount });
    }
  } catch (error) {
    console.error(error);
  }
}

const onSendChat = (socket: Socket) => {
  socket.on(SocketEvents.SEND_CHAT, handleSendChat);
};

export default onSendChat;

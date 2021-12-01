import onCheckEnter from './events/game/checkEnter';
import onGetRoomPassword from './events/game/getRoomPassword';
import onLeaveRoom from './events/game/leaveRoom';
import onSendChat from './events/game/sendChat';
import onChangeGameOption from './events/game/setChangeGameOption';
import onSetDelegate from './events/game/setDelegate';
import onSetExpulsion from './events/game/setExpulsion';
import onSetPlayer from './events/game/setPlayer';
import onSkip from './events/game/skip';
import onStartGame from './events/game/startGame';
import onComparePwd from './events/lobby/comparePwd';
import onCreateRoom from './events/lobby/createRoom';
import onJoinroom from './events/lobby/joinRoom';
import onSetLobbyRoom from './events/lobby/setLobbyRooms';
import onSearchUrl from './events/playlist/searchUrl';
import sockets from './io';

sockets.on('connection', (socket) => {
  onComparePwd(socket);
  onCreateRoom(socket);
  onGetRoomPassword(socket);
  onJoinroom(socket);
  onLeaveRoom(socket);
  onSearchUrl(socket);
  onSendChat(socket);
  onSetDelegate(socket);
  onSetExpulsion(socket);
  onChangeGameOption(socket);
  onSetLobbyRoom(socket);
  onSetPlayer(socket);
  onSkip(socket);
  onStartGame(socket);
  onCheckEnter(socket);
});

export default sockets;

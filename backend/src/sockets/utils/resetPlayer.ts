import serverRooms from '~/variables/serverRooms';

const resetPlayer = (uuid: string) => {
  Object.keys(serverRooms[uuid].players).forEach((key) => {
    serverRooms[uuid].players[key].skip = false;
    serverRooms[uuid].players[key].answer = false;
  });
};

export default resetPlayer;

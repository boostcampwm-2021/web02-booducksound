export enum SocketEvents {
  CREATE_ROOM = 'CREATE_ROOM',
  JOIN_ROOM = 'JOIN_ROOM',
  SET_PLAYER = 'SET_PLAYER',
  LEAVE_ROOM = 'LEAVE_ROOM',
  RECEIVE_CHAT = 'RECEIVE_CHAT',
  SEND_CHAT = 'SEND_CHAT',
  SET_LOBBY_ROOMS = 'SET_LOBBY_ROOMS',
  SET_LOBBY_ROOM = 'SET_LOBBY_ROOM',
  DELETE_LOBBY_ROOM = 'DELETE_LOBBY_ROOM',
  START_GAME = 'START_GAME',
  NEXT_ROUND = 'NEXT_ROUND',
  SET_GAME_ROOM = 'SET_GAME_ROOM',
  GAME_END = 'GAME_END',
  SEND_ANSWER = 'SEND_ANSWER',
  RECEIVE_ANSWER = 'RECEIVE_ANSWER',
  SKIP = 'SKIP',
  COMPARE_PWD = 'COMPARE_PWD',
  SEARCH_URL = 'SEARCH_URL',
  ROUND_END = 'ROUND_END',
  SHOW_HINT = 'SHOW_HINT',
  SET_DELEGATE = 'SET_DELEGATE',
  SET_EXPULSION = 'SET_EXPULSION',
  GET_ROOM_PASSWORD = 'GET_ROOM_PASSWORD',
}

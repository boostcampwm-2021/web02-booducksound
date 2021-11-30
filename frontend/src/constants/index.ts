import { toast } from 'react-toastify';

export const SOCKET_URI = process.env.NEXT_PUBLIC_SOCKET_URI;
export const BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;
export const HEADERS = { 'Content-Type': 'application/json' };
export const TOAST_OPTION = { autoClose: 3000, position: toast.POSITION.BOTTOM_RIGHT };
export const SUCCESS = 'SUCCESS';
export const FAILED = 'FAILED';
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const PLAYING = 'playing';
export const WAITING = 'waiting';
export const RESTING = 'resting';

/* Messages */
export const LOGIN_SUCC_MSG = '로그인에 성공했습니다.';
export const COPY_EMPTY_MSG = '초대 코드를 입력해 주세요.';
export const COPY_SUCC_MSG = '초대코드가 복사되었습니다.';
export const COPY_ERR_MSG = '존재하지 않는 초대코드입니다.';
export const ID_EMPTY_MSG = '아이디를 입력해 주세요';
export const PASSWORD_EMPTY_MSG = '비밀번호를 입력해 주세요.';
export const PASSWORD_ERR_MSG = '비밀번호가 다릅니다.';
export const NICKNAME_EMPTY_MSG = '닉네임을 입력해 주세요.';
export const PLAYLIST_EMPTY_MSG = '플레이리스트가 존재하지 않습니다.';
export const PLAYLIST_ERR_MSG = '플레이리스트 등록에 실패하였습니다.';
export const PLAYLIST_INPUT_ERR_MSG = '플레이리스트 입력을 확인해 주세요.';
export const PLAYLIST_DELETE_ERR_MSG = '플레이리스트 삭제에 실패하였습니다.';
export const GAME_ENTER_ERR_MSG = '이미 해당 방에 참여중입니다.';
export const TIME_EXCESS_MSG = '시간이 초과되었습니다.';
export const GAME_SKIP_MSG = '모두가 SKIP 하였습니다.';
export const NON_USER_MYPAGE_MSG = '회원으로 로그인하시면 자신의 플레이리스트를 확인할 수 있습니다.';
export const SEARCH_EMPTY_MSG = '검색어를 입력해주세요';
export const ROOM_TITLE_EMPTY_MSG = '방 제목을 입력하세요';

/* Constants */
export const YOUTUBE_REG_EXP = /(https:\/\/)?(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_]*/g;
export const CHAT_BLOCK_SIZE = 50;
export const MAX_VOLUME = 100;
export const LIMIT_SEARCH_TIME = 200;
export const INIT_VOLUME = 70;
export const INIT_TIME_PER_PROBLEM = 60;
export const INIT_NEED_ANSWER_RATIO = 0.5;
export const MIN_MUSIC_LENGTH = 3;
export const MAX_MUSIC_LENGTH = 50;
export const INIT_USER_COLOR_HEX = 'fff';

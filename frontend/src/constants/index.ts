import { toast } from 'react-toastify';

export const SOCKET_URI = process.env.NEXT_PUBLIC_SOCKET_URI;
export const BACKEND_URL = process.env.NEXT_PUBLIC_SOCKET_URI;
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
export const CHAT_EMPTY_MSG = '메시지를 입력하세요.';
export const LOGIN_SUCC_MSG = '로그인에 성공했습니다.';
export const COPY_EMPTY_MSG = '초대 코드를 입력해 주세요.';
export const COPY_SUCC_MSG = '초대코드가 복사되었습니다.';
export const COPY_ERR_MSG = '존재하지 않는 초대코드입니다.';
export const ID_EMPTY_MSG = '아이디를 입력해 주세요';
export const PASSWORD_EMPTY_MSG = '비밀번호를 입력해 주세요.';
export const PASSWORD_ERR_MSG = '비밀번호가 다릅니다.';
export const NICKNAME_EMPTY_MSG = '닉네임을 입력해 주세요.';
export const PASSWORD_RENEW_MSG = '새로운 비밀번호를 입력하세요.';
export const PLAYLIST_TITLE_MSG = '플레이리스트 제목을 입력해주세요.';
export const PLAYLIST_DESCRIPTION_MSG = '플레이리스트 설명을 입력해주세요.';
export const PLAYLIST_HASH_TAG_MSG = '추가할 해시태그를 입력 후 Enter를 클릭하세요.';
export const PLAYLIST_EMPTY_MSG = '플레이리스트가 존재하지 않습니다.';
export const PLAYLIST_ERR_MSG = '플레이리스트 등록에 실패하였습니다.';
export const PLAYLIST_INPUT_ERR_MSG = '플레이리스트 입력을 확인해 주세요.';
export const PLAYLIST_DELETE_ERR_MSG = '플레이리스트 삭제에 실패하였습니다.';
export const PLAYLIST_SELECT_EMPTY_MSG = '플레이리스트를 선택해주세요';
export const GAME_ENTER_ERR_MSG = '이미 해당 방에 참여중입니다.';
export const TIME_EXCESS_MSG = '시간이 초과되었습니다.';
export const GAME_SKIP_MSG = '모두가 SKIP 하였습니다.';
export const NON_USER_MYPAGE_MSG = '회원으로 로그인하시면 자신의 플레이리스트를 확인할 수 있습니다.';
export const SEARCH_EMPTY_MSG = '검색어를 입력해주세요';
export const ROOM_TITLE_EMPTY_MSG = '방 제목을 입력하세요';
export const MUSIC_LIST_INSERT_MSG = '최소 3개, 최대 50개까지 추가가 가능합니다.';
export const MUSIC_INSERT_EXAMPLE_MSG = '노래 정보를 입력해 주세요. ex) 아이유 - 팔레트';
export const MUSIC_CONFIRM_MSG = '노래 정보를 모두 입력해야합니다.';
export const SHOW_HINT_MSG = '힌트를 입력해 주세요.';
export const URL_EMPTY_MSG = '유튜브 URL을 입력해 주세요.';
export const URL_CONFIRM_MSG = '유튜브 URL을 확인해 주세요.';
export const MUSIC_ANSWER_MSG = '정답을 입력 후 Enter를 클릭해 주세요.';

/* Constants */
export const YOUTUBE_REG_EXP = /(https:\/\/)?(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_]*/g;
export const CHAT_BLOCK_SIZE = 50;
export const MAX_VOLUME = 100;
export const LIMIT_SEARCH_TIME = 200;
export const INIT_VOLUME = 70;
export const COLOR_CHANGE_TIME = 700;
export const INIT_TIME_PER_PROBLEM = 60;
export const INIT_NEED_ANSWER_RATIO = 0.5;
export const MIN_MUSIC_LENGTH = 3;
export const MAX_MUSIC_LENGTH = 50;
export const INIT_USER_COLOR_HEX = 'fff';

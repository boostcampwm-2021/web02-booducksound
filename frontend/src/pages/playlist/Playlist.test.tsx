import { render, fireEvent, waitFor } from '@testing-library/react';

import { UserState } from '~/reducers/user';
import { PlaylistInput } from '~/types/PlaylistInput';

import PlaylistCreate from './[playlistId]';

export const useSelector = jest.fn();
export const useDispatch = jest.fn();

jest.mock('react-redux');

const user: UserState = {
  id: 'jum654',
  nickname: 'GM고라니',
  color: '#401ac7',
  likes: [],
  myPlaylist: [],
};

useSelector.mockImplementation((selector) =>
  selector({
    user,
  }),
);

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {
      playlistId: 'create',
    },
  })),
}));

describe('플레이리스트 생성/수정 페이지', () => {
  it('제목/설명/해시태그 입력 시 InputText에 그대로 나타나야 한다.', () => {
    const content: PlaylistInput = { playlistName: '', description: '', hashtag: '', hashtags: [], musics: [] };
    const { getByPlaceholderText } = render(<PlaylistCreate content={content} type="create"></PlaylistCreate>);
    const title = getByPlaceholderText('플레이리스트 제목을 입력해주세요.');
    const description = getByPlaceholderText('플레이리스트 설명을 입력해주세요.');
    const hashtag = getByPlaceholderText('추가할 해시태그를 입력 후 Enter를 클릭하세요.');
    expect(title).toHaveValue('');
    expect(description).toHaveValue('');
    expect(hashtag).toHaveValue('');
    fireEvent.change(title, { target: { value: 'test' } });
    fireEvent.change(description, { target: { value: 'test' } });
    fireEvent.change(hashtag, { target: { value: 'test' } });
    expect(title).toHaveValue('test');
    expect(description).toHaveValue('test');
    expect(hashtag).toHaveValue('test');
  });
  it('해시태그 입력 후 Enter키 입력 시 칩이 쌓여야 한다.', () => {
    const content: PlaylistInput = { playlistName: '', description: '', hashtag: '', hashtags: [], musics: [] };
    const { getByPlaceholderText, getByText } = render(
      <PlaylistCreate content={content} type="create"></PlaylistCreate>,
    );
    const hashtag = getByPlaceholderText('추가할 해시태그를 입력 후 Enter를 클릭하세요.');
    fireEvent.change(hashtag, { target: { value: 'test' } });
    fireEvent.keyUp(hashtag, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(hashtag).toHaveValue('');
    waitFor(() => expect(getByText('test')).toBeInTheDocument());
  });
});

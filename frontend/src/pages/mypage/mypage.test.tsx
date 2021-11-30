import { ThemeProvider } from '@emotion/react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

import { UserState } from '~/reducers/user';
import theme from '~/styles/theme';

import MyPage from './index';

export const useSelector = jest.fn();
export const useDispatch = jest.fn();

jest.mock('react-redux');

const user: UserState = {
  id: 'maxcha',
  nickname: 'GM나무늘보',
  color: '#fff',
  likes: [],
  myPlaylist: [],
};

useSelector.mockImplementation((selector) => selector({ user }));

function renderMypage() {
  const result = render(
    <ThemeProvider theme={theme}>
      <MyPage />
    </ThemeProvider>,
  );

  const myPlayListTitle = () => result.getByText('내가 작성한 플레이리스트');
  const myLikePlayListTitle = () => result.getByText('내가 좋아요한 플레이리스트');
  //   const changePasswordButton = () => result.getByText('비밀번호 변경');
  const logOutButton = () => result.getByText('로그아웃');

  function clickLogOut() {
    userEvent.click(logOutButton());
  }

  return {
    myPlayListTitle,
    myLikePlayListTitle,

    logOutButton,
    clickLogOut,
  };
}

describe('<MyPage />', () => {
  it('회원일때 마이페이지', async () => {
    const { myPlayListTitle, myLikePlayListTitle, logOutButton, clickLogOut } = renderMypage();

    expect(clickLogOut()).toBeInTheDocument();
  });
  //   it('비회원일때 마이페이지', async () => {
  //     const { logOutButton, clickLogOut } = renderMypage();
  //     expect(clickLogOut()).toBeInTheDocument();
  //   });
});

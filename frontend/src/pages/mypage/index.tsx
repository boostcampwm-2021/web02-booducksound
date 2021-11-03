import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';

import Button from '../../components/atoms/Button';
import MenuInfoBox from '../../components/atoms/MenuInfoBox';
import PageBox from '../../components/atoms/PageBox';
import ProfileSelector from '../../components/atoms/ProfileSelector';
import theme from '../../styles/theme';

interface Props {
  num: number;
}

const MyPageContainer = styled.div`
  height: max-content;
  margin: auto;
  text-align: center;

  @media (max-width: 768px) {
    a > button {
      width: calc(100% - 2rem);
    }
  }

  @media (max-width: 480px) {
    a > button {
      width: 90%;
    }
  }
`;

const ProfileBtnBox = styled.div`
  text-align: right;

  @media (min-width: 768px) {
    margin-bottom: 1rem;

    > *:first-child {
      margin-right: 1rem;
    }
  }

  @media (max-width: 768px) {
    button {
      margin-bottom: 0.4rem;
    }
  }
  @media (max-width: 480px) {
    margin-bottom: 1rem;

    button {
      padding: 8px 0;
      font-size: 0.8rem;
      width: 120px;
      display: block;
      margin: 0 auto 0.4rem auto;
    }
  }
`;

const TableBtnBox = styled.div`
  > button {
    margin-bottom: 0.4rem;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${theme.colors.gray};

  > div:first-child {
    flex-grow: 0;
  }

  > div:last-child {
    flex-grow: 1;
  }

  @media (max-width: 480px) {
    display: block;
  }
`;

const UserInfoBox = styled.div`
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  padding: 0 2rem;
  margin-bottom: 2.4rem;

  .user-name {
    font-size: 1.2rem;
    line-height: 2rem;
  }

  .user-id {
    color: ${theme.colors.gray};
  }
`;

const PlayListTable = styled.table`
  margin: 0;

  > li {
    .play-title {
      font-weight: 600;
      font-size: 1.2rem;
    }
  }

  tr {
    &:not(:last-child) {
      border-bottom: 1px solid ${theme.colors.gray};
    }

    &:hover {
      background-color: ${theme.colors.lightsky};
    }

    > td {
      vertical-align: middle;
      padding: 0.5rem 1rem;
    }
  }
`;

const PlayTitle = styled.h4`
  text-align: left;
  font-size: 1.2rem;
`;

const BoxTitle = styled.h2<Props>`
  text-align: left;
  font-size: 1.3rem;
  margin: 2.8rem 0 2rem 0;

  &::after {
    content: '총 ${({ num }) => num}개';
    letter-spacing: 1px;
    font-size: 0.95rem;
    display: inline-block;
    margin-left: 1rem;
    color: ${theme.colors.ocean};
  }
`;

const MyPage: NextPage = () => {
  return (
    <>
      <MenuInfoBox name="마이페이지" />
      <PageBox>
        <MyPageContainer>
          <ProfileBox>
            <UserInfoBox>
              <ProfileSelector type="mypage"></ProfileSelector>
              <UserInfo>
                <p className="user-name">부덕부덕</p>
                <p className="user-id">sap03110</p>
              </UserInfo>
            </UserInfoBox>
            <ProfileBtnBox>
              <Button
                content={'비밀번호 변경'}
                background={theme.colors.lime}
                fontSize={'16px'}
                paddingH={'16px'}
                width={'160px'}
              ></Button>
              <Button
                content={'로그아웃'}
                background={theme.colors.lightsky}
                fontSize={'16px'}
                paddingH={'16px'}
                width={'160px'}
              ></Button>
            </ProfileBtnBox>
          </ProfileBox>
          <div>
            <BoxTitle num={5}>내가 작성한 플레이리스트</BoxTitle>
          </div>
          <PlayListTable>
            <colgroup>
              <col width="100%" />
              <col width="*" />
            </colgroup>
            <tbody>
              {Array(5)
                .fill(null)
                .map((_, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <PlayTitle>플레이리스트 {i + 1}</PlayTitle>
                      </td>
                      <td>
                        <TableBtnBox>
                          <Button
                            content={'수정'}
                            background={theme.colors.sky}
                            fontSize={'14px'}
                            paddingH={'8px'}
                            width={'100px'}
                          ></Button>
                          <Button
                            content={'삭제'}
                            background={theme.colors.peach}
                            fontSize={'14px'}
                            paddingH={'8px'}
                            width={'100px'}
                          ></Button>
                        </TableBtnBox>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </PlayListTable>
        </MyPageContainer>
      </PageBox>
    </>
  );
};

export default MyPage;
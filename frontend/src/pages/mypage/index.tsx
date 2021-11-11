import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '~/actions/user';
import { deleteLikes } from '~/api/user';
import MenuInfoBox from '~/atoms/MenuInfoBox';
import PageBox from '~/atoms/PageBox';
import Modal from '~/molecules/Modal';
import MyPageContainer from '~/organisms/MyPageContainer';
import { RootState } from '~/reducers/index';
import { UserState } from '~/reducers/user';

const AlertMsg = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin: 1.5rem 0;
`;

const MyPage: NextPage = () => {
  const [removeModalOnOff, setRemoveModalOnOff] = useState(false);
  const [oid, selectOid] = useState('');
  const dispatch = useDispatch();

  const userInfo: UserState = useSelector((state: RootState) => state.user);
  const { id, likes, myPlaylist } = userInfo || {};

  const openRemoveModal = ({ target }: any) => {
    const { id } = target?.parentElement?.closest('tr').dataset;
    setRemoveModalOnOff(true);
    selectOid(id);
    dispatch(getUser());
  };

  const deleteLikesList = async (id: string, oid: string) => {
    await deleteLikes(id, oid);
    dispatch(getUser());
  };

  useEffect(() => {
    setRemoveModalOnOff(false);
  }, [likes, myPlaylist]);

  return (
    <>
      <MenuInfoBox name="마이페이지" />
      <PageBox>
        <MyPageContainer openRemoveModal={openRemoveModal} />
      </PageBox>
      {removeModalOnOff && (
        <Modal
          leftButtonHandler={(e) => deleteLikesList(id, oid)}
          rightButtonHandler={() => setRemoveModalOnOff(false)}
          leftButtonText="YES"
          rightButtonText="NO"
          height="150px"
        >
          <AlertMsg>정말 삭제하시겠습니까?</AlertMsg>
        </Modal>
      )}
    </>
  );
};

export default MyPage;

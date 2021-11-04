import { ChangeEventHandler, PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import InputSection from '../../../components/molecules/InputSection';

interface Props {
  setTitle: ChangeEventHandler;
  setDescription: ChangeEventHandler;
  setHashTag: ChangeEventHandler;
  title: string;
  description: string;
  hashTag: string;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  @media (max-width: 1200px) {
    & > div > :last-child {
      height: 40px;
      padding-left: 30px;
    }
  }
  @media (max-width: 768px) {
    & > div > :last-child {
      height: 40px;
      padding-left: 20px;
    }
  }
  @media (max-width: 480px) {
    & > div > :last-child {
      height: 35px;
      padding-left: 10px;
    }
  }
`;

const CreatePlaylistInputBox = ({
  setTitle,
  setDescription,
  setHashTag,
  title,
  description,
  hashTag,
}: PropsWithChildren<Props>) => {
  return (
    <InputContainer>
      <InputSection
        id={'playlist-title'}
        title={'플레이리스트 제목'}
        titleSize={'1em'}
        isSearch={false}
        placeholder={'플레이리스트 제목을 입력해주세요'}
        width={'100%'}
        height={'3em'}
        fontSize={'0.85em'}
        margin={'0.6em'}
        paddingW={'40px'}
        value={title}
        onChangeHandler={setTitle}
      ></InputSection>
      <InputSection
        id={'playlist-title'}
        title={'플레이리스트 설명'}
        titleSize={'1em'}
        isSearch={false}
        placeholder={'플레이리스트 설명을 입력해주세요'}
        width={'100%'}
        height={'3em'}
        fontSize={'0.85em'}
        margin={'0.6em'}
        paddingW={'40px'}
        value={description}
        onChangeHandler={setDescription}
      ></InputSection>
      <InputSection
        id={'playlist-title'}
        title={'플레이리스트 해시태그'}
        titleSize={'1em'}
        isSearch={false}
        placeholder={'추가할 해시태그를 입력 후 Enter를 클릭하세요'}
        width={'100%'}
        height={'3em'}
        fontSize={'0.85em'}
        margin={'0.6em'}
        paddingW={'40px'}
        value={hashTag}
        onChangeHandler={setHashTag}
      ></InputSection>
    </InputContainer>
  );
};

export default CreatePlaylistInputBox;

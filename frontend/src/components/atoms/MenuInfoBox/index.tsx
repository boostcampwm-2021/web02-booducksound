import styled from '@emotion/styled';

interface Props {
  content: string;
}

const MenuInfo = styled.h4`
  font-weight: 600;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  font-size: 1.25rem;
  padding-left: 2rem;
`;

const BackBtn = styled.a`
  top: -1px;
  left: 0;
  position: absolute;
  width: 18px;
  height: 1.25rem;
  display: inline-block;
  margin-right: 0.8rem;
  cursor: pointer;
  background: url(images/ic_prev.png) no-repeat center/20px;
`;

const handleBack = () => {
  history.back();
};

const MenuInfoBox = ({ content }: Props) => {
  return (
    <MenuInfo>
      <BackBtn onClick={handleBack} />
      {content}
    </MenuInfo>
  );
};

export default MenuInfoBox;

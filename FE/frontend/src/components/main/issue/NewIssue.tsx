import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Paperclip } from '../../../icons/paperclip.svg';
import { ReactComponent as XSquare } from '../../../icons/xSquare.svg';
import Typos from '../../../styles/atoms/Typos';
import User from '../../../styles/atoms/User';
import Buttons from '../../../styles/atoms/Buttons';
import { Link } from 'react-router-dom';

const AddIssue = () => {
  const [inputCount, setInputCount] = useState(0);
  let debounceTimeoutId: ReturnType<typeof setTimeout>;

  const countInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value.length;
    setInputCount(newValue);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    clearTimeout(debounceTimeoutId);
    debounceTimeoutId = setTimeout(() => countInput(e), 2000);
  };

  return (
    <AddIssueWrapper>
      <TopWrapper>
        <Title>새로운 이슈 작성</Title>
      </TopWrapper>
      <Line />
      <MainWrapper>
        <User />
        <InputWrapper>
          <TitleInput placeholder="제목"></TitleInput>
          <CommentInput
            onChange={onChange}
            placeholder="코멘트를 입력하세요"></CommentInput>
          <Count xs>띄어쓰기 포함 {inputCount}자</Count>
          <FileSection>
            <input type="file" id="BtnBrowseHidden" hidden />
            <LabelWrapper htmlFor="BtnBrowseHidden">
              <Paperclip />
              <Typos sm>파일을 추가하세요</Typos>
            </LabelWrapper>
          </FileSection>
        </InputWrapper>
        <Assignees></Assignees>
      </MainWrapper>
      <Line />
      <BottomWrapper>
        <CancelButtonWrapper to={`/main`}>
          <Typos sm>
            <XSquare />
            작성 취소
          </Typos>
        </CancelButtonWrapper>
        <Buttons disabled medium>
          완료
        </Buttons>
      </BottomWrapper>
    </AddIssueWrapper>
  );
};

const AddIssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopWrapper = styled.div`
  padding: 0px 48px;
`;

const Title = styled.div`
  font-size: 32px;
  line-height: 48px;
  color: ${props => props.theme.greyscale.titleActive};
`;

const Line = styled.div`
  height: 1px;
  margin-top: 32px;
  margin: 24px 48px;
  background: ${props => props.theme.greyscale.line};
`;

const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  & > div {
    margin: 0 12px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 880px;
  font-size: 16px;
`;

const TitleInput = styled.input`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0px 24px;
  margin-bottom: 16px;
  width: 880px;
  height: 56px;
  font-size: 16px;
  background: ${props => props.theme.greyscale.inputBackground};
  border-radius: 14px;
`;

const CommentInput = styled.textarea`
  display: flex;
  align-items: flex-start;
  width: 880px;
  height: 291px;
  padding: 24px 24px;
  font-size: 16px;
  background: ${props => props.theme.greyscale.inputBackground};
  border-radius: 16px 16px 0 0;
  resize: none;
`;

const Count = styled(Typos)`
  position: absolute;
  right: 20px;
  bottom: 60px;
`;

const FileSection = styled.div`
  display: flex;
  align-items: center;
  width: 880px;
  height: 52px;
  border-radius: 0 0 16px 16px;
  padding: 10px;
  background: ${props => props.theme.greyscale.inputBackground};
  div {
    padding-left: 5px;
  }
`;

const LabelWrapper = styled.label`
  display: flex;
`;

const Assignees = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px;
  width: 308px;
  background: ${props => props.theme.greyscale.offWhite};
  border-radius: 16px 16px 0px 0px;
  margin: 1px 0px;
`;

const BottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px 60px;
  svg {
    stroke: ${props => props.theme.greyscale.label};
  }
`;

const CancelButtonWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
  & > div {
    padding: 0 24px;
  }
`;

export default AddIssue;
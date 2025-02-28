import MyInfo from '@/assets/images/myInfo.svg?react';
import { useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

interface ReviewIncludeProps {
  handleIncludeText: (text: string) => void;
  handlePostAnswer: () => void;
}

// 5.2 포함 문구 입력
const ReviewInclude = ({
  handleIncludeText,
  handlePostAnswer,
}: ReviewIncludeProps) => {
  const [textCount, setTextCount] = useState(0);
  const [includeText, setIncludeText] = useState('');

  const handleAnswer = () => {
    handleIncludeText(includeText);
    handlePostAnswer();
  };

  return (
    <Container>
      <My>
        <MyInfo />
      </My>

      <TitleWrapper>
        <Title>
          꼭 넣고 싶은
          <br />
          내용이 있나요?
        </Title>
        <TitleDetail>(선택사항)</TitleDetail>
      </TitleWrapper>

      <IncludeWrapper>
        <Include
          placeholder='포함하고 싶은 내용을 이모티콘 없이 작성해주세요.'
          value={includeText}
          maxLength={100}
          onChange={(e) => {
            setTextCount(e.target.value.length);
            setIncludeText(e.target.value);
          }}
        />
        <IncludeCount>{textCount}/100</IncludeCount>
      </IncludeWrapper>

      <ExamWrapper>
        <ExamTitle>예시 문구</ExamTitle>
        <Exam>
          “요즘 날씨가 춥고 길이 미끄러워서 배달이 어려울 때가 많은데, 무사히 잘
          도착했다니 다행입니다.”
        </Exam>
        <Exam>
          “저희는 당뇨식은 맛이 없다는 편견을 깨고 싶었어요! 건강도 챙기면서
          맛있게 드셨다면 정말 뿌듯합니다! "
        </Exam>
        <Exam>
          “저희 가게 모든 메뉴는 제 손을 거쳐 갑니다. 한 그릇 한 그릇 정성 들여
          만들고 있으니, 자주 찾아주세요!”
        </Exam>
      </ExamWrapper>

      <Before to='/review'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='11'
          height='19'
          viewBox='0 0 11 19'
          fill='none'
        >
          <path d='M10.3 1L2 9.3L10.3 17.6' stroke='#73797F' stroke-width='2' />
        </svg>
        <div>이전으로</div>
      </Before>

      <ButtonBottom onClick={handleAnswer}>리대리 답변 확인하기</ButtonBottom>
    </Container>
  );
};

export default ReviewInclude;

const Container = styled.div`
  position: relative;
  padding: 68px 28px 0px 28px;
`;

const My = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 25px;
  top: 25px;
`;

const TitleWrapper = styled.label`
  display: flex;
  gap: 6px;
  align-items: flex-end;
`;

const TitleDetail = styled.label`
  color: ${({ theme }) => theme.colors['gray-800']};
  font-family: 'GmarketSansMedium';
  font-size: 16px;
  font-weight: 400;
  line-height: 157%;
`;

const Title = styled.label`
  color: ${({ theme }) => theme.colors['gray-800']};
  font-family: 'GmarketSansMedium';
  font-size: 25px;
  font-weight: 400;
  line-height: 135%;
`;

const IncludeWrapper = styled.div`
  margin-top: 18px;
  margin-bottom: 41px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Include = styled.textarea`
  display: flex;
  width: 100%;
  height: 128px;
  padding: 12px 17px;
  resize: none;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors['neutral-300']};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors['neutral-500']};
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 162%;

  &::placeholder {
    color: ${({ theme }) => theme.colors['gray-500']};
    font-family: 'Pretendard Variable';
    font-size: 14px;
    font-weight: 500;
    line-height: 162%;
  }

  &:focus {
    outline: none;
  }
`;

const IncludeCount = styled.label`
  color: ${({ theme }) => theme.colors['gray-600']};
  font-family: 'Pretendard Variable';
  font-size: 14px;
  font-weight: 500;
  line-height: 26px;
`;

const ExamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 55px;
`;

const ExamTitle = styled.label`
  color: ${({ theme }) => theme.colors['gray-600']};
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 599;
  line-height: 26px;
`;

const Exam = styled.label`
  height: 67px;
  padding: 12px 16px;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors['gray-500']};

  color: ${({ theme }) => theme.colors['gray-600']};
  font-family: 'Pretendard Variable';
  font-size: 13px;
  font-weight: 500;
  line-height: 22px;
`;

const Before = styled(Link)`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;

  div {
    color: ${({ theme }) => theme.colors['gray-700']};
    font-family: 'Pretendard Variable';
    font-size: 15px;
    font-weight: 599;
    line-height: 28px;
  }
`;

const ButtonBottom = styled.button`
  margin-top: 8px;
  margin-bottom: 52px;

  display: flex;
  width: 100%;
  height: 52px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors['primary-500']};

  color: ${({ theme }) => theme.colors.white};
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 599;
`;

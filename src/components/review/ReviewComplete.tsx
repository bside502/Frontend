import styled from 'styled-components';
import MyInfo from '@/assets/images/myInfo.svg?react';
import ArrowDown from '@/assets/images/arrowDown.svg?react';
import CopyIcon from '@/assets/images/copy.svg?react';
import Tooltip from '@/assets/images/tooltip.png';
import Star from './Star';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';
import Account from '@/pages/account/Account';

interface ReviewCompleteProps {
  patchReview: (logIdx: number) => void;

  logIdx?: number;
  score?: number;
  generateAnswer?: string;
  reviewType?: string;
  reviewText?: string;
}

// 5.4 답변 완료 - 완료
/* eslint-disable no-console */
const ReviewComplete = ({
  patchReview,
  logIdx = 0,
  score = 0,
  generateAnswer = '',
  reviewType,
  reviewText,
}: ReviewCompleteProps) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');

  // 답변 복사하기
  const [copyText, setCopyText] = useState(generateAnswer);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      alert('답변이 클립보드에 복사되었습니다!');
    } catch (e) {
      alert('복사에 실패했습니다. 다시 시도해주세요.');
      console.log('클립보드 복사 실패: ', e);
    }
  };

  // api 연결 - 베이커리 이름 가져오기
  const baseURL = import.meta.env.VITE_APP_API_URL;
  const getName = async () => {
    // const token = localStorage.getItem('token');
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkeCI6NDIsImV4cCI6MTc0MTcwNzIwMywiaWF0IjoxNzQwODQzMjAzfQ.JWHbxheQDgu4U1BhJWALFw7ANgp6iWVxtrtbREW6bCg';
    try {
      const result = await axios.get(`${baseURL}/api/v1/user/get`, {
        headers: {
          'Content-Type': 'applicatoin/json',
          Token: token,
        },
      });
      console.log(result.data);
      setName(result.data.data.storeName);
    } catch (e) {
      console.log('가게 이름 가져오기 에러: ', e);
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <Container key={logIdx}>
      {!infoOpen && (
        <Navbar>
          <NavRight onClick={() => setInfoOpen(true)} />
        </Navbar>
      )}
      {infoOpen && <Account close={() => setInfoOpen(false)} complete={true} />}

      <TitleWrapper>
        <TitleDetail>
          <span>{name}</span>에 대한
        </TitleDetail>
        <Title>
          <span>{reviewType}</span>리뷰가 달렸어요
        </Title>
      </TitleWrapper>

      <Scores>
        {[...Array(5)].map((_, index) => (
          <Score key={index}>
            <Star filled={index < score} />
          </Score>
        ))}
      </Scores>

      <Review>{reviewText}</Review>
      <Arrow />
      <AnswerWrapper>
        <AnswerTitleWrapper>
          <AnswerTitle>
            이렇게 <span>답변해보시는 건 어떨까요?</span>
          </AnswerTitle>
          <Copy onClick={copy} />
        </AnswerTitleWrapper>
        <Answer
          value={copyText}
          onChange={(e) => setCopyText(e.target.value)}
        />
        <Rewrite onClick={() => patchReview(logIdx)}>
          원하는 답변이 아닌가요? <span>답변 재작성하기</span>
        </Rewrite>
      </AnswerWrapper>

      {!infoOpen && (
        <StickyBottomContainer style={{ background: '#2B91FF' }}>
          <Border />
          <ButtonWrapper>
            <img src={Tooltip} alt='tooltip' />
            <Button state='' onClick={() => navigate('/upload-answer')}>
              스타일 수정하기
            </Button>
            <Button
              state='black'
              onClick={() => {
                window.location.href = '/review';
              }}
            >
              다른 리뷰도 답변하기
            </Button>
          </ButtonWrapper>
        </StickyBottomContainer>
      )}
    </Container>
  );
};

export default ReviewComplete;

const Container = styled.div`
  position: relative;
  padding: 0px 28px 48px 28px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors['primary-500']};
`;

const Navbar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const NavRight = styled(MyInfo)`
  cursor: pointer;
  position: absolute;
  width: 36px;
  height: 36px;
  right: 0px;

  path {
    stroke: ${({ theme }) => theme.colors['primary-200']};
  }
  circle {
    stroke: ${({ theme }) => theme.colors['primary-200']};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const TitleDetail = styled.label`
  color: ${({ theme }) => theme.colors['primary-100']};
  font-family: 'GmarketSansMedium';
  font-size: 16px;
  font-weight: 400;
  line-height: 126%;

  span {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'GmarketSansBold';
    font-weight: 500;
  }
`;

const Title = styled.label`
  color: ${({ theme }) => theme.colors['primary-100']};
  font-family: 'GmarketSansMedium';
  font-size: 25px;
  font-weight: 400;
  line-height: 126%;

  span {
    color: ${({ theme }) => theme.colors.white};
    font-family: 'GmarketSansBold';
    font-weight: 500;
  }
`;

const Scores = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 12px;
`;

const Score = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Review = styled.label`
  display: flex;
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors['primary-300']};
  color: ${({ theme }) => theme.colors['primary-200']};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 500;
  line-height: 162%;
  min-height: 152px;
`;

const Arrow = styled(ArrowDown)`
  margin: 16px auto;
  display: flex;
  justify-content: center;
  width: 28px;
`;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 36px;
`;

const AnswerTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AnswerTitle = styled.label`
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;

  span {
    font-weight: 599;
  }
`;

const Answer = styled.textarea`
  padding: 12px 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors['primary-100']};
  border: 1px solid ${({ theme }) => theme.colors['primary-200']};
  color: ${({ theme }) => theme.colors['primary-700']};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 500;
  line-height: 162%;
  min-height: 200px;
  resize: none;
`;

const Copy = styled(CopyIcon)`
  width: 32px;
`;

const Rewrite = styled.button`
  color: ${({ theme }) => theme.colors['primary-100']};
  text-align: end;
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 500;
  line-height: 162.5%;
  text-decoration-line: underline;

  span {
    font-weight: 599;
  }
`;

const Border = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors['primary-600']};
  margin: 0px -28px;
  margin-bottom: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  position: relative;

  img {
    width: 200px;
    position: absolute;
    top: -40px;
    transform: translateX(-50%);
    left: 100px;
  }
`;

const Button = styled.button<{ state: string }>`
  display: flex;
  width: 100%;
  height: 52px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ theme, state }) =>
    state === 'black' ? theme.colors.black : theme.colors.white};

  color: ${({ theme, state }) =>
    state === 'black' ? theme.colors.white : theme.colors['primary-500']};
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 599;
`;

import styled from 'styled-components';
import MyInfo from '@/assets/images/myInfo.svg?react';
import ArrowLeft from '@/assets/images/arrow-left.svg?react';
import ArrowDown from '@/assets/images/arrowDown.svg?react';
import CopyIcon from '@/assets/images/copy.svg?react';
import Tooltip from '@/assets/images/tooltip.png';
import Star from './Star';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { StickyBottomContainer } from '@/components/stickyBottomContainer/stickyBottomContainer';
import Account from '@/pages/account/Account';
import { getUser } from '@/services/user';
import { User } from '@/types/user';
import Toast from '@/components/toast/toast';

interface ReviewCompleteProps {
  //   patchReview: (logIdx: number) => void;
  logIdx?: number;
  score?: number;
  baseAnswer?: string;
  generateAnswer?: string;
  reviewType?: string;
  reviewText?: string;
}

// 5.4 답변 완료 - 완료

const ReviewCompleteClick = ({
  //   patchReview,
  logIdx = 0,
  score = 0,
  baseAnswer = '',
  generateAnswer = '',
  reviewType,
  reviewText,
}: ReviewCompleteProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [infoOpen, setInfoOpen] = useState(false);
  const [toggle, setToggle] = useState(true);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  // 답변 복사하기
  const [copyText, setCopyText] = useState(generateAnswer);
  const [toastStatus, setToastStatus] = useState({
    isOpen: false,
    message: '',
  });
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setToastStatus({
        isOpen: true,
        message: '복사되었습니다.',
      });
    } catch {
      setToastStatus({
        isOpen: true,
        message: '복사를 실패했습니다.',
      });
    }
  };

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setUser(user);
    })();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {infoOpen && <Account close={() => setInfoOpen(false)} />}
      {!infoOpen && (
        <Container key={logIdx}>
          <Navbar>
            <NavLeft
              onClick={() => (window.location.href = 'review-history')}
            />
            <NavCenter>리뷰 자세히 보기</NavCenter>
            <NavRight onClick={() => setInfoOpen(true)} />
          </Navbar>

          <TitleWrapper>
            <TitleDetail>
              <span>{user?.storeName}</span>에 대한
            </TitleDetail>
            <Title color={reviewType || ''}>
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

          <Review disabled={true}>{reviewText}</Review>
          <Arrow />
          <AnswerWrapper>
            <AnswerTitleWrapper>
              <AnswerTitle>
                이렇게 <span>답변해보시는 건 어떨까요?</span>
              </AnswerTitle>
              <div className='wrapper'>
                <div className='left'>
                  <label>말투적용</label>
                  <ToggleContainer onClick={handleToggle}>
                    <Toggle checked={toggle} />
                  </ToggleContainer>
                </div>
                <Copy onClick={copy} />
              </div>
            </AnswerTitleWrapper>
            <Answer
              value={toggle ? copyText : baseAnswer}
              onChange={(e) => setCopyText(e.target.value)}
              disabled={toggle ? false : true}
            />
            {/* <Rewrite onClick={() => patchReview(logIdx)}>
              원하는 답변이 아닌가요? <span>답변 재작성하기</span>
            </Rewrite> */}
          </AnswerWrapper>

          <StickyBottomContainer style={{ background: '#F3F7FA' }}>
            {/* <Border /> */}
            <ButtonWrapper>
              <img src={Tooltip} alt='tooltip' />
              <Button
                state=''
                onClick={() => {
                  navigate('/upload-answer');
                  window.scrollTo(0, 0);
                }}
              >
                스타일 수정하기
              </Button>
              <Button
                state='black'
                onClick={() => (window.location.href = '/review')}
              >
                다른 리뷰도 답변하기
              </Button>
            </ButtonWrapper>
          </StickyBottomContainer>

          <Toast
            isOpen={toastStatus.isOpen}
            onClose={() => setToastStatus({ isOpen: false, message: '' })}
            message={toastStatus.message}
          />
        </Container>
      )}
    </>
  );
};

export default ReviewCompleteClick;

const Container = styled.div`
  position: relative;
  padding: 0px 28px 20px 28px;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors['gray-100']};
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const NavLeft = styled(ArrowLeft)`
  cursor: pointer;
  position: absolute;
  left: 0px;
  svg {
    height: 100%;
  }
  path {
    stroke: ${({ theme }) => theme.colors['gray-600']};
  }
`;

const NavCenter = styled.div`
  text-align: center;
  font-family: 'GmarketSansMedium';
  font-size: 20px;
  font-weight: 400;
  line-height: 133%;
`;

const NavRight = styled(MyInfo)`
  cursor: pointer;
  position: absolute;
  width: 36px;
  height: 36px;
  right: 0px;

  path {
    stroke: ${({ theme }) => theme.colors['gray-600']};
  }
  circle {
    stroke: ${({ theme }) => theme.colors['gray-600']};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const TitleDetail = styled.label`
  color: ${({ theme }) => theme.colors['gray-800']};
  font-family: 'GmarketSansMedium';
  font-size: 20px;
  font-weight: 400;
  line-height: 126%;

  span {
    font-family: 'GmarketSansBold';
    font-weight: 500;
  }
`;

const Title = styled.label<{ color: string }>`
  color: ${({ theme }) => theme.colors['gray-800']};
  font-family: 'GmarketSansMedium';
  font-size: 30px;
  font-weight: 400;
  line-height: 126%;

  span {
    color: ${({ theme, color }) => {
      switch (color) {
        case '긍정':
          return theme.colors['primary-500'];
        case '부정':
          return theme.colors['point-100'];
        case '문의':
          return theme.colors['secondary-500'];
        case '중립':
          return theme.colors['gray-600'];
        default:
          return theme.colors.white;
      }
    }};
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

const Review = styled.textarea`
  width: 100%;
  resize: none;
  display: flex;
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors['gray-300']};
  color: ${({ theme }) => theme.colors['gray-600']};
  background: ${({ theme }) => theme.colors.white};
  font-family: 'Pretendard Variable';
  font-size: 16px;
  font-weight: 500;
  line-height: 162%;
  min-height: 152px;
  outline: none;
`;

const Arrow = styled(ArrowDown)`
  margin: 12px auto;
  display: flex;
  justify-content: center;
  width: 28px;

  path {
    stroke: ${({ theme }) => theme.colors['neutral-500']};
  }
`;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 36px;
`;

const AnswerTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .wrapper {
    display: flex;
    justify-content: space-between;
  }

  .left {
    display: flex;
    gap: 4px;
    align-items: center;

    label {
      color: ${({ theme }) => theme.colors['neutral-400']};
      font-family: 'Pretendard Variable';
      font-size: 13px;
      font-weight: 500;
      line-height: 162.5%;
      letter-spacing: -0.32px;
    }
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-itmes: center;
  position: relative;
  cursor: pointer;
  width: 36px;
  height: 18px;
`;

const Toggle = styled.div<{ checked: boolean }>`
  position: absolute;
  top: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors['primary-500'] : theme.colors['gray-300']};

  border-radius: 20px;
  transition: background-color 0.5s;

  &::before {
    position: absolute;
    content: '';
    height: 14px;
    width: 14px;
    left: 2px;
    bottom: 2px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
    transition: transform 0.5s;
    transform: ${({ checked }) =>
      checked ? 'translateX(18px)' : 'translateX(0)'};
  }
`;

const AnswerTitle = styled.label`
  color: ${({ theme }) => theme.colors['primary-700']};
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
  outline: none;
`;

const Copy = styled(CopyIcon)`
  width: 32px;
`;

// const Rewrite = styled.button`
// color: ${({ theme }) => theme.colors['neutral-400']};
//   text-align: end;
//   font-family: 'Pretendard Variable';
//   font-size: 14px;
//   font-weight: 500;
//   line-height: 162.5%;
//   text-decoration-line: underline;

//   span {
//     font-weight: 599;
//   }
// `;

// const Border = styled.div`
//   height: 1px;
//   background: ${({ theme }) => theme.colors['primary-600']};
//   margin: 0px -28px;
//   margin-bottom: 12px;
// `;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  position: relative;
  margin-top: 12px;

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
    state === 'black' ? theme.colors.white : theme.colors['neutral-600']};
  font-family: 'Pretendard Variable';
  font-size: 15px;
  font-weight: 599;
`;

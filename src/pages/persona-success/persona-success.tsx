import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import MainContainer from '@/components/mainContainer/mainContainer';
import PersonaSuccessImg from '@/assets/images/persona-type-1.png';
import CopyIcon from '@/assets/images/copy.svg?react';
import Button from '@/components/button/Button';
import Tooltip from '@/assets/images/tooltip.png';
import { updateAllAnswer } from '@/services/persona';

// TODO: UI 점검 및 navigate 추가
// TODO: API 연동 추가
export default function PersonaSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { allAnswer, emotionSelect, lengthSelect, personaSelect, idx } = state;
  const [updatedAllAnswer, setUpdatedAllAnswer] = useState(allAnswer);

  const onClickCopyAnswerBtn = async () => {
    try {
      await navigator.clipboard.writeText(updatedAllAnswer);
      alert('복사되었습니다.');
      // TODO 토스트 추가 예정
    } catch {
      alert('복사를 실패했습니다.');
    }
  };

  const onClickUpdateAllAnswer = async () => {
    try {
      await updateAllAnswer({
        allAnswer: updatedAllAnswer,
        personaIdx: idx,
      });
      // console.log(response);
    } catch {
      // TODO: 변경 예정
      // console.error(err)
      alert('에러 발생!');
    }
  };

  useEffect(() => {
    if (!state) {
      navigate('/persona');
      return;
    }
  }, []);

  return (
    <Container>
      <Title>
        <p>
          <strong>웨일즈 베이커리 </strong>
          사장님은
        </p>
        <div>
          <img src={PersonaSuccessImg} alt='persona-success' />
          <p>
            당신은 <strong>{emotionSelect}</strong>
          </p>
          <p>
            <strong>{lengthSelect}</strong>을 선호하는
          </p>
          <p>
            <strong>{personaSelect}</strong> 스타일이군요!
          </p>
        </div>
      </Title>

      <Content>
        <div className='content-title'>
          <div>
            <p>사장님을 위해 어떤 상황에서도 사용 가능한</p>
            <p>
              <strong>나만의 만능 답변</strong>을 준비했어요!
            </p>
          </div>

          <button onClick={onClickCopyAnswerBtn}>
            <CopyIcon />
          </button>
        </div>

        <div className='copy-answer'>
          <textarea
            defaultValue={allAnswer}
            onChange={(e) => setUpdatedAllAnswer(e.target.value)}
          />
        </div>

        <div className='save-answer'>
          <span>만능 답변을 수정해서 알맞게 만들어보세요!</span>
          {updatedAllAnswer !== allAnswer && (
            <SaveButton onClick={onClickUpdateAllAnswer}>
              만능답변 저장하기
            </SaveButton>
          )}
        </div>
      </Content>

      <ButtonContainer>
        <img src={Tooltip} alt='tooltip' />
        <WhiteButton
          shadow
          colorScheme='white'
          onClick={() => navigate('/persona')}
          role='link'
        >
          스타일 수정하기
        </WhiteButton>
        <BlackButton
          shadow
          onClick={() => navigate('/upload-review')}
          role='link'
        >
          리뷰에 답하러 가기
        </BlackButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled(MainContainer)`
  background: ${({ theme }) => theme.colors['primary-500']};
  padding: 40px 28px 0 28px;
  min-height: 100vh;
`;

const Title = styled.section`
  color: ${({ theme }) => theme.colors['white']};
  font-size: 22px;
  font-family: GmarketSansMedium;
  strong {
    font-family: GmarketSansBold;
    font-weight: 599;
  }
  div {
    img {
      width: 100%;
    }
    box-shadow: 0px 4px 10px 0px ${({ theme }) => theme.colors['primary-600']};
    font-family: 'Pretendard Variable';
    padding: 20px;
    border-radius: 12px;
    color: ${({ theme }) => theme.colors['gray-800']};
    margin-top: 8px;
    background: ${({ theme }) => theme.colors['white']};
    width: 100%;
    font-size: 14px;
    strong {
      font-weight: 100;
    }
  }
`;

const Content = styled.section`
  color: ${({ theme }) => theme.colors['white']};
  font-size: 16px;
  margin-top: 20px;

  textarea {
    height: 200px;
    border: none;
    width: 100%;
    outline: none;
    font-family: 'Pretendard Variable';
    font-size: 15px;
    border-radius: 12px;
    padding: 12px 16px;
    background: ${({ theme }) => theme.colors['primary-100']};
    color: ${({ theme }) => theme.colors['primary-700']};
  }

  .content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
    svg {
      border-radius: 6px;
    }
    strong {
      font-weight: 599;
    }
  }

  .copy-answer {
    position: relative;
    margin-top: 6px;
    button {
      position: absolute;
      right: 12px;
      top: 4px;
    }
  }

  .save-answer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: ${({ theme }) => theme.colors['primary-200']};
  }
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  gap: 12px;
  position: sticky;
  bottom: 12px;

  img {
    width: 200px;
    position: absolute;
    top: -40px;
    transform: translateX(-50%);
    left: 100px;
  }
`;

const WhiteButton = styled(Button)`
  color: ${({ theme }) => theme.colors['primary-500']};
  position: sticky;
  bottom: 12px;
`;

const BlackButton = styled(Button)`
  background: ${({ theme }) => theme.colors['gray-900']};
  color: ${({ theme }) => theme.colors['white']};

  position: sticky;
  bottom: 12px;
`;

const SaveButton = styled.button`
  background: ${({ theme }) => theme.colors['primary-200']};
  color: ${({ theme }) => theme.colors['primary-600']};
  font-size: 12px;
  font-family: 'Pretendard Variable';
  padding: 6px 8px;
  border-radius: 8px;
`;

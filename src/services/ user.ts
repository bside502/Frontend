import axios from 'axios';

const BASE_URL = 'http://api.redaeri.kro.kr/api/v1';

export const getNaverUser = async (code: string, state: string) => {
  const response = await axios.post(`${BASE_URL}/naver/callback`, {
    code,
    state,
  });
  return response.data;
};

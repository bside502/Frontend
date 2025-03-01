import { fetcher } from './request';
import { PersonaSuccess } from '@/types/persona';

export const getPersona = async () => {
  return fetcher('/persona/get');
};

export const createPersona = async ({
  emotionSelect,
  lengthSelect,
  personaSelect,
}: {
  emotionSelect: string;
  lengthSelect: string;
  personaSelect: string;
}) => {
  return fetcher<PersonaSuccess>('/persona/insert', {
    method: 'POST',
    data: {
      emotionSelect,
      lengthSelect,
      personaSelect,
    },
  });
};

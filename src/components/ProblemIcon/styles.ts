import { View } from 'react-native';
import styled from 'styled-components/native'

export type BackgroundColorProps = 'BROWN' | 'BLACK' | 'GREEN' | 'YELLOW'

type Props = {
  backgroundColor: BackgroundColorProps
}

export const Container = styled(View)<Props>`
  flex: 1;

  max-width: 30px;
  min-width: 30px;
  height: 30px;

  border-radius: 999px;

  background-color: ${({ backgroundColor }) => backgroundColor === 'BROWN' && '#5C2E0D' || backgroundColor === 'BLACK' && '#302E2C' || backgroundColor === 'GREEN' && '#23BC15' || backgroundColor === 'YELLOW' && '#FFAB33' } ;

  justify-content: center;
  align-items: center;
`;
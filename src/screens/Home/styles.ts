import styled from 'styled-components/native'
import MapView, { Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

export const Container = styled.View`
  position: relative;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export const CenterButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  height: 40px;
  width: 40px;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_5};

  border-radius: 999px;
  
  position: absolute;
  left: 16px;
  bottom: 76px;
`;

export const CenterIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_100,
  size: 30,
}))``;
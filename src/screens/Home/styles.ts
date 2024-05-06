import styled, { css } from 'styled-components/native'
import MapView from 'react-native-maps';
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

export const FilterButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  height: 40px;
  width: 40px;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_5};

  border-radius: 999px;

  position: absolute;
  right: 16px;
  bottom: 76px;
`;

export const CenterIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_100,
  size: 30,
}))``;

export const FilterIcon = styled(MaterialIcons).attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_100,
  size: 30,
}))``;

export const FilterMenu = styled.View`
  width: 117px;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_5};

  align-items: center;
  padding: 6px;
`;

export const FilterMenuItem = styled.TouchableOpacity`
  width: 100%;

  flex-direction: row;
  align-items: center;

  gap: 11px;
`;

export const FilterMenuIcon = styled.Image`
  
`;

export const FilterMenuText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.SMALL_TEXT_2};
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;
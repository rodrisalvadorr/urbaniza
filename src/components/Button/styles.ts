import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonStyleProps = 'PRIMARY' | 'SECONDARY' | 'TERTIARY'

type ButtonStyle = {
  type: ButtonStyleProps
}

export const Container = styled(TouchableOpacity)<ButtonStyle>`
  width: 100%;
  height: 48px;

  justify-content: center;
  align-items: center;

  border-radius: 10px;

  background-color: ${({ theme, type }) => (
    type === 'PRIMARY' && theme.COLORS.SECONDARY_3 || 
    type === 'SECONDARY' && theme.COLORS.PRIMARY_5 ||
    type === 'TERTIARY' && 'transparent'
  )};
`;

export const Title = styled(Text)<ButtonStyle>`
  ${({ theme, type}) => css`
    color: ${ type === 'PRIMARY' ? theme.COLORS.SECONDARY_5 : theme.COLORS.SECONDARY_3 };
    font-size: ${theme.FONT_SIZE.BODY}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;

export const Loading = styled(ActivityIndicator).attrs(({ theme }) => ({
  color: theme.COLORS.SECONDARY_5,
  size: 18
}))``;
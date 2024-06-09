import styled, { css } from "styled-components/native";

export const Container = styled.TextInput`
  flex: 1;

  min-height: 37px;
  background-color: ${({ theme}) => theme.COLORS.PRIMARY_5};

  border-radius: 12px;

  padding: 9px 15px;

  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.BODY}px;
    font-weight: ${theme.FONT_WEIGHT.REGULAR};
  `};
`;
import styled, { css } from "styled-components/native";

export type HeaderStyleProps = {
  title?: string
  backgroundColor?: string
}

export const Container = styled.View`
  width: 100%;
  height: 72px;
  
  background-color: ${({ theme }) => theme.COLORS.PRIMARY_4};

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  flex: 1;

  ${({ theme }) => css`
    color: ${theme.COLORS.TEXT};
    font-size: ${theme.FONT_SIZE.TITLE_4}px;
    font-weight: ${theme.FONT_WEIGHT.BOLD};
  `}; 
  
`;
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_1};

  padding: 0 46px;

  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image``;

export const Form = styled.View`
  height: 94px;
  margin: 130px 0;

  gap: 20px;
`;

export const Buttons = styled.View`
  gap: 8px;

  width: 258px;
`;
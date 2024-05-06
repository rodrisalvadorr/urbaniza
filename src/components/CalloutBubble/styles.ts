import styled from 'styled-components/native'

export const Container = styled.View`
  width: 157px;
  height: 104px;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_4};
  
  border-color: ${({ theme }) => theme.COLORS.PRIMARY_3};
  border-width: 3px;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
`;

export const Address = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};

  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL_TEXT_1}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};

  margin-bottom: 5px;

  text-align: center;
`; 

export const City = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};

  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL_TEXT_2}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};

  margin-bottom: 14px;
`;

export const ButtonView = styled.TouchableOpacity`
  width: 116px;
  height: 24px;

  background-color: ${({ theme }) => theme.COLORS.PRIMARY_1};

  border-radius: 10px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.COLORS.SECONDARY_3};

  font-size: ${({ theme }) => theme.FONT_SIZE.SMALL_TEXT_1}px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.REGULAR};
`;
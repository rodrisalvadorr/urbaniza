import { useTheme } from 'styled-components/native';
import { Container } from './styles';
import { TextInputProps } from 'react-native';

type Props = TextInputProps;

export function Input({ ...rest }: Props) {
	const theme = useTheme();

	return (
		<Container
			{...rest}
			placeholderTextColor={theme.COLORS.GRAY_400}
		/>
	);
}

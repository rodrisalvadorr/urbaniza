import { TouchableOpacityProps } from 'react-native';
import { ButtonStyleProps, Container, Loading, Title } from './styles';

type Props = TouchableOpacityProps & {
	type?: ButtonStyleProps;
	title: string;
	loading?: boolean;
};

export function Button({
	title,
	type = 'PRIMARY',
	loading = false,
	...rest
}: Props) {
	return (
		<Container
			type={type}
			{...rest}
		>
			<Title type={type}>{!loading ? title : <Loading />}</Title>
		</Container>
	);
}

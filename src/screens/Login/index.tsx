import { Buttons, Container, Form, Logo } from './styles';
import logo from '../../assets/urbaniza_full.png';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Alert } from 'react-native';

type LoginProps = {
	email: string;
	password: string;
};

export function Login() {
	const { logIn, loadUserData } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);

	useEffect(() => {
		loadUserData();
	}, []);

	async function handleLogin({ email, password }: LoginProps) {
		try {
			setButtonsDisabled(true);
			await logIn(email, password);
		} catch (error) {
			Alert.alert(
				'Credencias inválidas',
				'O email e/ou senha estão incorretos'
			);

			setButtonsDisabled(false);
		}
	}

	return (
		<Container>
			<Logo source={logo} />

			<Form>
				<Input
					placeholder='E-mail'
					value={email}
					onChangeText={setEmail}
					style={{ width: 200 }}
				/>
				<Input
					placeholder='Senha'
					value={password}
					onChangeText={setPassword}
					style={{ width: 200 }}
				/>
			</Form>

			<Buttons>
				<Button
					title='Entrar'
					type='PRIMARY'
					onPress={() => handleLogin({ email, password })}
					activeOpacity={0.7}
					disabled={buttonsDisabled}
					loading={buttonsDisabled}
				/>
				<Button
					title='Registrar'
					type='SECONDARY'
					activeOpacity={0.7}
					disabled={buttonsDisabled}
				/>
			</Buttons>
		</Container>
	);
}
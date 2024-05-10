import { Container, Form, FormItem, FormItemTitle, ProblemItem, ProblemItemText } from './styles';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import { Entypo } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';

type RouteParams = {
	latitude: number
	longitude: number
}

export function Publish(props: RouteParams) {
	const route = useRoute()

	// const [problem, setProblem] = useState<RouteParams>()
	// const [problem, setProblem] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	
	const theme = useTheme();

	function handleProblemSelection() {

	}

	return (
		<Container>
			<Header
				title='Publicar'
				backgroundColor
			/>

			<Form>
				<FormItem>
					<FormItemTitle>
						Confirme o Endereço
					</FormItemTitle>
					<Input />
				</FormItem>

				<FormItem>
					<FormItemTitle >
						Selecione o Problema
					</FormItemTitle>
					<ProblemItem onPress={handleProblemSelection} >
						<ProblemItemText>
							Problema
						</ProblemItemText>
						<Entypo name='chevron-down' size={20} color={theme.COLORS.GRAY_100} />
					</ProblemItem>
				</FormItem>
			</Form>
		</Container>
	);
}

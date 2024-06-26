import { ReactNode, createContext, useEffect, useState } from 'react';

import { UserDTO } from '../dtos/UserDTO';
import { api } from '../services/api';
import {
	storageAuthTokenSave,
	storageAuthTokenGet,
	storageAuthTokenRemove,
} from '../storage/storageAuthToken';
import { storageUserRemove, storageUserSave } from '../storage/storageUser';

export type AuthContextDataProps = {
	token: string | null;
	logIn: (email: string, password: string) => Promise<void>;
	logOut: () => Promise<void>;
	loadUserData: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps
);

type AuthContextProviderProps = {
	children: ReactNode;
};

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [token, setToken] = useState<string | null>(null);

	const [loadingUserInformation, setLoadingUserInformation] = useState(true);

	function tokenUpdate(token: string) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		setToken(token);
	}

	async function logIn(email: string, password: string) {
		try {
			const { data: token } = await api.post('/sessions', { email, password });

			if (token?.token) {
				await storageAuthTokenSave(token.token);

				tokenUpdate(token.token);

				const { data } = await api.get('/me');
				const { id, name, email }: UserDTO = data.user;

				await storageUserSave({ id, name, email });
			}
		} catch (error) {
			throw error;
		}
	}

	async function logOut() {
		try {
			setToken(null);

			await storageAuthTokenRemove();
			await storageUserRemove();
		} catch (error) {}
	}

	async function loadUserData() {
		try {
			const token = await storageAuthTokenGet();

			if (token) {
				tokenUpdate(token);
			}
		} catch (error) {
			throw error;
		}
	}

	useEffect(() => {
		loadUserData();
	}, []);

	useEffect(() => {
		const subscribe = api.registerInterceptTokenManager(logOut);

		return () => {
			subscribe();
		};
	}, [logOut]);
	return (
		<AuthContext.Provider
			value={{
				token,
				logIn,
				logOut,
				loadUserData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

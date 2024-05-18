import { ReactNode, createContext, useState } from 'react';

import { UserDTO } from '../dtos/UserDTO';
import { api } from '../services/api';
import {
	storageAuthTokenSave,
	storageAuthTokenGet,
	storageAuthTokenRemove,
} from '../storage/storageAuthToken';

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
	const [user, setUser] = useState<UserDTO>({} as UserDTO);
	const [token, setToken] = useState<string | null>(null);

	function tokenUpdate(token: string) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		setToken(token);
	}

	async function logIn(email: string, password: string) {
		try {
			const { data } = await api.post('/sessions', { email, password });

			if (data.token) {
				await storageAuthTokenSave(data.token);
				tokenUpdate(data.token);
			}
		} catch (error) {
			throw error;
		}
	}

	async function logOut() {
		try {
			setToken(null);
			await storageAuthTokenRemove();
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

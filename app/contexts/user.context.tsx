import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import type { User } from '~/collections/user.collection.server';

interface UserContextType {
  user: User;
}

export const UserContext = createContext<UserContextType>({
  user: {} as User,
});

export type UserProviderProps = PropsWithChildren & {
  user: User;
};

export const UserProvider = (props: UserProviderProps) => {
  const [user] = useState(props.user);

  console.log('user', user);

  return <UserContext.Provider value={{ user }}>{props.children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

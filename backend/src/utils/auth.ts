import { User } from '../entities/user.entity';

export const getSafeUser = (user: User) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...safeUser } = user;
  return safeUser;
};

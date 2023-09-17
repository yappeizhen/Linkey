import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { logout, whoami } from "../api/userAuth";
import { SESSION_STORAGE_KEYS } from "../constants/storage";

type User = {
  id: number;
  email: string;
};

type UserAuthContextProps = {
  isAuthLoading: boolean;
  token?: string;
  user?: User;
  logoutUser: () => {};
  setTokenAndFetchUser: (token: string) => Promise<void>;
};

const UserAuthContext = createContext<UserAuthContextProps | undefined>(
  undefined
);

export const useUserAuth = () => {
  const context = useContext(UserAuthContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};

export const UserAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const navigate = useNavigate();

  const setTokenAndFetchUser = useCallback(async (newToken: string) => {
    setIsAuthLoading(true);
    try {
      const data = await whoami({
        token: newToken,
      });
      setUser(data.user);
      setToken(newToken);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check for token in sessionStorage on initial load
    const token = sessionStorage.getItem(SESSION_STORAGE_KEYS.linkeyToken);
    if (token) {
      // You can use this token to fetch more user details if needed
      setToken(token);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (user && token) {
      // Save token to sessionStorage whenever it changes
      sessionStorage.setItem(SESSION_STORAGE_KEYS.linkeyToken, token);
    }
  }, [user, token]);

  useEffect(() => {
    if (!token && !user) navigate("/");
  }, [token, user, navigate]);

  useEffect(() => {
    const fetchUser = async (userToken: string) => {
      setTokenAndFetchUser(userToken);
    };
    token && fetchUser(token);
  }, [token, setTokenAndFetchUser]);

  const logoutUser = useCallback(async (): Promise<void> => {
    await logout();
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.linkeyToken);
    setToken(undefined);
    setUser(undefined);
    navigate("/");
  }, [navigate]);

  return (
    <UserAuthContext.Provider
      value={{
        isAuthLoading,
        user,
        token,
        logoutUser,
        setTokenAndFetchUser,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

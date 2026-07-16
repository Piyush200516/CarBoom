import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { User, authService } from "../services/authService";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// ─── Session hint key (NOT the token — server owns the httpOnly cookie) ───────
// We store just a boolean flag so we can skip the loading skeleton on refresh
// for logged-in users who have a valid cookie. The server is still the source
// of truth; this only prevents the guest-navbar flash.
const SESSION_HINT_KEY = "carboom_session";

// ─── Centralized logout emitter ────────────────────────────────────────────────
// api.ts needs to trigger logout when a token refresh fails, but it can't
// import AuthContext (circular dependency). We use a simple event bus instead.
const AUTH_LOGOUT_EVENT = "carboom:auth:logout";

export const emitAuthLogout = () =>
  window.dispatchEvent(new CustomEvent(AUTH_LOGOUT_EVENT));

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Initialise user from the session hint so the loading state is shorter.
  // We still verify against the server, but the navbar won't flash.
  const [user, setUser] = useState<User | null>(null);

  // Start as loading=true only when there IS a session hint (cookie might exist).
  // If there's no hint the user is definitely a guest — skip the network call.
  const hasSessionHint = !!localStorage.getItem(SESSION_HINT_KEY);
  const [isLoading, setIsLoading] = useState(hasSessionHint);

  // Prevent double-calling checkAuth in React 18 StrictMode double-invoke
  const didCheck = useRef(false);

  // ── Verify session with server ─────────────────────────────────────────────
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await authService.getMe();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        localStorage.setItem(SESSION_HINT_KEY, "1");
      } else {
        setUser(null);
        localStorage.removeItem(SESSION_HINT_KEY);
      }
    } catch {
      // Network error or 401 — user is not authenticated
      setUser(null);
      localStorage.removeItem(SESSION_HINT_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ── On mount: verify against server if a hint exists ──────────────────────
  useEffect(() => {
    if (didCheck.current) return;
    didCheck.current = true;

    if (hasSessionHint) {
      checkAuth();
    }
    // If no session hint → user is a guest, isLoading stays false.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Listen for forced-logout events from api.ts ───────────────────────────
  useEffect(() => {
    const handleForceLogout = () => {
      setUser(null);
      localStorage.removeItem(SESSION_HINT_KEY);
    };
    window.addEventListener(AUTH_LOGOUT_EVENT, handleForceLogout);
    return () =>
      window.removeEventListener(AUTH_LOGOUT_EVENT, handleForceLogout);
  }, []);

  // ── Called immediately after a successful Sign In API response ─────────────
  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem(SESSION_HINT_KEY, "1");
  }, []);

  // ── Called when user clicks Logout ────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("[Auth] Logout API error", error);
    } finally {
      setUser(null);
      localStorage.removeItem(SESSION_HINT_KEY);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

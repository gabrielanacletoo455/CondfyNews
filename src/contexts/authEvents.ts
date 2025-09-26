type LogoutListener = () => void;

let logoutHandler: LogoutListener | null = null;
let isLoggingOut = false;

export const setLogoutHandler = (fn: LogoutListener | null) => {
  logoutHandler = fn;
};

export const triggerLogout = () => {
  if (isLoggingOut) return;
  isLoggingOut = true;
  try {
    if (logoutHandler) logoutHandler();
  } finally {
    // Pequeno atraso para evitar rajada de múltiplos 401 simultâneos
    setTimeout(() => {
      isLoggingOut = false;
    }, 300);
  }
};
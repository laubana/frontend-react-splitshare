export const MAIN_ROUTES = {
  LANDING: "/",
  NOT_FOUND: "/not-found",
};

export const PUBLIC_ROUTES = {
  ROOT: `${MAIN_ROUTES.LANDING}`,
  LOGIN: `${MAIN_ROUTES.LANDING}/login`,
  REGISTER: `${MAIN_ROUTES.LANDING}/register`,
  FORGOT_PASSWORD: `${MAIN_ROUTES.LANDING}/forgot-password`,
};

export const PRIVATE_ROUTES = {};

import { jwtDecode } from "jwt-decode";
import { DateTime, Settings } from "luxon";
import { TokenFirebase } from "../interfaces/firebase.interface";

export const tokenDecode = <T>(token: string): T => {
  const createDecode: T = jwtDecode(token);
  return createDecode;
};

export const expirationTokenAuth = (token: string): boolean => {
  Settings.defaultZone = "America/Buenos_Aires";
  Settings.defaultLocale = "es";

  const { exp } = tokenDecode<TokenFirebase>(token);
  const now = DateTime.now().toMillis();

  return exp * 1000 <= now;
};

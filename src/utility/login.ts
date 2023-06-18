import supabase from "./supabaseclient";
import authState from "../store/authStore";

export const login = async (): Promise<void> => {
  const { data, error } = await supabase.auth.getSession();
  const { session } = data;
  authState.setSession(session);
}
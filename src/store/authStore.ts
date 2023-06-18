import { makeAutoObservable } from "mobx";
import { Session } from '@supabase/supabase-js';

class AuthState {
  session: Session | null = null

  constructor() {
      makeAutoObservable(this)
  }

  setSession = (newSession: Session | null) => {
    this.session = newSession;
  }
}
const authState = new AuthState();
export default authState;
import { useState } from 'react';

import authState from '../../store/authStore';
import supabase from '../../utility/supabaseclient';
import './LoginView.scss';

const LoginView = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    setCredentials({
      ...credentials,
      [id]: e.target.value
    })
  }

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });
    const { session, user } = data;
    authState.setSession(session);
    console.log(data)
  }

  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <div className="login-container">
        <input
          id="email"
          className="mt-1 mb-1"
          type="email"
          value={credentials.email}
          placeholder="Email"
          onChange={(e) => handleOnChange(e, "email")}
        ></input>
        <input
          id="password"
          className="mt-1 mb-1"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => handleOnChange(e, "password")}
        ></input>
        <button
          disabled={credentials.email === "" || credentials.password === ""}
          onClick={() => login()}
          className="primary-btn mt-1 mb-1"
        >Login</button>
        <div className="spacer"></div>
      </div>
    </div>
  )
}

export default LoginView;
import "./login.css";
const Login = () => {
  return (
    <div className="containers">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <i className="fas fa-regular fa-user"></i>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div className="input">
          <i className="fas fa-regular fa-key"></i>
          <input type="passwowrd" name="password" placeholder="Password" />
        </div>
      </div>
      <div className="forgot-password">
        Lost Password ? <span>Click Here!</span>
      </div>
      <div className="submit-containers">
        <div className="submit">Login</div>
      </div>
    </div>
  );
};

export default Login;

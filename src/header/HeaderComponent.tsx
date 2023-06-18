import SaabLogo from '../assets/saab_logo.svg';
import "./header.scss";

const HeaderComponent = () => {
  return (
    <div className="header-container">
      <img className="header-logo" src={SaabLogo} alt="Saab Logo" />
    </div>
  )
}

export default HeaderComponent;
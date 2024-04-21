import "./NavbarContainer.css"
import { useAuth } from '../../../useAuth';
import { Link, NavLink } from 'react-router-dom'



const NavbarContainer = ({ handleNavItem }) => {
    const {loggedIn} = useAuth();
        return (
            <div className="navbar-container">
                <NavLink className='navbar' style={{textDecoration: 'none' }}to={'/'}>行動情報</NavLink>
                <NavLink className='navbar' style={{textDecoration: 'none' }}to={'/games'}>綠行知測</NavLink>
                <NavLink className='navbar' style={{textDecoration: 'none' }}to={'/race'}>綠競記實</NavLink>
                <NavLink className='navbar' style={{textDecoration: 'none' , display: `${loggedIn === '' ? 'none' : 'block'}`}}to={'/rank'}>綠競山榜</NavLink>
                <NavLink className='navbar' style={{textDecoration: 'none' }}to={'/donation'}>行動募資</NavLink>
                <NavLink className='navbar' style={{textDecoration: 'none' }}to={'/aboutus'}>綠山住民</NavLink>
            </div>
        );
    }
    
export default NavbarContainer;
import "./NavbarContainer.css"

const navItems = [
    {label:'About me', active:false},
    {label:'Experience', active:false},
    {label:'Donation', active:true}
    ];

const NavbarContainer = ({ handleNavItem }) => {
    return (
        <div className="navbar-container">
            {navItems.map((item, index) => (
                <div
                    key={index}
                    className={item.active ? 'navbar-active' : 'navbar'}
                    onClick={() => handleNavItem(index)}
                >
                    {item.label}
                </div>
            ))}
        </div>
    );
}

export default NavbarContainer;
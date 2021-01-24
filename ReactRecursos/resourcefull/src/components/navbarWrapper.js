import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import Navbar from './navbar';

function NavbarWrapper({children}) {
    
    return (
        <div className="in-background">
            <Navbar/>
            { children }
        </div>
    );
}

export default NavbarWrapper;
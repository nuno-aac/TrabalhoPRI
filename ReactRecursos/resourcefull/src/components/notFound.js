import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';

function NotFound() {

    return (
        <div className="in-background in-not-found w3-jumbo">
            <div className='w3-center'>
                <img className="dt-header-logo" src="/images/logorelevo.png" alt="logo" /><br/>
                404<br/>Page not found  
            </div>  
        </div>
    );
}

export default NotFound;
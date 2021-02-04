import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
function Filter({ titulo,children }) {

    return (
        <div className='in-recursos-filter'>
                <p className='w3-xlarge'>{'> ' + titulo}</p>
                {children}
        </div>
    );
}

export default Filter;
import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { Link } from 'react-router-dom'

function timeSince(date) {
    let now = new Date()

    var seconds = Math.floor((now.getTime() - Date.parse(date)) / 1000);
    console.log(date + '||-||' + seconds)

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

function RecursoCard({recurso}) {

    return (
        <Link to={"/recurso/" + recurso._id} style={{ textDecoration: 'none', height: 'calc((82vw - 200px - 8rem) / 5)'}}>
            <div className='in-recursos-recurso'>
                <div className='in-recurso-card'>
                    <h3>{recurso.titulo.slice(0,14)}{recurso.titulo.length>14 ? '...' : ''}</h3>
                </div>
                <div className='in-recurso-card'>
                    <img src='/images/file.svg' alt='File' className='in-img-card'/>
                    by {recurso.autor}
                </div>
                <div className='in-recurso-card'>
                    {timeSince(recurso.dataRegisto)} ago
                </div>
            </div>
        </Link>
    );
}

export default RecursoCard;
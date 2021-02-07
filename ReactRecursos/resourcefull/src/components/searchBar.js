import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Searchbar() {
    let [search,setSearch] = useState('')

    let getUrl = s => {
        if (s === '') return '/recursos'
        else return ('/recursos?search=' + s)
    }

    return (
        <div className='in-navbar-searchbar'>
            <input className='in-search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Procura recursos..." />
            <Link to={getUrl(search)}>
                <img src="/images/lupa.svg" className="in-icon" alt="Lupa" />
            </Link>
        </div>
    );
}

export default Searchbar;
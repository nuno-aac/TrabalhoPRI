import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Searchbar() {
    let [search,setSearch] = useState('')

    return (
        <div className='in-navbar-searchbar'>
            <input className='in-search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Procura recursos..." />
            <Link to={'/recursos?search=' + search}>
                <img src="/images/lupa.svg" className="in-icon" alt="Lupa" />
            </Link>
        </div>
    );
}

export default Searchbar;
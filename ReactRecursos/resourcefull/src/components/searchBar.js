import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { useState } from 'react';

function Searchbar( ) {
    let [search,setSearch] = useState('')

    return (
        <div className='in-navbar-searchbar'>
            <input className='in-search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
            <img src="/images/lupa.svg" className="in-icon" alt="Lupa" />
        </div>
    );
}

export default Searchbar;
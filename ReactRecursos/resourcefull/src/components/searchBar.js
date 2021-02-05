import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { useState } from 'react';

function Searchbar( ) {
    let [search,setSearch] = useState('')

    return (
        <div className='in-navbar-searchbar w3-border'>
            <input className='in-titulo-input' value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
            <img src="/images/lupa.svg" className="in-icon" alt="Lupa" />
        </div>
    );
}

export default Searchbar;
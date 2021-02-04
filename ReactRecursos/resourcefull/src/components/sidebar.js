import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import Filter from './filter';
import { useEffect, useState } from 'react';


function Sidebar({setQueryString}) {
    let [queryObject,setQueryObject] = useState({
        types:[],
        maxYear:'',
        minYear:''
    });
    let [types,setTypes] = useState([])
    let [minYear,setMinYear] = useState('')
    let [maxYear, setMaxYear] = useState('')

    useEffect(() => {
        if(minYear.length > 0)
            setQueryObject(prevState => ({ ...prevState, minYear:minYear }))
        if (maxYear.length > 0)
            setQueryObject(prevState => ({ ...prevState, maxYear: maxYear }))
    },[minYear,maxYear])
    
    let isChecked = (eve) => {
        queryObject.types.includes()
        return true;
    }

    useEffect(() => {
        setQueryObject()
    }, [queryObject])

    return (
        <>
            <Filter titulo='Tipo'>
                <div className="w3-margin-left"><input type="checkbox" checked={false} value="Slides" /><label> Slides </label></div>
                <div className="w3-margin-left"><input type="checkbox" checked={true} value="Test" /><label> Test </label></div>
            </Filter>
            <Filter titulo='Ano'>
                <div className='in-flex-row'>
                    <input className="w3-input w3-margin-bottom dt-input" type='number' placeholder="Min..." value={minYear} onChange={(e) => setMinYear(e.target.value)} />
                    <span className='w3-large w3-margin'> - </span>
                    <input className="w3-input w3-margin-bottom dt-input" type='number' placeholder="Max..." value={maxYear} onChange={(e) => setMaxYear(e.target.value)} />
                </div>
            </Filter>
            <input className="w3-btn in-upload-submit w3-margin" type="submit" value="Filtra" />
        </>
    );
}

export default Sidebar;
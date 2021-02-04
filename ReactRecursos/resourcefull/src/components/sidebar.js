import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import Filter from './filter';
import { useEffect, useState } from 'react';


function Sidebar({setQueryString,loadFilters}) {
    let [queryObject,setQueryObject] = useState({
        types:{slides: false, teste: false},
        maxYear:'',
        minYear:''
    });

    let [minYear,setMinYear] = useState('')
    let [maxYear, setMaxYear] = useState('')

    useEffect(() => {
        if(minYear.length > 0)
            setQueryObject(prevState => ({ ...prevState, minYear:minYear }))
        if (maxYear.length > 0)
            setQueryObject(prevState => ({ ...prevState, maxYear: maxYear }))
    },[minYear,maxYear])
    
    let isChecked = (type) => {
        return queryObject.types[type]
    }

    let changeCheck = (event) => {
        let type = event.target.value
        console.log(type)
        let tempTypes=queryObject.types
        tempTypes[type] = !tempTypes[type]
        setQueryObject({...queryObject, types: tempTypes})
    }

    useEffect(() => {
        let isfirst = true
        let query = ''
        

        console.log(queryObject.types)
        if(queryObject.maxYear.length>0)
            if(isfirst){
                isfirst = false
                query = query + '?maxYear=' + queryObject.maxYear
            }
            else
                query = query + '&maxYear=' + queryObject.maxYear

        if (queryObject.minYear.length > 0)
            if (isfirst) {
                isfirst = false
                query = query + '?minYear=' + queryObject.minYear
            }
            else
                query = query + '&minYear=' + queryObject.minYear

        for(var key in queryObject.types){
            var k = key;
            if (isfirst) {
                if (queryObject.types[k]){
                    isfirst = false
                    query = query + '?type=' + k
                }
            }
            else
                if (queryObject.types[k]) query = query + '&type=' + k
        }

        setQueryString(query)
    }, [queryObject,setQueryString])

    return (
        <>
            <Filter titulo='Tipo'>
                <div className="w3-margin-left"><input type="checkbox" checked={isChecked('Slides')} onChange={changeCheck} value="slides" /><label> Slides </label></div>
                <div className="w3-margin-left"><input type="checkbox" checked={isChecked('Test')} onChange={changeCheck} value="teste" /><label> Testes </label></div>
            </Filter>
            <Filter titulo='Ano'>
                <div className='in-flex-row'>
                    <input className="w3-input w3-margin-bottom dt-input" type='number' placeholder="Min..." value={minYear} onChange={(e) => setMinYear(e.target.value)} />
                    <span className='w3-large w3-margin'> - </span>
                    <input className="w3-input w3-margin-bottom dt-input" type='number' placeholder="Max..." value={maxYear} onChange={(e) => setMaxYear(e.target.value)} />
                </div>
            </Filter>
            <input className="w3-btn in-upload-submit w3-margin" type="submit" value="Filtra" onClick={loadFilters}/>
        </>
    );
}

export default Sidebar;
import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Upload({numFiles, setNumFiles}) {
    let [tipos, setTipos] = useState([])

    let [titulo,setTitulo] = useState('')
    let [tipo,setTipo] = useState('')
    let [ano,setAno] = useState('')
    let [files,setFiles] = useState([])
    let [visibilidade,setVisibilidade] = useState('')

    let addFile = () => {
        setNumFiles([...numFiles, 1])
    }

    let handleFileChange = (e) => {
        let filesTemp = files
        filesTemp[e.target.getAttribute('numfile')] = e.target.files[0]
        setFiles(filesTemp)
    }

    let submitForm = () => {
        let data = new FormData();

        data.append('titulo',titulo)
        files.forEach(element => {
            if(element != null) data.append('myFile',element)
        });
        data.append('year', ano)
        data.append('tipo', tipo)
        data.append('visibilidade', visibilidade)

        console.log(files)
        
        axios.post('http://localhost:6969/recursos', data, { headers: { 'content-type': 'multipart/form-data' }, withCredentials:true })
        .then(dados => {
            console.log(dados)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }


    useEffect(() => {
        axios.get('http://localhost:6969/tipos', { withCredentials: true })
            .then(dados => {
                setTipos(dados.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="in-upload-modal in-flex-center">
            <div className="in-upload-header">
                <h2>Upload de Ficheiro</h2>
            </div>
            <div className="in-upload">
                <div className="w3-container in-flex-center w3-center">
                    <div className="w3-margin-top in-flex-row">
                        <span className='w3-large w3-margin-top'> <b>Título:</b></span>
                        <input className="w3-input in-upload-input" type="text" name="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} autoComplete="off" />
                    </div>
                    <div className='in-upload-files w3-margin-top'>
                        <div className='in-files-list'>
                            {numFiles.map((v, i) => <input className="w3-input w3-margin-bottom w3-margin-top" type="file" key={i} numfile={i} name="myFile" onChange={handleFileChange}/>)}
                        </div>
                        <div className="w3-btn in-upload-submit" onClick={addFile}> + </div>
                    </div>
                    <div className="w3-margin-top">
                        <label>Tipo de Recurso: </label>
                        <select name="tipo" onChange={(e) => setTipo(e.target.value)}>
                            <option value="">-Select-</option>
                            {tipos.map((v, i) => <option value={v} key={i}>{v}</option>)}
                        </select>
                    </div>
                    <div className='w3-margin-top'>
                        <input className="w3-input w3-margin-bottom dt-input" type='number' placeholder="Ano..." name='year' value={ano} onChange={(e) => setAno(e.target.value)} />
                    </div>
                    <div className="w3-margin-bottom in-flex-row">
                        <div className="w3-margin-left"> <label> Público </label><input type="radio" name="visibilidade" value="PUBLIC" onChange={(e) => setVisibilidade(e.target.value)}/></div>
                        <div className="w3-margin-left"><label> Privado </label><input type="radio" name="visibilidade" value="PRIVATE" onChange={(e) => setVisibilidade(e.target.value)}/></div>
                    </div>
                    <div className="w3-margin-bottom"> <input className="w3-btn in-upload-submit" type="submit" onClick={submitForm} value="Submit" /></div>
                </div>
            </div>
            <div className="in-upload-footer w3-margin-top">
                <h5 className="w3-center">Made with 🧠 PRI2020</h5>
            </div>
        </div>
    );
}

export default Upload;
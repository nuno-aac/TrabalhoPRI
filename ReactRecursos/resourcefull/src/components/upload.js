import '../stylesheets/style.css';
import '../stylesheets/docstyles.css';
import '../stylesheets/instyles.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Upload({numFiles, setNumFiles}) {
    let [tipos, setTipos] = useState([])

    let addFile = () => {
        setNumFiles([...numFiles, 1])
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
                <form className="w3-container in-flex-center w3-center" action="http://localhost:6969/recursos" method="POST" encType="multipart/form-data">
                    <div className="w3-margin-top in-flex-row">
                        <span className='w3-large w3-margin-top'> <b>Título:</b></span>
                        <input className="w3-input in-upload-input" type="text" name="titulo" autoComplete="off" />
                    </div>
                    <div className='in-upload-files w3-margin-top'>
                        <div className='in-files-list'>
                            {numFiles.map((v, i) => <input className="w3-input w3-margin-bottom w3-margin-top" type="file" key={i} name="myFile" />)}
                        </div>
                        <div className="w3-btn in-upload-submit" onClick={addFile}> + </div>
                    </div>
                    <div className="w3-margin-top"><label>Tipo de Recurso: </label><select name="tipo">
                        <option value="">-Select-</option>
                                {tipos.map((v, i) => <option value={v} key={i}>{v}</option>)}
                    </select></div>
                    <div className='w3-margin-top'>
                        <input className="w3-input w3-margin-bottom dt-input" type='number' placeholder="Ano..." name='year' />
                    </div>
                    <div className="w3-margin-bottom in-flex-row">
                        <div className="w3-margin-left"> <label> Público </label><input type="radio" name="visibilidade" value="PUBLIC" /></div>
                        <div className="w3-margin-left"><label> Privado </label><input type="radio" name="visibilidade" value="PRIVATE" /></div>
                    </div>
                    <div className="w3-margin-bottom"> <input className="w3-btn in-upload-submit" type="submit" value="Submit" /></div>
                </form>
            </div>
            <div className="in-upload-footer w3-margin-top">
                <h5 className="w3-center">Made with 🧠 PRI2020</h5>
            </div>
        </div>
    );
}

export default Upload;
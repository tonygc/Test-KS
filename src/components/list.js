import React, { useState, useEffect, useCallback } from 'react'
import ItemRow from './item'
import NewItem from './newItem'
import { data } from '../data'
export default function List(){
    const [ rows_pacients, setRows ] = useState([])
    const [ createState, setCreateState ] = useState(false)
    useEffect(()=>{
        setRows(data)
    },[])
    const saveItem=(item)=>{
        console.log(item)
        setCreateState(false)
        if(rows_pacients.length>=20){
            setRows(rows=>[item, ...rows.slice(0,18)])
        }else{
            setRows(rows=>[item, ...rows])
        }
    }
    const saveItemCallback = useCallback((item)=>{saveItem(item)},[])
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                <div className="card text-white bg-dark mb-3">
                    <div className="card-header d-flex justify-content-between" style={{borderBottom:'1px solid white'}}>
                        <h1>Historial de pacientes</h1>
                        <button onClick={()=>setCreateState(true)} className="btn btn-secondary btn-lg border border-light" title="Nuevo registro">
                            <i className="mdi mdi-plus-thick"></i>
                        </button>
                    </div>
                    <div className="card-body">
                        {createState &&
                            <NewItem saveCreation={saveItemCallback} cancelCreation={()=>setCreateState(false)} />
                        }
                        <div className="badge bg-primary text-wrap" style={{width: '6rem'}}>
                        Total Items: {rows_pacients.length}
                        </div>
                        <table className="table table-light table-striped table-hover">
                            <thead>
                                <tr className="table-light">
                                    <th className="table-light">Paciente</th>
                                    <th className="table-light">Ortodoncista</th>
                                    <th className="table-light">Número de Placas</th>
                                    <th className="table-light">Inicio de Tratamiento</th>
                                    <th className="table-light">Fin de Tratamiento</th>
                                    <th className="table-light"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rows_pacients.length > 0 &&
                                    rows_pacients.map((item,index)=>
                                    { return(
                                        <ItemRow itemProp={item} key={index} />
                                        )
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                <div className="col-sm-1"></div>
            </div>
        </div>
    )
}
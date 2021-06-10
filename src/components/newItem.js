import React, { Fragment, useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import InputNumber from 'react-input-number';

export default function NewItem(props){
    const { cancelCreation, saveCreation } = props
    const [itemState, setItemState] = useState({
        pacient:'',
        dentist:'',
        tooth_plates:0,
        init_date:new Date(),
        end_date:new Date()
    })
    const focusRef = useRef();
    useEffect(()=>{
        focusRef.current.focus()
    },[])

    const onChangeProp = (ev) => {
        const {id, value} = ev.target;
        setItemState({...itemState, [id]: value})
    }

    const saveItemLocal = (item) =>{
        saveCreation(item)
    }

    return (
        <div className="d-flex justify-content-between bg-secondary bg-gradient align-items-center" style={{height:'50px'}}>
            <div className="d-flex justify-content-around" style={{width:'90%'}}>
                <input style={{width:'300px',maxHeight: '40px'}} ref={focusRef} id="pacient" onChange={(ev)=> onChangeProp(ev)} type="text" value={itemState?.pacient} className="form-control" placeholder="Nombre del paciente" />
                <input style={{width:'300px',maxHeight: '40px'}} id="dentist" onChange={(ev)=> onChangeProp(ev)} type="text" value={itemState?.dentist} className="form-control" placeholder="Nombre del odontólogo" />
                <InputNumber style={{width:'100px',maxHeight: '40px'}} enableMobileNumericKeyboard id="tooth_plates" onChange={(ev)=> setItemState({...itemState, tooth_plates:ev})} className="form-control" value={itemState?.tooth_plates} />
                <DatePicker onChange={(ev)=> setItemState({...itemState, init_date:ev})} className="form-control" selected={itemState?.init_date} />
                <DatePicker onChange={(ev)=> setItemState({...itemState, end_date:ev})} className="form-control" selected={itemState?.end_date} />
            </div>
            <div className="d-flex justify-content-evenly" style={{width:'10%'}}>
                <button title="Cancelar" style={{maxHeight: '40px'}} className="btn btn-light" onClick={()=>cancelCreation()}><i className="mdi mdi-close"></i></button>
                <button type="button"  title="Guardar" style={{maxHeight: '40px'}} className="btn btn-dark"><i onClick={()=>saveItemLocal(itemState)} className="mdi mdi-content-save"></i></button>
            </div>
        </div>
    )
}
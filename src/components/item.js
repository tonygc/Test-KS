import React, { Fragment, useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import InputNumber from 'react-input-number';
function ItemRow(props){
    const { itemProp } = props
    const [itemState, setItemState] = useState(null)
    const [backItem, setBackItem] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const focusRef = useRef();
    useEffect(()=>{
        setItemState(itemProp)
    },[itemProp])
    useEffect(()=>{
        if(editMode){
            focusRef.current.focus()
        }
    },[editMode])

    const handlerEditMode = (action) => {
        if(action){
            setBackItem(itemState)
        }else{
            setItemState(backItem)
        }
        setEditMode(action)
    }

    const onChangeProp = (ev) => {
        const {id, value} = ev.target;
        setItemState({...itemState, [id]: value})
    }
    return(
        <Fragment>
            {!editMode &&
                <tr className="table-light">
                <td className="table-light">{itemState?.pacient}</td>
                <td className="table-light">{itemState?.dentist}</td>
                <td className="table-light">{itemState?.tooth_plates}</td>
                <td className="table-light">{itemState?.init_date.toLocaleDateString("en-US")}</td>
                <td className="table-light">{itemState?.end_date.toLocaleDateString("en-US")}</td>
                <td className="table-light">
                <div className="d-flex justify-content-evenly">
                    <button onClick={()=>handlerEditMode(true)} className="btn btn-dark"><i className="mdi mdi-pencil"></i></button>
                </div>
                </td>
                </tr>
            }
            {editMode &&
                <tr className="table-light">
                <td className="table-light"><input ref={focusRef} id="pacient" onChange={(ev)=> onChangeProp(ev)} type="text" value={itemState?.pacient} className="form-control" placeholder="Nombre del paciente" /></td>
                <td className="table-light"><input id="dentist" onChange={(ev)=> onChangeProp(ev)} type="text" value={itemState?.dentist} className="form-control" placeholder="Nombre del odontólogo" /></td>
                <td className="table-light"><InputNumber enableMobileNumericKeyboard id="tooth_plates" onChange={(ev)=> setItemState({...itemState, tooth_plates:ev})} className="form-control" value={itemState?.tooth_plates} /></td>
                <td className="table-light">{ <DatePicker onChange={(ev)=> setItemState({...itemState, init_date:ev})} className="form-control" selected={itemState?.init_date} /> }</td>
                <td className="table-light">{ <DatePicker onChange={(ev)=> setItemState({...itemState, end_date:ev})} className="form-control" selected={itemState?.end_date} />}</td>
                <td className="table-light">
                    <div className="d-flex justify-content-evenly">
                        <button className="btn btn-secondary" onClick={()=>handlerEditMode(false)}><i className="mdi mdi-close"></i></button>
                        <button className="btn btn-dark"><i onClick={()=>setEditMode(false)} className="mdi mdi-content-save"></i></button>
                    </div>
                </td>
                </tr>
            }
        </Fragment>
    )
}
export default React.memo(ItemRow)
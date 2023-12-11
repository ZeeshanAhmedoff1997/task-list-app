import React,{useState} from 'react'

export default function modal(props) {
    const data = (<div className='modal'>
    <p>{props.children}</p>
    <hr/>
    <button onClick={()=>setShow(false)} style={{padding:'5px 10px', margin:'10px 0px'}} className="btn btn-dark btn-block">Okay</button>
</div>)

   const {show, setShow} = useState(true)
   return ( <React.Fragment>{show? data: null}</React.Fragment>)
//    return ( <React.Fragment><p>Modal</p></React.Fragment>)
}

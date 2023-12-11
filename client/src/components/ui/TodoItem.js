import React from 'react';
import CheckBox from './CheckBox';
import { FaTrash} from "react-icons/fa";


export default function TodoItem(props) {
    const {data, changeStatus, deleteItemById} = props;
    const handleChange = (checked) => changeStatus(data._id, checked);
    const className = 'todo-item ui-state-default ' + (data.completed === true ? 'completed' : 'pending');



    return (
        <li className={className}>
            <div className="checkbox" style={{display:'flex', justifyContent: 'space-between'}}>
                <label >
                    <CheckBox checked={data.completed} onChange={handleChange}/> {data.description}
                </label>
                    <div style={{display: 'flex', justifyContent:'space-evenly'}}>
                        <div style={{paddingRight:'10px'}} onClick={() => {deleteItemById(data._id)}}><FaTrash className='icon' cursor="pointer"  color='#9e9796' /></div>
                    </div>
            </div>
        </li>
    );
}

import axios from 'axios'
import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Loader from "react-loader-spinner";


export default function deleteAccountModal(props) {
    const [loader, setLoader] = useState(false)

    const history = useHistory()

    const onDeleteAccount = async () => {
        setLoader(true)
        try {
            await axios.delete('/users/me', {headers: {"Authentication": `Bearer ${props.token}`}})
        } catch (error) { }
        props.setToken(null)
        localStorage.clear()
        setLoader(false)
        history.push('/')
    }
    return (
        <div className='inner '>
            <p style={{textAlign:'center', fontSize:'2.5rem', marginTop:'-20px'}}>Delete Account</p>
            <p style={{fontSize:'1.3rem', textAlign:'center', marginBottom:'20px'}}>Are you sure? You'll permanently loose your data</p>
            <div style={{display:'flex', justifyContent:'space-around'}}>
                <button className="cancelBtn" onClick={() => history.push('/me')}>Cancel</button>
                <button className="deleteBtn" onClick={onDeleteAccount}>Delete</button>
            </div>
            {loader ? <Loader className='loader' type="Grid" color="#808080" height={40} width={40} /> : null}
        </div>
    )
}

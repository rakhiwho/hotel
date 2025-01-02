import React, { useState } from 'react'
import axios from 'axios'
import { IGuest } from '@/interface/IGuest'
function EditGuest() {
    const [loading ,  setLoading] = useState(false)

    const editGuest = async (_id :string , data : IGuest)=>{
        try {
            setLoading(true)
            const res=  await axios.put(`/api/hotels/guest/?_id=${_id}` , data)
    
            if(!res){
                setLoading(!loading);
                return;
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error)
        }

    }


  return {loading , editGuest}
}

export default EditGuest

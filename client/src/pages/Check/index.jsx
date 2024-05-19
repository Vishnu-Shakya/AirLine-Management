import React from 'react'
import { toast } from 'react-toastify'

function Check() {
    const notify=()=>{
        toast.success("you set toast succefylly..");
    }
  return (
    <div>
        <button onClick={notify}>Click me </button>
    </div>
  )
}

export default Check
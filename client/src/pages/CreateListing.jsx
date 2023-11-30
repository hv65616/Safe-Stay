import React from 'react'

export default function CreateListing() {
  return (
    <main>
        <h1 className='text-3xl font-semibold text-center my-7 '>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row'>
            <div>
                <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required></input>
                <input type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' required></input>
                <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required></input>
            </div>

        </form>
    </main>
  )
}

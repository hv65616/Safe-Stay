import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>

        {/* Left side div for Search type */}
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-8 '>
                {/* Search term and search bar */}
                <div className='flex items-center gap-2'> 
                    <label className='whitespace-nowrap font-semibold'>Search Term</label>
                    <input type='text' id = 'searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full' ></input>
                </div>
                {/* Search type and filters */}
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type : </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5'></input>
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5'></input>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5'></input>
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5'></input>
                        <span>Offer</span>
                    </div>
                </div>
                {/* Search amenities */}
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities : </label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5'></input>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5'></input>
                        <span>Furnished</span>
                    </div>
                </div>
                {/* Sorting options */}
                <div className='flex gap-2 items-center'>
                    <label className='font-semibold'>Sort :</label>
                    <select id="sort_order" className='p-3 border rounded-lg'>
                        <option>Price high to low</option>
                        <option>Price low to high</option>
                        <option>Latest</option>
                        <option>Oldest</option>
                    </select>
                </div>
                {/* Search Button */}
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>
        </div>

        {/* Right side div for the lid-sting result */}
        <div className='p-7'>
            <h1 className='text-3xl font-semibold border-b p-2 text-slate-700 mt-5 md:mt-0'>Listing results : </h1>
        </div>
    </div>
  )
}

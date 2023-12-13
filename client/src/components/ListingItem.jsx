import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'

export default function ListingItem({listing}) {
  return (
    // listing card : listing image and details
    <div className='bg-white shadow-md hover:sahdow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>

        {/* listing url to redirect */}
        <Link to={`/listing/${listing._id}`}>

        {/* div for showing listing image */}
        <img src={listing.imageUrls[0]} alt="listing cover" className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>

        {/* div for showing listing details */}
        <div className='p-3 flex flex-col gap-2 w-full'>

            {/* 1st row for showing Listing name */}
            <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>

            {/* 2nd row for showing listing location */}
            <div className='flex items-center gap-1'>
                <MdLocationOn className='h-4 w-4 text-green-700'/>
                <p className='text-sm text-gray-600'>{listing.address}</p>
            </div>

            {/* 3rd row for showing listing description */}
            <p className='text-sm text-gray-600 line-clamp-3'>{listing.description}</p>

            {/* 4th row for showing listing price */}
            <p className='text-slate-500 mt-2 font-semibold'>$
            {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' /month'}</p>

            {/* 5th row of listing card for showing bathrooms and bedrooms*/}
            <div className='flex gap-4 flex-wrap text-slate-700'>
                <div className='font-bold text-xs'>
                    {listing.bedrooms > 1 ? `${listing.bedrooms} beds `: `${listing.bedrooms} bed`}
                </div>
                <div className='font-bold text-xs'>
                    {listing.bathrooms > 1 ? `${listing.bathrooms} baths `: `${listing.bathrooms} bath`}
                </div>
            </div>
        </div>
        </Link>

    </div>
  )
}

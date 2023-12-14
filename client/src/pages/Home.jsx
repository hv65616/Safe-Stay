import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings,setSaleListings] = useState([]);
  const [rentListings,setRentListings] = useState([]);
  SwiperCore.use([Navigation])
  
  console.log(offerListings)
  useEffect(() => {
    const fetchOfferListings = async () => {
       try{
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
       }catch(error){
        console.log(error);
       }
    };
    const fetchRentListings = async ()=> {
      try{
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
       }catch(error){
        console.log(error)
       }
    }
    const fetchSaleListings = async ()=> {
      try{
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
       }catch(error){
        console.log(error)
       }
    };
    fetchOfferListings();
  },[]);
  return (
    <div className=''>
      
      {/* Top  */}
      <div className='flex flex-col gap-6 py-28 px-5 max-w-6xl mx-auto '>
        <h1 className='text-3xl text-slate-700 font-bold lg:text-6xl'>Welcome to <span className='text-slate-500'>Safe-Stay</span>,<br/> where peace of mind meets<br/>exceptional hospitality . . . </h1>
        <div className="text-gray-400 text-sm font-semibold sm:text-lg">Join us in celebrating your journey to a safe and comfortable stay.</div>
        <Link to={"/search"} className='text-sm sm:text-lg text-blue-800 hover:underline max-w-fit'> Let's get started . . .</Link>
      </div>

      {/* Swiper */}
      <Swiper navigation>
      {
        offerListings && offerListings.length > 0 && offerListings.map((listing) => (
          <SwiperSlide>
            <div style={{background:`url(${listing.imageUrls[0]}) center no-repeat`,backgroundSize:"cover"}} className='h-[500px]' key={listing._id}></div>
          </SwiperSlide>
        ))
      }
      </Swiper>
       

      {/* Listing results for offer, sale and rent */}
      <div className='max-w-fit mx-auto p-3 flex flex-col gap-4 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link to={'/search?offer=true'} className='text-sm text-blue-800 hover:underline'>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4 '>
              {
                offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link to={'/search?type=rent'} className='text-sm text-blue-800 hover:underline'>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4 '>
              {
                rentListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link to={'/search?type=sale'} className='text-sm text-blue-800 hover:underline'>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4 '>
              {
                saleListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id}/>
                ))
              }
            </div>
          </div>
        )}
      </div>


    </div>
  )
}

export default Home
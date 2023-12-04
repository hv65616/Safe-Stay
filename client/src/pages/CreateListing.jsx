import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase';

// Functional Component for creating list
export default function CreateListing() {
  // State variables for managing files and form data
  const [files, setFiles] = useState([]);
  const [formData,setFormData] = useState({
    imageUrls: [],
  });
  // To see the error and loading affect
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false)
  console.log(formData)

  // Function to handle the submission of images
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length+formData.imageUrls.length < 7){
      setUploading(true)
      setImageUploadError(false)
      const promises = [];
      // Iterate through each selected file and store it
      for (let i = 0; i < files.length; i ++){
        promises.push(storeImage(files[i]));
      }
      // Wait for all promises to resolve and then update the form data with image URLs
      Promise.all(promises).then((urls)=>{
        setFormData({...formData,
           imageUrls: formData.imageUrls.concat(urls) });
           setImageUploadError(false);
           setUploading(false)
      }).catch((err) => {
        setImageUploadError('Image upload failed (2 mb max per image)');
        setUploading(false)
      })
      

    }
    else{
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false)
    }
  };

  // Function to store an individual image in Firebase Storage
  const storeImage = async (file) =>{
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      // Create a resumable upload task
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Event listener for the state change of the upload task
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`); },
        (error)=>{
          reject(error);
        },
        ()=>{
          // When the upload is complete, get the download URL and resolve the promise
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls : formData.imageUrls.filter((_,i) => i !==index),
    });
  };
  // JSX for rendering the component
  return (
    <main className='p-3 max-w-4xl mx-auto' >
        <h1 className='text-3xl font-semibold text-center my-7 '>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            {/* Left side div containing input fields */}
            <div className='flex flex-col gap-4 flex-1 '>
                <input type='text' placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required></input>
                <input type='text' placeholder='Description' className='border p-3 rounded-lg' id='description' required></input>
                <input type='text' placeholder='Address' className='border p-3 rounded-lg' id='address' required></input>
                <div className='flex gap-6 flex-wrap'>
                  <div className='flex gap-2'>
                    <input type="checkbox"id='sale' className='w-5' />
                    <span>Sell</span>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox"id='rent' className='w-5' />
                    <span>Rent</span>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox"id='parking' className='w-5' />
                    <span>Parking spot</span>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox"id='furnished' className='w-5' />
                    <span>Furnished</span>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox"id='offer' className='w-5' />
                    <span>Offer</span>
                  </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                  <div className='flex items-center gap-2'>
                    <input type="number" id='number' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
                    <p>Beds</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input type="number" id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
                    <p>Baths</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input type="number" id='regularPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
                    <div className='flex flex-col items-center'>
                      <p>Regular Price</p>
                      <span className='text-xs'>($ / Month)</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <input type="number" id='discountPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg'/>
                    <div className='flex flex-col items-center'>
                      <p>Discounted Price</p>
                      <span className='text-xs'>($ / Month)</span>
                    </div>
                    
                  </div>
                </div>
            </div>
            {/* Left side div containing input fields */}
            <div className='flex flex-col flex-1 gap-4'>
              <p className='font-semibold'> Images: <span className='font-normal text-gray'>The first image will be the cover (max 6)</span> </p>
              {/* Input and button for selecting and uploading images */}
              <div className='flex gap-4'>
                <input onChange={(e)=>setFiles(e.target.files)}className='p-3 border border-gray-300 rounded w-full' type='file' id = 'images' accept='image/*' multiple>
                </input>
                <button type='button' disabled={uploading} onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>
                  {uploading?'Uploading...':'Upload'}
                </button>
              </div>
              <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p> 
              {
                formData.imageUrls.length > 0 && formData.imageUrls.map((url, index)=>(
                  <div key={url} className='flex justify-between p-3 border items-center'>
                    <img src={url} alt='listing image' className='w-20 h-20 object-contain  rounded-lg'></img>
                    <button type='button' onClick={() => handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'>Delete</button>
                  </div>
                  
                ))
              }
              {/* Button for creating the listing */}
              <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
            </div>
           
        </form>
        
    </main>
  )
}

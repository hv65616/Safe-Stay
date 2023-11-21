import {Link} from 'react-router-dom'

function SignIn() {
  return (
    <div className='p-3 max-w-lg mt-16 mx-auto '>
      <h1 className='text-3xl text-center  font-semibold my-7'>
       Sign In 
       </h1>
      <form className='flex flex-col gap-4'>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg' id='email' ></input>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg' id='password' ></input>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 '>Sign In</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign up </span>
        </Link>
      </div>
      
    </div>
  )
}

export default SignIn
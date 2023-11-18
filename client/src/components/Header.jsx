import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-5'>
          <Link to="/home">
            <h1 className='font-bold font-logo text-3xl flex flex-row'>
                <span className='text-slate-500'>Safe-</span>
                <span className='text-slate-700'>Stay</span>
            </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <FaSearch className='text-slate-600'></FaSearch>
        </form>
        <ul className='flex gap-4'>
          <Link to="/home">
          <li className='hidden sm:inline text-slate-700 hover:underline '>Home</li>
          </Link>
          <Link to="/about">
          <li className='hidden sm:inline text-slate-700 hover:underline '>About</li>
          </Link>
          <Link to="/sign-in">
          <li className='hidden sm:inline text-slate-700 hover:underline '>SignIn</li> 
          </Link>
          <Link to="/sign-up">
          <li className='hidden sm:inline text-slate-700 hover:underline '>SignUp</li> 
          </Link>
        </ul>
        </div>
        
    </header>
  )
}

export default Header
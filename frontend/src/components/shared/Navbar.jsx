import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useTheme } from '@/context/theme-provider'
import { LogOut, Menu, UserRound } from 'lucide-react'
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { USER_API_END_POINT } from '@/utils/constant'



const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  // const user = true;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

   const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 max-w-full">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-6">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold">
          Find<span className="text-[#1077aa]">Job</span>
        </h1>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="h-6 w-4" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
          {
            user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ):(
              <>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/jobs">Jobs</Link></li>
               <li><Link to="/browse">Browse</Link></li>
              </>
            )
          }
            
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#1077aa] hover:bg-[#283e49]">Signup</Button>
              </Link>
              <Button variant="ghost" onClick={toggleTheme}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div>
                  <Button variant="ghost" onClick={toggleTheme}>
                    {theme === 'dark' ? '☀️' : '🌙'}
                  </Button>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer my-2">
                  <UserRound />
                  <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <LogOut />
                  <Button onClick={logoutHandler} variant="link">Logout</Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-4">
          <ul className="flex flex-col gap-2 font-medium">
             {
            user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ):(
              <>
               <li><Link to="/">Home</Link></li>
               <li><Link to="/jobs">Jobs</Link></li>
               <li><Link to="/browse">Browse</Link></li>
              </>
            )
          }
          </ul>
          {!user ? (
            <div className="flex flex-col gap-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#1077aa] hover:bg-[#283e49] w-full">Signup</Button>
              </Link>
              <Button variant="ghost" onClick={toggleTheme} className="w-full">
                {theme === 'dark' ? '☀️' : '🌙'}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Button variant="ghost" onClick={toggleTheme}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </Button>
              <div className="flex items-center gap-2">
                <UserRound />
                <Button variant="link"><Link to="/profile">View Profile</Link></Button>
              </div>
              <div className="flex items-center gap-2">
                <LogOut />
                <Button onClick={logoutHandler} variant="link">Logout</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Navbar

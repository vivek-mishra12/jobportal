import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser} from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((store) => store.auth)

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      console.log(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="pt-16">
      <Navbar />
      <div className="flex justify-center items-center px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border border-gray-200 rounded-md p-4 my-10 bg-white dark:bg-[#111]"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              className="my-2"
              type="email"
              placeholder="xyz@gmail.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <Input
              className="my-2"
              type="password"
              placeholder="********"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>

          <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                className="cursor-pointer"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
              />
              <Label>Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                className="cursor-pointer"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>

          {loading ? (
            <Button className="w-full my-4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 cursor-pointer">
              Login
            </Button>
          )}

          <span className="text-sm">
            <Link to="/signup" className="text-blue-600">
              Create a new account
            </Link>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Login

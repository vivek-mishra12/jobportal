import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'



const Signup = () => {

const [input,setInput] = useState({
    fullname : "",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
});

const {loading} = useSelector(store=>store.auth);
const dispatch = useDispatch();
const navigate = useNavigate();

const changeEventHandler = (e) =>{
    setInput({...input,[e.target.name]:e.target.value});
}

const changeFileHandler = (e) =>{
    setInput({...input,file:e.target.files?.[0]});
}

const submitHandler = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("password",input.password);
    formData.append("role",input.role);

   if (input.file) {
    formData.append("file", input.file);
   } else {
    formData.append("defaultImageUrl", "https://github.com/shadcn.png");
    }


    try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
            headers:{
                "Content-Type": "multipart/form-data",
            },
            withCredentials:true,
        })

        if(res.data.success){
            navigate("/login");
            toast.success(res.data.message)
        }
    } catch (error) {
        toast.error(error.response.data.message)
        console.log(error);
    }finally{
        dispatch(setLoading(false));
    }
}

  return (
    <div className='pt-16'>
  <Navbar />
  <div className="flex items-center justify-center px-4">
    <form
      onSubmit={submitHandler}
      className="w-full sm:w-[90%] md:w-[80%] lg:w-1/2 border border-gray-200 rounded-md p-4 my-10"
    >
      <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>

      {/* Fullname */}
      <div className="my-2">
        <Label>Full Name</Label>
        <Input
          className="my-2"
          type="text"
          placeholder="Your name"
          name="fullname"
          value={input.fullname}
          onChange={changeEventHandler}
        />
      </div>

      {/* Email */}
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

      {/* Phone */}
      <div className="my-2">
        <Label>Phone Number</Label>
        <Input
          className="my-2"
          type="text"
          placeholder="+91 xxxxxxxxxx"
          name="phoneNumber"
          value={input.phoneNumber}
          onChange={changeEventHandler}
        />
      </div>

      {/* Password */}
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

      {/* Role + File Input */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <RadioGroup className="flex flex-row flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              name="role"
              value="student"
              className="cursor-pointer"
              checked={input.role === "student"}
              onChange={changeEventHandler}
            />
            <Label htmlFor="option-one">Student</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              name="role"
              value="recruiter"
              className="cursor-pointer"
              checked={input.role === "recruiter"}
              onChange={changeEventHandler}
            />
            <Label htmlFor="option-two">Recruiter</Label>
          </div>
        </RadioGroup>

        <div className="flex items-center gap-2">
          <Label>Profile</Label>
          <Input
            accept="image/*"
            type="file"
            onChange={changeFileHandler}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Submit Button */}
      {loading ? (
        <Button className="w-full my-4">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" className="w-full my-4 cursor-pointer">
          Signup
        </Button>
      )}

      {/* Login Link */}
      <span className="text-sm block text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </span>
    </form>
  </div>
</div>
  )
}

export default Signup
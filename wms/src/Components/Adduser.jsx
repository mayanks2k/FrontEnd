import React, { useEffect } from 'react'
import './registration.css'
import { useState, setState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from "@hookform/devtools";
import { Link } from 'react-router-dom';



function AddUser() {

  const form = useForm({
    defaultValues: {
      email: "wms@gmail.com",
      password: "",
      confirmPassword: "",
    },
    mode: "all"
  });
  const { register, control, handleSubmit, formState, watch, reset } = form;
  const { errors, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;
  /*const onSubmit = (data) => {
    console.log("Submit", data);
  }*/
  const [userType, setUserType] = useState("");
  
  const[passval,setpassval] = useState(false);


  const username = watch('username');
  const usermail = watch('email');
  const contact = watch('contact')
  const pass = watch('password');
  const cpass = watch('confirmPassword');
  
  


  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const handleformsubmit  = (event)=>{
    event.preventDefault();
    
    
    const datasubmit = {
      username,
      usermail,
      contact,
      pass,
      userType
      

    }
    if(username =="" || usermail=="" || contact== ""|| password=="" || usermail=="wms@gmail.com") 
    {
      event.preventDefault();
      alert("Please fill all the fields correctly");
    }
    else{
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
      username,
      usermail,
      contact,
      pass,
      userType,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        /*if (data.status == "OK") {
          alert("Registration Successful");
        } else {
          alert("Something went wrong");
        }*/
        
      });
    }
    
   event.target.reset();
    

  }
   useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  })
  return (
    <>
      <div className="form">
        <form onSubmit={handleformsubmit} noValidate method='post' action='#'>
          <div className="form-body">

            <div className='header'>
              <h2>AddUser</h2>
            </div>
            <hr></hr>
            <div className='username'>
            Register As:&nbsp;
            <input
              
              type="radio"
              name="usertype"
              value="User"
              onChange={(e) => setUserType(e.target.value)}
            />
            User
            <input
           
              type="radio"
              name="usertype"
              value="Auditor"
              onChange={(e) => setUserType(e.target.value)}
            />
            Auditor
          </div>
          
          
          
              <div className="username">
              <label className="form__label" for="username">Username </label>
              <input className="form__input" type="username" id="username" placeholder="Username" name='username'{...register("username", {
                required: "Please Check the username",maxLength:10
              })} />
            </div>
            <p className='error'>{errors.username?.message}</p>

            <div className="email">
              <label className="form__label" for="email">Email </label>
              <input type="email" name='email' id="email" className="form__input" placeholder="Email" {...register("email", {
                required: {
                  value: true,
                  message: "Email is Required"
                }, pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                },
                validate: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" || "Enter a diffrent Email Address"
                  );
                },
                
              })} />
            </div>
            <p className='error'>{errors.email?.message}</p>
            <div className="contact">
              <label className="form__label" for="contact">Contact No </label>
              <input className="form__input" type="number" id="contact" placeholder="Contact Number" name='contact'{...register("contact", {
                required: "Please Check the contact",maxLength:13
              })} />
            </div>
            <p className='error'>{errors.contact?.message}</p>
            <div className="password">
              <label className="form__label" for="password">Password </label>
              <input className="form__input" type="password" id="password" placeholder="Password" name='password'{...register("password", {
                required: "password is Required"
              })} />
            </div>
            <p className='error'>{errors.password?.message}</p>
            <div className="confirm-password">
              <label className="form__label" for="confirmPassword">Confirm Password </label>
              <input className="form__input" type="password" id="confirmPassword"
              placeholder="Confirm Password" {...register("confirmPassword", {
                required: "Confirm Password is Required",
                validate: (val) => {
                  if (watch('password') != val) {
                    return "Your passwords do no match";
                  }
                }
              })} />
            </div>
            <p className='error'>{errors.confirmPassword?.message}</p>
          </div>

          <div class="footer">
            <button type="submit" class="btn" onSubmit={()=> handleformsubmit() }>AddUser</button>
            <button type="reset" class="btn" onClick={() => reset()}>Reset</button>
            <Link to='/admin'> <button type="reset" class="btn" >Back</button></Link>
          </div>
        </form>
        <DevTool control={control} />
        <hr></hr>
        <div>
          <p>Already Have Account ?<Link to="/login">Login</Link></p>
        </div>


      </div>


    </>
  )
}

export default AddUser;
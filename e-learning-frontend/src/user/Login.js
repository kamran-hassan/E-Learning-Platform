import { useEffect, useState } from 'react';
import Topbar from '../topbar/Topbar';
import axios from 'axios';
import { useToken } from '../auth/useToken';
import { requestUrls } from '../utility/utility';

const Login = () => {

  const [formState, setformState] = useState('SIGNIN'); // CAN BE LOGIN

  const [formData, setFormData] = useState({
    full_name: '',
    dateofbirth: '',
    email: '',
    password: '',
  });

  const [logInFormData, setLogInFormData] = useState({
    email:'',
    password:''
  })

  const [errors, setErrors] = useState({});
  const [logInError, setLogInFormError] = useState({}); 
  const [token, setToken] = useToken();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
  };

  const handleLogInformChange = (e) => {
    const { name, value } = e.target;
    setLogInFormData({...logInFormData, [name]: value});
    setLogInFormError({});
  }

  const handleLogInSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (logInFormData.email === '') {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(logInFormData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (logInFormData.password === '') {
      newErrors.password = 'Password is required';
    } else if (logInFormData.password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setLogInFormError(newErrors);
    }
    else{
      axios.post(requestUrls.logIn, logInFormData).then((r) => {
        if(r.status == 200){
          setToken(r.data.jwt);
          window.location = '/';
        }
      }).catch((e) => {
        if(e.response.status == 400){
          let errorMess = e.response.data.message != null ? e.response.data.message : "Some Error occured"; 
          window.alert(errorMess)
        }
      })
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    const newErrors = {};
    if (formData.full_name == '') {
      newErrors.full_name = 'Full name is required';
    }
    if (formData.dateofbirth === '') {
      newErrors.dateofbirth = 'Date of birth is required';
    }
    if (formData.email === '') {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.password === '') {
      newErrors.password = 'Password is required';
    } else if (formData.password.trim().length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const concatenatedErrors = Object.values(newErrors).join('; ');
      //console.log(newErrors, errors)
      //window.alert('Please fill in all required fields correctly.' + concatenatedErrors);
    } else {
      // Submit data or make API call
      // console.log('Form data:', formData);
      axios.post(requestUrls.signUp, formData).then((r) => {
      if(r.status == 200){
          setToken(r.data.jwt);
          window.location = '/';
        }
      }).catch((e) => {
        if(e.response.status == 400){
          let errorMess = e.response.data.message != null ? e.response.data.message : "Some Error occured"; 
          window.alert(errorMess)
        }
      })
    
    }
  };

  useEffect(() => {
    if(token != null ){
      window.location = '/';
    }
  }, [token])

  return (
    <div>
        <Topbar />
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <div className="flex justify-center">
          <h1 onClick={() => setformState("SIGNIN")} className={`text-2xl font-semibold px-4 mb-4 text-center cursor-pointer inline-block ${formState === 'SIGNIN' ? "border-solid border-b-4 border-blue-500 text-blue-500" : ""}`}>
            Sign Up
          </h1>
          <h1 onClick={() => setformState("LOGIN")} className={`text-2xl font-semibold px-4 mb-4 text-center cursor-pointer inline-block ${formState === 'LOGIN' ? "border-solid border-b-4 border-blue-500 text-blue-500" : ""}`}>
            Log In
          </h1>
        </div>
        {
          formState === 'SIGNIN' ? ( 
              <form onSubmit={handleSubmit} className="space-y-4">
              <div>
              <label htmlFor="full_name" className="block mb-1">
                  Full Name:
              </label>
              <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`w-full border ${
                  errors.full_name ? 'border-red-500' : 'border-gray-300'
                  } rounded-md p-2`}
              />
              {errors.full_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
              )}
              </div>

              <div>
              <label htmlFor="dateofbirth" className="block mb-1">
                  Date of Birth:
              </label>
              <input
                  type="date"
                  id="dateofbirth"
                  name="dateofbirth"
                  value={formData.dateofbirth}
                  onChange={handleChange}
                  className={`w-full border ${
                  errors.dateofbirth ? 'border-red-500' : 'border-gray-300'
                  } rounded-md p-2`}
              />
              {errors.dateofbirth && (
                  <p className="text-red-500 text-sm mt-1">{errors.dateofbirth}</p>
              )}
              </div>

              <div>
              <label htmlFor="email" className="block mb-1">
                  Email:
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md p-2`}
              />
              {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
              </div>

              <div>
              <label htmlFor="password" className="block mb-1">
                  Password:
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md p-2`}
              />
              {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              </div>

              <div>
              <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
              >
                  Sign Up
              </button>
              </div>
          </form>
          ) : (
            <form onSubmit={handleLogInSubmit}>
              <div>
              <label htmlFor="email" className="block mb-1">
                  Email:
              </label>
              <input
                  type="email"
                  id="email"
                  name="email"
                  value={logInFormData.email}
                  onChange={handleLogInformChange}
                  className={`w-full border ${
                  logInError.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md p-2`}
              />
              {logInError.email && (
                  <p className="text-red-500 text-sm mt-1">{logInError.email}</p>
              )}
              </div>
              <div>
              <label htmlFor="password" className="block mb-1">
                  Password:
              </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  value={logInFormData.password}
                  onChange={handleLogInformChange}
                  className={`w-full border ${
                  logInError.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-md p-2`}
              />
              {logInError.password && (
                  <p className="text-red-500 text-sm mt-1">{logInError.password}</p>
              )}
              </div>
              <button
                  type="submit"
                  className="w-full bg-blue-500 text-white rounded-md mt-2 py-2 px-4 hover:bg-blue-600"
              >
                  Log In
              </button>
            </form>
          )
        }
        </div>
    </div>
  );
};

export default Login;

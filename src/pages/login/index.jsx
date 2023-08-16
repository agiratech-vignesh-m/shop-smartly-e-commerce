import React, { useState, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  TextField,
  Box,
  Button,
  Paper,
  Typography,
  FormControl,
  InputAdornment,
  IconButton,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-color.png';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { loginSuccess } from '../../redux/userSlice';

const initialState = {
  email: '',
  password: '',
  formErrors: {
    email: '',
    password: '',
  }
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERRORS':
      return { ...state, formErrors: action.errors };
    default:
      return state;
  }
};


const Login = () => {

  const formData = useSelector((state) => state.user.users);
  // console.log('User Data in Login:', formData);
  const [formState, formDispatch] = useReducer(formReducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // console.log("formData", formData)
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = () => {
    validationSchema
      .validate(formState, { abortEarly: false })
      .then(validatedData => {
        const matchingUser = formData.find(user => user.email === validatedData.email);

        if (matchingUser && matchingUser.password === validatedData.password) {
          dispatch(loginSuccess(matchingUser));
          navigate('/home',  { replace: true });

        } else {
          if (!matchingUser) {
            setEmailError('User not found');
            setPasswordError('');
          } else {
            setEmailError('');
            setPasswordError('Invalid password');
          }
        }
      })
      .catch(validationErrors => {
        // console.log("Login validationErrors", validationErrors)
        if (validationErrors && validationErrors.inner) {
        const errors = {};
        validationErrors.inner.forEach(error => {
          errors[error.path] = error.message;
        });
        formDispatch({ type: 'SET_ERRORS', errors });
      }
        setEmailError('');
        setPasswordError('');
      });
  };


  const handleChange = (field, value) => {
    if (field === 'email') {
      setEmailError('');
      formDispatch({ type: 'CHANGE_FIELD', field, value });
      formDispatch({ type: 'SET_ERRORS', errors: { ...formState.formErrors, email: '' } });
    } else if (field === 'password') {
      setPasswordError('');
      formDispatch({ type: 'CHANGE_FIELD', field, value });
      formDispatch({ type: 'SET_ERRORS', errors: { ...formState.formErrors, password: '' } });
    }
  };
  


  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={logo}
          alt='logo'
          style={{
            objectFit: 'contain',
            height: '100vh',
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', bgcolor: '#051F3F' }}>
        <Paper sx={{ width: '60%', height: '50vh', p: 4, border: '2px solid #71CDCC' }}>
          <Typography variant='h3' sx={{ color: '#71CDCC', fontWeight: 'bold', textAlign: 'center', mb: '3rem' }}>
            Login
          </Typography>
          <form>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', padding: '0 2rem 0' }}>
              <FormControl sx={{ width: '100%', minHeight: '6rem' }} variant='standard'>
                <TextField
                  type='email'
                  name='email'
                  label='Email'
                  variant='outlined'
                  fullWidth
                  value={formState.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={Boolean(formState.formErrors.email)}
                  helperText={formState.formErrors.email}
                />
              </FormControl>
            </Box>
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', padding: '0 2rem 0' }}>
              <FormControl sx={{ minHeight: '5rem', width: '100%' }} variant='standard'>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(formState.formErrors.password)}
                  helperText={formState.formErrors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <Visibility sx={{ color: '#71CDCC' }} /> : <VisibilityOff sx={{ color: '#71CDCC ' }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  variant='outlined'
                  label='Password *'
                  name='password'
                  fullWidth
                  value={formState.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
              {emailError && <Typography variant='body2' sx={{ color: 'red', mt: 1 }}>{emailError}</Typography>}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
              {passwordError && <Typography variant='body2' sx={{ color: 'red', mt: 1 }}>{passwordError}</Typography>}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                type='button'
                onClick={handleSubmit}
                variant='contained'
                sx={{ bgcolor: 'red', width: '30%', padding: '1rem', fontWeight: 'bold', '&:hover': { bgcolor: 'red' } }}
              >
                Sign Up
              </Button>
            </Box>
          </form>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Typography variant='inherit'>
              Don't have an account?{' '}
              <Link href="/Sign-Up" sx={{ ml: '0.5rem' }}>Sign Up</Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;

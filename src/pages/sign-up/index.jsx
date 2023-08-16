import React, { useState, useReducer, useEffect } from 'react';
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
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-color.png';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { addUser } from '../../redux/userSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  password: '',
  confirmPassword: '',
  formErrors: {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  }
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERRORS':
      return { ...state, formErrors: action.errors };
    // case 'RESET_FORM':
    //   return initialState;
    default:
      return state;
  }
};


const SignupForm = () => {

  const [formState, formDispatch] = useReducer(formReducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state) => state.user.users);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  // console.log("isRegistered", isRegistered)

  useEffect(() => {
    if (isRegistered) {
      setDialogOpen(true);
      console.log("setDialogOpen", setDialogOpen)
    }
  }, [isRegistered]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  console.log("formData", formData)
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = () => {
    console.log("Check")
    validationSchema
      .validate(formState, { abortEarly: false })
      .then(() => {
        // Check if the email is already registered
        const isEmailRegistered = formData && formData.some(user => user.email === formState.email);
        console.log("isEmailRegistered")
        if (isEmailRegistered) {
          const errors = {
            ...formState.formErrors,
            email: 'This email is already registered',
          };
          formDispatch({ type: 'SET_ERRORS', errors });
        } else {
          const userData = {
            firstName: formState.firstName,
            lastName: formState.lastName,
            email: formState.email,
            address: formState.address,
            password: formState.password,
          };
        console.log("userData", userData)

          dispatch(addUser(userData));
          console.log('check2')
          setIsRegistered(true);

        }
      })
      .catch((validationErrors) => {
        console.log("validationErrors", validationErrors)
        if (validationErrors && validationErrors.inner) {
          const errors = {};
          validationErrors.inner.forEach(error => {
            errors[error.path] = error.message;
          });
          formDispatch({ type: 'SET_ERRORS', errors });
        }
      });
  };


  const handleChange = (field, value) => {
    if (field === 'firstName') {
      formDispatch({ type: 'CHANGE_FIELD', field, value });
      formDispatch({ type: 'SET_ERRORS', errors: { ...formState.formErrors, firstName: '' } });
    } else if (field === 'lastName') {
      formDispatch({ type: 'CHANGE_FIELD', field, value });
      formDispatch({ type: 'SET_ERRORS', errors: { ...formState.formErrors, lastName: '' } });
    } else if (field === 'email') {
      formDispatch({ type: 'CHANGE_FIELD', field, value });
      formDispatch({ type: 'SET_ERRORS', errors: { ...formState.formErrors, email: '' } });
    } else if (field === 'address') {
      formDispatch({ type: 'CHANGE_FIELD', field, value });
      formDispatch({ type: 'SET_ERRORS', errors: { ...formState.formErrors, address: '' } });
    } else if (field === 'password') {
      formDispatch({ type: 'CHANGE_FIELD', field, value });
      formDispatch({ type: 'SET_ERRORS', errors: { ...formState.formErrors, password: '' } });
    } else if (field === 'confirmPassword') {
      formDispatch({ type: 'CHANGE_FIELD', field, value });
      formDispatch({ type: 'SET_ERRORS', errors: { ...formState.formErrors, confirmPassword: '' } });
    }
  };


  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img
          src={logo}
          style={{
            objectFit: 'contain',
            height: '100vh',
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80%', bgcolor: '#051F3F' }}>
        <Paper sx={{ width: '80%', height: '80vh', p: 4, border: '2px solid #71CDCC' }}>
          <Typography variant='h3' sx={{ color: '#71CDCC', fontWeight: 'bold', textAlign: 'center', mb: '4rem' }}>
            Signup Form
          </Typography>
          <form>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', padding: '0 2rem 0' }}>
              <FormControl sx={{ width: '45%', minHeight: '6rem' }} variant='standard'>
                <TextField
                  sx={{}}
                  type='text'
                  name='firstName'
                  label='First Name'
                  variant='outlined'
                  fullWidth
                  value={formState.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  error={Boolean(formState.formErrors.firstName)}
                  helperText={formState.formErrors.firstName}
                />
              </FormControl>

              <FormControl sx={{ width: '45%', minHeight: '6rem' }} variant='standard'>
                <TextField
                  type='text'
                  name='lastName'
                  label='Last Name'
                  variant='outlined'
                  fullWidth
                  value={formState.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  error={Boolean(formState.formErrors.lastName)}
                  helperText={formState.formErrors.lastName}
                />
              </FormControl>
            </Box>
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
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', padding: '0 2rem 0' }}>
              <FormControl fullWidth sx={{ minHeight: '7rem' }} variant='standard'>
                <TextField
                  type='text'
                  name='address'
                  label='Shipping Address'
                  variant='outlined'
                  fullWidth
                  value={formState.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  error={Boolean(formState.formErrors.address)}
                  multiline
                  rows={2}
                  helperText={formState.formErrors.address}
                />
              </FormControl>
            </Box>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', padding: '0 2rem 0' }}>
              <FormControl sx={{ minHeight: '6rem', width: '45%' }} variant='standard'>
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
              <FormControl sx={{ minHeight: '6rem', width: '45%' }} variant='standard'>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(formState.formErrors.confirmPassword)}
                  helperText={formState.formErrors.confirmPassword}
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
                  label='Confirm Password *'
                  name='confirmPassword'
                  fullWidth
                  value={formState.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
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
          {isRegistered && <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description" sx={{padding: '1rem 3rem 1rem'}}>
              Registered Sucessfully
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{padding: '0.5rem 3rem 2rem'}}>
              <Button variant='contained' onClick={() => {
              handleCloseDialog()
              navigate('/login')
            }}>Ok</Button>              
            </DialogActions>
          </Dialog>}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Typography variant='inherit'>
              Already have an account?{' '}
              <Link href="/login" sx={{ ml: '0.5rem' }}>Sign In</Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default SignupForm;

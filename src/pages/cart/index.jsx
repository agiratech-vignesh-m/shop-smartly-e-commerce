import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, Divider, IconButton, DialogContent, DialogContentText, Dialog, DialogActions } from '@mui/material';
import {
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} from '../../redux/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false)


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const gst = total * 0.18; // Assuming 18% GST
    const finalPrice = total + gst;
    return {
      total: formatCurrency(total),
      gst: formatCurrency(gst),
      finalPrice: formatCurrency(finalPrice),
    };
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handlePayment = () => {
    dispatch(clearCart())
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  return (
    <Box sx={{ bgcolor: '#CDD2D8', height: '84.4vh' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', padding: '1rem', fontWeight: 'bold', color: '#001f3f', mb: '0.4rem' }}>
        Your Orders
      </Typography>
      <Box sx={{ padding: '2rem 3rem 2rem', height: '50vh'}}>

        {cartItems.length === 0 ? (
          <Typography variant="h5" sx={{ display: 'flex', justifyContent: 'center', mt: '10rem', color: 'red' }}>Your cart is empty</Typography>
        ) : 
        (
          <Box sx={{ padding: '2rem 3rem 2rem', height: '50vh', overflow: 'scroll', 
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '3px', 
          },
          }}>
            {cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid grey',
                  padding: '1rem 0',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Box>
                    <img
                      src={item.imgUrl}
                      style={{
                        height: "10vh",
                        width: '100%',
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', ml: '5rem', flexDirection: 'column' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.productName}</Typography>
                    <Typography variant="body1" sx={{ mb: '1rem', fontWeight: 'bold' }}>{formatCurrency(item.price)}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mr: '8rem', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'center' }}>Quantity:</Typography>
                    <Button sx={{
                      mt: '1rem', padding: '0.5rem 1rem', bgcolor: 'ButtonHighlight', '&:hover': {
                        bgcolor: 'ButtonHighlight'
                      },
                    }}
                      variant="outlined"
                      startIcon={<RemoveSharpIcon sx={{ padding: '0.5rem 1rem 0.5rem' }} onClick={() => handleDecreaseQuantity(item.id)} />}
                      endIcon={<AddIcon sx={{ padding: '0.5rem 1rem 0.5rem' }} onClick={() => handleIncreaseQuantity(item.id)} />}
                    >
                      {item.quantity}
                    </Button>
                  </Box>

                  <Box>
                    <IconButton
                      onClick={() => handleRemoveItem(item.id)}
                      sx={{ mt: '2rem', mr: '3rem' }}
                    >
                      <DeleteRoundedIcon fontSize="large" sx={{ color: '#001f3f' }} />
                    </IconButton>
                  </Box>
                </Box>


              </Box>
            ))}

          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          // alignItems: 'center',
          marginTop: '3rem',
          bgcolor: '#001f3f',
          height: '14vh'
        }}
      >
        <Box></Box>
        <Box></Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>
          <Typography variant='h6' sx={{ color: '#39cccc' }}>Total price:</Typography>
          <Typography variant='h6' sx={{ color: 'white', mb: '2rem' }}>{calculateTotal().total}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>
          <Typography variant='h6' sx={{ color: '#39cccc' }}>GST:</Typography>
          <Typography variant='h6' sx={{ color: 'white', mb: '2rem' }}>{calculateTotal().gst}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>
          <Typography variant='h6' sx={{ color: '#39cccc' }}>Final price:</Typography>
          <Typography variant='h6' sx={{ color: 'white', mb: '2rem' }}>{calculateTotal().finalPrice}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}>
          <Button
            onClick={() => handlePayment()}
            variant="contained" color="primary" sx={{ marginRight: '3rem', padding: '1rem 2rem 1rem', fontWeight: 'bold' }}>
            Proceed to Pay
          </Button>
        </Box>
        {<Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{ padding: '1rem 3rem 1rem', fontWeight: 'bold' }}>
              Payment Sucessfully. You Order is on the Way.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ padding: '0.5rem 3rem 2rem' }}>
            <Button variant='contained' onClick={() => {
              handleCloseDialog()
              navigate('/home')
            }}>Ok</Button>
          </DialogActions>
        </Dialog>}
      </Box>
    </Box>
  );
}

export default Cart;

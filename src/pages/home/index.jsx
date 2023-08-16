import React, { useEffect, useState } from 'react'
import { Box, Card, Grid, CardActionArea, CardMedia, CardContent, Typography, Button, CardActions, Stack, Divider, styled, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import cart from '../../assets/online-shopping.png'
import axios from 'axios';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/userSlice';
import { addItemToCart } from '../../redux/cartSlice';


function Home() {
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isLoggedIn - Home", isLoggedIn)

  // const loggedInUser = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    // Fetch data from the mock API
    axios.get('https://63bbf047fa38d30d85b54374.mockapi.io/products')
      .then(response => {
        console.log(response.data)
        setProducts(response.data); // Set the fetched products in state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const StyledLink = styled('a')({
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    '&:hover': {
      textDecoration: 'underline',
    },
  });

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const dialogPaperStyle = {
    backgroundColor: '#cdd2d8',
  };

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      console.log("Products:", product)
      dispatch(addItemToCart(product));
      alert('Item added to cart!');
    }
    else {
      handleOpenDialog();
    }

  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', bgcolor: '#cdd2d8' }}>
      <Box sx={{ width: '100%', height: '30vh', bgcolor: '#cdd2d8', marginTop: '3rem', marginBottom: '7rem' }}>
        <Box sx={{ padding: '2rem', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img
            src={cart}
            style={{
              height: "30vh",
              width: '50%',
              objectFit: "contain",
            }}
          />
          <Typography sx={{ color: 'black', fontSize: '1.25rem', fontWeight: '300', fontStyle: 'italic', width: '50%', lineHeight: '2', padding: '0 10rem 0', textAlign: 'center' }}>
            "Discover the Unique: Unveil Exclusivity at Your Fingertips!
            Shop Smartly and Find One-of-a-Kind Treasures,
            Where Every Purchase Tells a Story,
            Experience Shopping Beyond the Ordinary,
            Your Pathway to Uniqueness Starts Here!"
          </Typography>
        </Box>

      </Box>

      <Grid container spacing={6} sx={{ padding: '0 3rem 0' }}>
        {products.map((product) => (
          <Grid item lg={4} xs={12} >

            <Card key={product.id}
              sx={{
                // height: '100%',
                margin: '1rem',
                borderRadius: '1rem',
                '&:hover': { border: '3px solid #39cccc' }
              }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="250"
                  image={product.imgUrl}
                  alt=''
                />
                <CardContent sx={{
                  bgcolor: "#001f3f",
                  color: 'white',
                  // minHeight: '300px', // Set a minimum height for the card content
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ ml: '1rem', color: '#39cccc' }}>
                      Product ID:
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mr: '1rem' }}>
                      {product.id}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ ml: '1rem', color: '#39cccc' }}>
                      Product Name:
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mr: '1rem' }}>
                      {product.productName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ ml: '1rem', color: '#39cccc' }}>
                      Price:
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{ mr: '1rem' }}>
                      {formatCurrency(product.price)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', minHeight: '100px', }}>
                    <Typography gutterBottom variant="h6" component="div" sx={{ ml: '1rem', color: '#39cccc' }}>
                      Description:
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        ml: '1rem',
                        mb: '1rem'
                      }}
                    >
                      {product.description}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
              <Divider sx={{ bgcolor: 'black', }} />
              <CardActions sx={{ display: "flex", justifyContent: 'flex-end', bgcolor: '#39cccc' }}>
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartRoundedIcon sx={{ color: '#E25E63' }} />}
                  sx={{
                    bgcolor: "#001f3f",
                    color: 'white',
                    margin: '1rem',
                    padding: '1rem 2rem 1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: '#E25E63',
                      '& .MuiSvgIcon-root': {
                        color: '#001f3f',
                      },
                    }
                  }}
                  onClick={() => handleAddToCart(product)} // Pass the product details here
                >
                  Add to cart
                </Button>
              </CardActions>
            </Card>

          </Grid>

        ))}
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ textAlign: 'center', color: 'red', mt: '1rem' }} id="alert-dialog-title">
          {"Not Logged In"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontWeight: 'bold', padding: ' 1rem 2rem 1rem' }} >
            You are not logged in. Would you like to log in?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mb: '1rem', display: 'flex', justifyContent: 'space-evenly' }}>
          <Button variant='contained'

            sx={{ color: '#39cccc', bgcolor: '#001f3f', "&:hover": { transform: 'scale(1.15)', bgcolor: '#001f3f' } }}
            onClick={() => {
              handleCloseDialog()
              navigate('/login')
            }}>Yes</Button>
          <Button
            variant='contained'
            sx={{ color: '#39cccc', bgcolor: '#001f3f', "&:hover": { transform: 'scale(1.15)', bgcolor: '#001f3f' } }}
            onClick={handleCloseDialog} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>


      <Box sx={{ width: '100%', bgcolor: '#001f3f', marginTop: '3rem' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', padding: '2rem 0 2rem', height: '30vh' }}>
          <Box sx={{ minHeight: '150px' }}>
            <Typography variant="body2" sx={{ color: 'grey', marginBottom: '1rem' }}>
              ABOUT
            </Typography>
            <Typography variant="body2" sx={{ color: 'black' }}>
              <StyledLink href="/contact">Contact Us</StyledLink><br />
              <StyledLink href="/about">About Us</StyledLink><br />
              <StyledLink href="/careers">Careers</StyledLink><br />
              <StyledLink href="/stories">Flipkart Stories</StyledLink><br />
              <StyledLink href="/press">Press</StyledLink><br />
              <StyledLink href="/wholesale">Flipkart Wholesale</StyledLink><br />
              <StyledLink href="/corporate">Corporate Information</StyledLink>
            </Typography>

          </Box>


          <Box sx={{ minHeight: '150px' }}>
            <Typography variant="body2" sx={{ color: 'grey', marginBottom: '1rem' }}>
              HELP
            </Typography>
            <Typography variant="body2" sx={{ color: 'black' }}>
              <StyledLink href="/payments">Payments</StyledLink><br />
              <StyledLink href="/shipping">Shipping</StyledLink><br />
              <StyledLink href="/returns">Cancellation & Returns</StyledLink><br />
              <StyledLink href="/faq">FAQ</StyledLink><br />
              <StyledLink href="/infringement">Report Infringement</StyledLink>
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ color: 'grey', marginBottom: '1rem' }}>
              CONSUMER POLICY
            </Typography>
            <Typography variant="body2" sx={{ color: 'black' }}>
              <StyledLink href="/returns">Cancellation & Returns</StyledLink><br />
              <StyledLink href="/terms">Terms Of Use</StyledLink><br />
              <StyledLink href="/security">Security</StyledLink><br />
              <StyledLink href="/privacy">Privacy</StyledLink><br />
              <StyledLink href="/sitemap">Sitemap</StyledLink><br />
              <StyledLink href="/grievance">Grievance Redressal</StyledLink><br />
              <StyledLink href="/epr">EPR Compliance</StyledLink>
            </Typography>
          </Box>
          <Box >
            <Typography variant="body2" sx={{ color: 'grey', marginBottom: '1rem' }}>
              Mail Us:
            </Typography>
            <Typography variant="body2" sx={{ color: 'white' }}>
              Shop Smartly<br />
              Ground Floor, O Square, 36/2B,<br />
              Mount Poonamallee Rd, Parangi Malai,<br />
              Chennai, Tamil Nadu 600016
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: 'grey', marginBottom: '1rem' }}>
              Registered Office Address:
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', marginTop: '1rem' }}>
              Shop Smartly,<br />
              1604 US-130,<br />
              North Brunswick Township,<br />
              NJ 08902, USA
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', marginTop: '1rem' }}>
              CIN : U51109KA2012PTC066107
            </Typography>
            <Typography variant="body2" sx={{ color: 'white', marginTop: '1rem' }}>
              Telephone: 044-45614700
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: 'black', padding: '2rem', textAlign: 'center', border: '2px solid #39cccc', }}>

        <FacebookRoundedIcon sx={{ color: '#4867AA', fontSize: 32 }} />
        <YouTubeIcon sx={{ color: '#E1421B', fontSize: 32 }} />
        <TwitterIcon sx={{ color: '#4867AA', fontSize: 32 }} />
        <CameraAltIcon sx={{ color: '#A74AB1', fontSize: 32 }} />
      </Box>


    </Box>
  )
}

export default Home
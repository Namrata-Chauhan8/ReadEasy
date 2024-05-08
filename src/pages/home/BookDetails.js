import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Card,
  CardContent,
  Container,
  Grid,
  Badge,
  Button,
} from "@mui/material";
import Navbar from "../../components/Navbar";

const BookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`https://freetestapi.com/api/v1/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [id]);

  if (!book) {
    return <Typography>Loading...</Typography>;
  }

  const handleClick = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    const existingBookIndex = existingCart.findIndex((cartItem) => cartItem.id === book.id);
    
    if (existingBookIndex !== -1) {
      const updatedCart = existingCart.map((cartItem, index) => {
        if (index === existingBookIndex) {
          return { ...cartItem, quantity: (cartItem.quantity || 1) + 1 };
        }
        return cartItem;
      });
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...existingCart, { ...book, quantity: 1 }];
      
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  
    // Navigate to the cart page
    navigate('/mycart');
  }
  

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <img
                  src={book.cover_image}
                  alt=""
                  style={{ width: "100%", height: "50vh" }}
                />
                <Typography variant="h4" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Author: {book.author}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Description: {book.description}
                </Typography>
                <Typography variant="body2" component="p">
                  <b>Genre:</b>{" "}
                  {book.genre.map((genre, index) => (
                    <span key={index}>
                      {genre}
                      {index < book.genre.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Publication Year: {book.publication_year}
                </Typography>
                <Badge
                  sx={{
                    backgroundColor: "lightblue",
                    border: "1px solid lightblue",
                    borderRadius: "4px",
                    padding: "4px",
                    marginTop: "10px",
                  }}
                >
                  <b>Price: $50</b>
                </Badge>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "10px", display: "flex" }}
                  onClick={handleClick}
                >
                  Add to cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BookDetails;

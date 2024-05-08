import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Badge,
  Button,
} from "@mui/material";
import Navbar from "../../components/Navbar";

const Cart = () => {
  const [selectedBooks, setSelectedBooks] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addBook = (selectedBook) => {
    const updatedBooks = selectedBooks.map((book) => {
      if (book.id === selectedBook.id) {
        return { ...book, quantity: (book.quantity || 0) + 1 };
      }
      return book;
    });
    setSelectedBooks(updatedBooks);
    localStorage.setItem("cart", JSON.stringify(updatedBooks));
  };

  const removeBook = (selectedBook) => {
    const updatedBooks = selectedBooks.map((book) => {
      if (book.id === selectedBook.id) {
        const updatedQuantity = (book.quantity || 1) - 1;
        return { ...book, quantity: updatedQuantity >= 0 ? updatedQuantity : 0 };
      }
      return book;
    }).filter((book) => book.quantity > 0); // Filter out books with quantity > 0
    setSelectedBooks(updatedBooks);
    localStorage.setItem("cart", JSON.stringify(updatedBooks));
  };

  const removeFromCart = (selectedBook) => {
    const updatedBooks = selectedBooks.filter((book) => book.id !== selectedBook.id);
    setSelectedBooks(updatedBooks);
    localStorage.setItem("cart", JSON.stringify(updatedBooks));
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom>
          Cart
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {selectedBooks.map((selectedBook) => (
            <Grid item xs={12} sm={6} md={4} key={selectedBook.id}>
              <Card
                style={{ width: "100%", height: "70vh", maxHeight: "900px" }}
              >
                <CardContent>
                  <img
                    src={selectedBook.cover_image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "20vh",
                      maxHeight: "300px",
                    }}
                  />
                  <Typography variant="h5" gutterBottom>
                    {selectedBook.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Author: {selectedBook.author}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Description: {selectedBook.description}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <b>Genre:</b>{" "}
                    {selectedBook.genre.map((genre, index) => (
                      <span key={index}>
                        {genre}
                        {index < selectedBook.genre.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Publication Year: {selectedBook.publication_year}
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
                  <Typography variant="body1" gutterBottom>
                    <Button
                      variant="outlined"
                      sx={{ marginTop: "10px" }}
                      onClick={() => addBook(selectedBook)}
                    >
                      +
                    </Button>
                    <span style={{ margin: "10px" }}>
                      {selectedBook.quantity || 1}
                    </span>
                    <Button variant="outlined" sx={{ marginTop: "10px" }} onClick={() => removeBook(selectedBook)}>
                      -
                    </Button>
                  </Typography>

                  <Button variant="outlined" sx={{ marginTop: "10px" }} onClick={() => removeFromCart(selectedBook)}>
                    Remove
                  </Button>
                </CardContent>
              </Card>
              <Button>Checkout</Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Cart;

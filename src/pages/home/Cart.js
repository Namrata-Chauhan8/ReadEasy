import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate=useNavigate()
  const [selectedBooks, setSelectedBooks] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [totalBill, setTotalBill] = useState(0);

  const calculateTotalBill = () => {
    if (selectedBooks.length === 0) {
      console.log("no books in cart");
    }
    let total = 0;
    selectedBooks.forEach((book) => {
      total += (50) * (book.quantity);
    });
    return total;
  };

  const handleCheckout = () => {
    setTotalBill(calculateTotalBill());
    setOpenCheckoutDialog(true);
  };

  const handleCloseCheckoutDialog = () => {
    setOpenCheckoutDialog(false);
  };

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
    const updatedBooks = selectedBooks
      .map((book) => {
        if (book.id === selectedBook.id) {
          const updatedQuantity = (book.quantity || 1) - 1;
          return {
            ...book,
            quantity: updatedQuantity >= 0 ? updatedQuantity : 0,
          };
        }
        return book;
      })
      .filter((book) => book.quantity > 0);
    setSelectedBooks(updatedBooks);
    localStorage.setItem("cart", JSON.stringify(updatedBooks));
  };

  const removeFromCart = (selectedBook) => {
    const updatedBooks = selectedBooks.filter(
      (book) => book.id !== selectedBook.id
    );
    setSelectedBooks(updatedBooks);
    localStorage.setItem("cart", JSON.stringify(updatedBooks));
    toast.success("Item removed from cart successfully");
  };

  const handlePurchase = () => {
    toast.success("Book purchased successfully...🥂");
    navigate("/mycart/checkout")
    localStorage.removeItem("cart")
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        {selectedBooks && selectedBooks.length > 0 ? (
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
                      <b>Price: ${selectedBook.price || 50}</b>
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
                      <Button
                        variant="outlined"
                        sx={{ marginTop: "10px" }}
                        onClick={() => removeBook(selectedBook)}
                      >
                        -
                      </Button>
                    </Typography>

                    <Button
                      variant="outlined"
                      sx={{ marginTop: "10px" }}
                      onClick={() => removeFromCart(selectedBook)}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Button
              variant="contained"
              sx={{ margin: "10px", width: "100%" }}
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Grid>
        ) : (
          <h1 style={{ textAlign: "center", color: "red" }}>Cart is empty</h1>
        )}
      </Container>
      <Dialog
        open={openCheckoutDialog}
        onClose={handleCloseCheckoutDialog}
        maxWidth="md"
      >
        <DialogTitle>Payment Information</DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Book Title</b>
                  </TableCell>
                  <TableCell>
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell>
                    <b>Price</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.quantity}</TableCell>
                    <TableCell>
                      ${(book.price || 50) * (book.quantity || 1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography margin={2}>Total Bill: ${totalBill}</Typography>
          <Button variant="contained" onClick={handlePurchase}>Buy Now</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Cart;

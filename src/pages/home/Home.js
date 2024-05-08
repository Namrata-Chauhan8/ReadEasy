import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [initialBooks, setInitialBooks] = useState([]);
  const [value, setValue] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [uniqueYears, setUniqueYears] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);

  const handleSearch = () => {
    const filteredBooks = initialBooks.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    setBooks(filteredBooks);
  };

  const handleFilter = () => {
    let filteredBooks = initialBooks;
    if (filterYear !== "") {
      filteredBooks = filteredBooks.filter(
        (book) => book.publication_year === (filterYear)
      );
    }
    if (filterGenre !== "") {
      filteredBooks = filteredBooks.filter((book) =>
        book.genre.includes(filterGenre)
      );
    }
    setBooks(filteredBooks);
  };

  useEffect(() => {
    axios
      .get("https://freetestapi.com/api/v1/books")
      .then((res) => {
        setBooks(res.data);
        setInitialBooks(res.data);
        
        const years = res.data.map((book) => book.publication_year);
        const uniqueYears = [...new Set(years)];
        setUniqueYears(uniqueYears);

        const genres = res.data.flatMap((book) => book.genre);
        const uniqueGenres = [...new Set(genres)];
        setUniqueGenres(uniqueGenres);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <>
      <Container maxWidth="lg">
      <Navbar />
      <Paper
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          backgroundColor: "lightblue",
          margin: "10px",
          maxWidth: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Paper
        component="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          backgroundColor: "lightblue",
          margin: "10px",
          maxWidth: "100%",
        }}
      >
        <Select
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Year" }}
        >
          <MenuItem value="" disabled>
            Filter by Year
          </MenuItem>
          {uniqueYears.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Genre" }}
        >
          <MenuItem value="" disabled>
            Filter by Genre
          </MenuItem>
          {uniqueGenres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="filter"
          onClick={handleFilter}
        >
          <FilterListIcon/>
        </IconButton>
      </Paper>
     
        <Grid container spacing={3}>
          {books.map((book) => (
            <Grid
              item
              xs={10}
              sm={6}
              md={3}
              key={book.id}
              marginBottom={3}
              marginTop={3}
            >
              <Card sx={{ height: "100%", width: "100%" }}>
                <CardContent>
                  <img
                    src={book.cover_image}
                    alt={book.title}
                    style={{ width: "100%", height: "30vh" }}
                  />
                  <Typography variant="h5" component="h2">
                    {book.title}
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
                  <Typography variant="body2" component="p">
                    <b>Year:</b> {book.publication_year}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "10px" }}
                    onClick={() => {
                      window.location.href = `/home/books/${book.id}`;
                    }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
     
      </Container>
    </>
  );
};

export default Home;

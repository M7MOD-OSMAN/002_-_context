import axios from "axios";
import { createContext, useEffect, useState } from "react";

const BooksContext = createContext();

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const baseUrl = `http://localhost:3001/books`;

  const fetchBooks = async () => {
    const response = await axios.get(`${baseUrl}`);

    setBooks(response.data);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`${baseUrl}/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const createBook = async (title) => {
    const response = await axios.post(`${baseUrl}`, {
      title,
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };
  return (
    <BooksContext.Provider
      value={{ books, createBook, editBookById, deleteBookById, fetchBooks }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export { BooksContext, Provider };

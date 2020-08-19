import React from "react";

export const BookList = ({ books = [] }) => {
  return (
    <div className="bookList">
      {books.map((book) => {
        return (
          <div className="bookItem" key={book.id}>
            <img
              className="bookItem-cover"
              src={book.pictureUrl}
              alt={`${book.name} cover`}
            />
            <div className="bookItem-content">
              <h2>{book.authorName}</h2>
              <p>{book.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

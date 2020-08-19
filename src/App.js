import React, { useState } from "react";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { BookList } from "./components/BookList";
import { LoadingList } from "./components/LoadingList";
import { BookService } from "./services/BookService";
import { Retry } from "./components/Retry";
import { EmptyBookList } from "./components/EmptyBookList";
import "./App.css";

const bookService = BookService();

const When = ({ predicate, children }) => {
  if (!predicate) {
    return <></>;
  }

  return <>{children}</>;
};

const bookListMachine = Machine({
  id: "bookList",
  initial: "loading",
  context: {
    data: [],
    error: null,
    books: [],
  },
  states: {
    loading: {
      invoke: {
        src: "fetchBookList",
        onDone: {
          target: "displayList",
          actions: assign({
            data: (_, event) => event.data,
            books: (_, event) => event.data,
            error: () => null,
          }),
        },
        onError: {
          target: "error",
          actions: assign({
            error: (_, event) => event.data,
          }),
        },
      },
    },
    displayList: {
      entry: assign({
        books: (context, event) => {
          if (event.type === "SEARCHING") {
            return event.query === ""
              ? context.data
              : context.books.filter((book) =>
                  book.name.toLowerCase().includes(event.query.toLowerCase())
                );
          }

          return context.data;
        },
      }),
      always: [
        {
          target: "emptyList",
          cond: function isEmpty(context) {
            return !context.data.length || !context.books.length;
          },
        },
        {
          target: "bookList",
          cond: function isNotEmpty(context) {
            return context.data.length && context.books.length;
          },
        },
      ],
    },
    error: {},
    bookList: {
      on: {
        SEARCHING: "displayList",
      },
    },
    emptyList: {
      on: {
        SEARCHING: "displayList",
      },
    },
  },
});

function App() {
  const [state, send] = useMachine(bookListMachine, {
    services: {
      fetchBookList: () => {
        return bookService.getList();
      },
    },
  });
  const [query, setQuery] = useState("");

  const handleClickRetry = async () => {
    send("loading");
  };

  const handleChangeSearch = ({ target: { value } }) => {
    send({ type: "SEARCHING", query: value });
    setQuery(value);
  };

  console.log("books:", state.context);
  return (
    <div>
      <form className="search-form">
        <input
          className="search-input"
          type="text"
          name="bookSearch"
          placeholder="Search book..."
          id="book-search"
          value={query}
          onChange={handleChangeSearch}
        />
      </form>

      <When predicate={state.value === "loading"}>
        <LoadingList />
      </When>

      <When predicate={state.value === "bookList"}>
        <BookList books={state.context.books} />
      </When>

      <When predicate={state.value === "emptyList"}>
        <EmptyBookList />
      </When>

      <When predicate={state.value === "error"}>
        <Retry onClick={handleClickRetry} />
      </When>
    </div>
  );
}

export default App;

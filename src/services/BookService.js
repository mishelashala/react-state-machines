export const BookService = () => {
  // let counter = 0;
  const books = [
    {
      id: "1",
      name: "The Shinning",
      authorName: "Stephen King",
      pictureUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia1.popsugar-assets.com%2Ffiles%2Fthumbor%2FVDtKKeNUg-lYxPZCrcaxZDfUaOI%2Ffit-in%2F1024x1024%2Ffilters%3Aformat_auto-!!-%3Astrip_icc-!!-%2F2016%2F07%2F06%2F021%2Fn%2F1922283%2F4d7d4fa5_shining%2Fi%2FShining-Stephen-King.jpg&f=1&nofb=1",
    },
    {
      id: "2",
      name: "The Dark Tower",
      authorName: "Stephen King",
      pictureUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fauthormarkpiggott.files.wordpress.com%2F2015%2F06%2Fthe-dark-tower-novel-cover.jpg&f=1&nofb=1",
    },
    {
      id: "3",
      name: "IT",
      authorName: "Stephen King",
      pictureUrl:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fen%2Fthumb%2F5%2F5a%2FIt_cover.jpg%2F220px-It_cover.jpg&f=1&nofb=1",
    },
  ];

  const getList = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // if (counter === 0) {
        //   reject(new Error("Could not load book list"));
        //   counter++;
        // } else {
        resolve(books);
        // }
      }, 1000);
    });
  };

  return {
    getList,
  };
};

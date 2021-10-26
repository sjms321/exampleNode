const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`

  # Book 객체의 형식 지정
  type Book {
    title: String
    author: Author
  }


  type Author {
    #이러면 필수 인자값이라는 뜻
    name: String!
    books: [Book]
  }

  #Query에는, 우리가 서버에서 데이터를 가져올때 사용할 명령어의 형식을 지정해 주는 부분
  type Query {
    #[Book]데이터를 불러올 때 사용할 명령어를 books으로 지정한다.
    books: [Book]
    authors: [Author]
    
  }

  #get외의 쿼리를 작성하는 부분?
  type Mutation {
    addBook(title: String, author: String): Book
  }
  
`;

const books = [
    {
      title: 'The Awakening',
      author: {
          name:"김작가",
          books:[{title:"김작가의 첫연애"},{title:"김작가의 두번째 연애"}]
      },
    },
    {
      title: 'City of Glass',
      author: {
        name:"권작가",
        books:[{title:"권작가의 첫연애"},{title:"권작가의 두번째 연애"}]
    },
    },
    {
        title: 'City of Glass',
        author: {
          name:"최작가",
          books:[{title:"권작가의 첫연애"},{title:"권작가의 두번째 연애"}]
      },
      },
  ];

const authors = [
    {
      name: 'Kate Chopin',
      books: ['The Awakening'],
    },

  ];
  
//books 쿼리를 입력시, 아까만든 books 데이터 불러오기
//데이터 안불러오면 null처리된다. 그냥 객체의 형태만 저장되는 듯
const resolvers = {
    Query: {
      books: () => books,
      authors: () => authors,
    },
  };


//아폴로 서버는 두개의 인자값을 받는다. 스키마 정의와 resolver 세트
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

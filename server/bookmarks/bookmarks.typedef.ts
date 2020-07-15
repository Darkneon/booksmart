const { gql } = require('apollo-server');

export const bookmarksTypeDef = gql`
  extend type Query {
    bookmarks: [Bookmark]
  }
  
  extend type Mutation  {
    createBookmark(url: String, quote: String, tags: [TagInput]): Bookmark
  }
  
  type Bookmark {
    id: Int!
    url: String
    quote: String
    tags: [Tag]
  }
`;

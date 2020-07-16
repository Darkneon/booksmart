const {gql} = require('apollo-server');

export const bookmarksTypeDef = gql`
    type Bookmark {
        attributes: Record
        note: String
        quote: String
        title: String
        url: String
        tags: [Tag]
    }

    extend type Query {
        bookmarks: [Bookmark]
        search(keywords: String, tags: [String], excludeTags: [String]): [Bookmark]
    }

    extend type Mutation {
        createBookmark(quote: String, note: String, title: String, url: String, tags: [TagInput]): Bookmark
    }
`;

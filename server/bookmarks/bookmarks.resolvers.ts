import { insert, all } from "../db";

export const bookmarksResolvers = {
    Query: {
        bookmarks: async () => {
            return all();
        }
    },
    Mutation: {
        async createBookmark (_, { url, quote, tags }) {
            return insert({url, quote, tags});
        },
    }
};
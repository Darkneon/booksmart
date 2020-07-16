import { insert, all, search } from "../db";
import {Bookmark} from "./bookmarks.models";

export const bookmarksResolvers = {
    Query: {
        bookmarks: async () => {
            return all();
        },
        search: async (_, {keywords, tags, excludeTags}) => {
            return search({keywords, tags, excludeTags});
        }
    },
    Mutation: {
        async createBookmark (_, bookmark: Bookmark) {
            return insert(bookmark);
        },
    }
};
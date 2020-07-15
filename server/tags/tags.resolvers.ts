const tags = [
    {id: 1, text: 'computer science'},
    {id: 2, text: 'distributed systems'},
    {id: 3, text: 'programming'},
];

export const tagsResolvers = {
    Query: {
        tags: async () => tags
    }
};
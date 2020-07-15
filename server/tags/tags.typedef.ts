const { gql } = require('apollo-server');

export const tagsTypeDef = gql`
    extend type Query {
        tags: [Tag]
    }
    
    input TagInput {
        name: String
    }
    
    type Tag {
        name: String
    }
`;


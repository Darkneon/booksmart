const { gql } = require('apollo-server');

export const recordsTypeDef = gql`  
  union RecordTypes = Bookmark | Tag
  
  type Record {
    id: Int!
    fields: RecordTypes
    createdDate: Int!
  }
`;

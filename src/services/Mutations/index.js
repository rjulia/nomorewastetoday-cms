import gql from "graphql-tag";

export const NEW_CLIENT = gql`
  mutation setClient($input: ClientInput) {
    setClient(input: $input) {
      id
      name
      surname
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($input: ClientInput) {
    uploadClient(input: $input) {
      id
      name
      surname
      type
      years
      company
      email
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteCLient($id: ID!) {
    deleteClient(id: $id)
  }
`;
// Links

export const NEW_LINK = gql`
  mutation setLink($input: LinkInput) {
    setLink(input: $input) {
      id
      title__en
      title__zh
      url
      content__en
      content__zh
      imageUrl
      category
    }
  }
`;

export const DELETE_LINK = gql`
  mutation deleteLink($id: ID!) {
    deleteLink(id: $id)
  }
`;

export const UPDATE_LINK = gql`
  mutation uploadLink($input: LinkInput) {
    uploadLink(input: $input) {
      id
      title__en
      title__zh
      url
      content__en
      content__zh
      imageUrl
      category
    }
  }
`;

// Locations
export const NEW_LOCATION = gql`
  mutation setLocation($input: LocationInput) {
    setLocation(input: $input) {
      name
      content__en
      content__zh
      address
      imageUrl
      webUrl
      lat
      lng
      tel
      contact
      email
      opening
      facebook
      recycleBy
      category
      district
    }
  }
`;

export const DELETE_LOCATION = gql`
  mutation deleteLocation($id: ID!) {
    deleteLocation(id: $id)
  }
`;

export const UPDATE_LOCATION = gql`
  mutation uploadLocation($input: LocationInput) {
    uploadLocation(input: $input) {
      id
      name
      content__en
      content__zh
      imageUrl
      webUrl
      lat
      lng
      tel
      contact
      email
      opening
      facebook
      recycleBy
      category
      district
    }
  }
`;

// Events
export const NEW_EVENT = gql`
  mutation setEvent($input: EventInput) {
    setEvent(input: $input) {
      title
      place
      content__en
      content__zh
      imageUrl
      webUrl
      lat
      lng
      date
      email
      facebook
      category
      recomendations
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export const UPDATE_EVENT = gql`
  mutation uploadEvent($input: EventInput) {
    uploadEvent(input: $input) {
      id
      title
      place
      content__en
      content__zh
      date
      imageUrl
      webUrl
      lat
      lng
      date
      email
      category
      facebook
      recomendations
    }
  }
`;

// Shops

export const NEW_SHOP = gql`
  mutation setShop($input: ShopInput) {
    setShop(input: $input) {
      name
      address
      phone
      email
      webUrl
      facebook
      instagram
      lng
      lat
      promoded
      imageUrl
      thumbnail
      description
      rate
      plasticfree
      category
    }
  }
`;

export const DELETE_SHOP = gql`
  mutation deleteShop($id: ID!) {
    deleteShop(id: $id)
  }
`;

export const UPDATE_SHOP = gql`
  mutation uploadShop($input: ShopInput) {
    uploadShop(input: $input) {
      id
      name
      address
      phone
      email
      webUrl
      facebook
      instagram
      lng
      lat
      promoded
      imageUrl
      thumbnail
      description
      rate
      plasticfree
      category
    }
  }
`;

// Advices

export const NEW_ADVICE = gql`
  mutation setAdvice($input: AdviceInput) {
    setAdvice(input: $input) {
      title__en
      title__zh
      statement__en
      statement__zh
      author
      contentWhy__en {
        html
        text
      }
      contentWhy__zh {
            html
            text
          }
      contentWhat__en {
            html
            text
          }
      contentWhat__zh {
            html
            text
          }
      contentHow__en {
            html
            text
          }
      contentHow__zh {
            html
            text
          }
      imageUrlWhy
      authorWhy
      linkWhy
      imageUrlWhat
      authorWhat
      linkWhat
      date
      products {
        id
      }
    }
  }
`;

export const DELETE_ADVICE = gql`
  mutation deleteAdvice($id: ID!) {
    deleteAdvice(id: $id)
  }
`;

export const UPDATE_ADVICE = gql`
  mutation uploadAdvice($input: AdviceInput) {
    uploadAdvice(input: $input) {
      id
      title__en
      title__zh
      statement__en
      statement__zh
      author
      contentWhy__en {
        html
        text
      }
      contentWhy__zh {
            html
            text
          }
      contentWhat__en {
            html
            text
          }
      contentWhat__zh {
            html
            text
          }
      contentHow__en {
            html
            text
          }
      contentHow__zh {
            html
            text
          }
      imageUrlWhy
      authorWhy
      linkWhy
      imageUrlWhat
      authorWhat
      linkWhat
      date
      products {
        id
      }
    }
  }
`;



// Products
export const NEW_PRODUCT = gql`
  mutation setProduct($input: ProductInput) {
    setProduct(input: $input) {
      name__en
      name__zh
      price
      link
      newness
      imageUrl
      description__en
      description__zh
      brand
      category
    }
  }
`;



export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;


export const UPDATE_PRODUCT = gql`
  mutation uploadProduct($input: ProductInput) {
    uploadProduct(input: $input) {
      id
      name__en
      name__zh
      price
      link
      newness
      imageUrl
      description__en
      description__zh
      brand
      category
    }
  }
`;


//Oders 

export const NEW_ORDER = gql`
  mutation setOrders($input: OrderInput){
    setOrders(input: $input){
      id
    }
  }
`;

export const UPDATE_ORDERS = gql`
  mutation updateOrders($input: OrderInput){
    updateOrders(input: $input){
      id
      date
      total
      state
      order{
        id
        quantity
      }
    }
  }
`;
// Users

export const CREATE_USER = gql`
  mutation createUser($user: String!, $name: String!, $rol: String!, $password: String!){
    createUser(user: $user, name: $name, rol: $rol, password: $password)
  }
`;


export const AUTH_USER = gql`
  mutation authUser($user: String!, $password: String!){
    authUser(user: $user, password: $password){
      token
    }
  }
`;


// update filr

export const UPLOAD_FILE = gql`
mutation singleUpload($file: Upload!) {
  singleUpload(file: $file) {
    path
    filename
  }
}
`
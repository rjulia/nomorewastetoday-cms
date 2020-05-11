import gql from 'graphql-tag';

// CLientes
export const CLIENTS_QUERY = gql`
  query getClients($limit: Int, $offset: Int, $seller: String) {
    getClients(limit: $limit, offset: $offset, seller: $seller) {
      id
      name
      surname
      company
    }
    totalClients
  }
`;

export const CLIENT_QUERY = gql`
  query getClient($id: ID) {
    getClient(id: $id) {
      id
      name
      surname
      type
      years
      email
      company
      seller
    }
  }
`;
// clientes graficas
export const TOP_CLIENTS = gql`
  query topClients {
    topClients {
      total
      client {
        namecomplete
        name
      }
    }
  }
`;

export const TOP_SELLERS = gql`
  query topSellers {
    topSellers {
      total
      seller {
        name
      }
    }
  }
`;
// Links
export const LINKS_QUERY = gql`
  query getLinks {
    getLinks {
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

export const LINK_QUERY = gql`
  query getLink($id: ID) {
    getLink(id: $id) {
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

// Events
export const EVENTS_QUERY = gql`
  query getEvents {
    getEvents {
      id
      title
      date
      category
    }
  }
`;

export const EVENT_QUERY = gql`
  query getEvent($id: ID) {
    getEvent(id: $id) {
      id
      title
      place
      content__zh
      content__en
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
export const SHOPS_QUERY = gql`
  query getShops {
    getShops {
      id
      name
      promoded
      category
    }
  }
`;

export const SHOP_QUERY = gql`
  query getShop($id: ID) {
    getShop(id: $id) {
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
export const ADVICES_QUERY = gql`
  query getAdvices {
    getAdvices {
      id
      title__en
      author
    }
  }
`;

export const ADVICE_QUERY = gql`
  query getAdvice($id: ID) {
    getAdvice(id: $id) {
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

// Locations
export const LOCATIONS_QUERY = gql`
  query getLocations {
    getLocations {
      id
      name
      category
      district
    }
  }
`;

export const LOCATION_QUERY = gql`
  query getLocation($id: ID) {
    getLocation(id: $id) {
      id
      name
      content__en
      content__zh
      address
      imageUrl
      webUrl
      lat
      lng
      tel
      opening
      facebook
      recycleBy
      category
      district
    }
  }
`;

//products
export const PRODUCTS_QUERY = gql`
  query getProducts($category: TypeProduct) {
    getProducts(category: $category) {
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
    totalProducts
  }
`;

export const PRODUCT_QUERY = gql`
  query getProduct($id: ID) {
    getProduct(id: $id) {
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

export const SUBSCRIBERS_QUERY = gql`
  query getEmailCampaing {
    getEmailCampaing {
      id
      email_address
      unique_email_id
      timestamp_opt
      web_id
      email_type
      status
    }
  }
`;

//orders
export const ORDERS_QUERY = gql`
  query getOrders($client: String) {
    getOrders(client: $client) {
      id
      date
      total
      state
      order {
        id
        quantity
      }
    }
  }
`;

// Users

export const CURRENT_USER = gql`
  query getUser {
    getUser {
      id
      user
      name
      rol
    }
  }
`;

export const FILES = gql`
  query uploads {
    uploads {
      id
      filename
      mimetype
      path
    }
  }
`;


import { ApolloClient, InMemoryCache} from "@apollo/client";

//Database Connection
export const  client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache()
})
  
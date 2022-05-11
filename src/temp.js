// import { useQuery, gql} from "@apollo/client";
// import { useEffect } from 'react';
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import MiniCart from "./pages/MiniCart";



function App() {

  // const getProducts = gql `
  //   query{
  //     categories{
  //       name,
  //       products{
  //         id,
  //         name,
  //       }
  //     }
  //   }
  // `;

  // const { loading, error, data } = useQuery(getProducts);

  // useEffect(() => {
  //   console.log(data)
  // }, [data])
  

  

  return (
    <>
    <Navbar />

    <MiniCart />
      
    </>
  );
}

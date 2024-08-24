import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

//entity adapter
const products = createEntityAdapter({});
const initialState = products.getInitialState();

const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedProducts = responseData.map((product) => {
          product.id = product._id;
          return product;
        });
        return products.setAll(initialState, loadedProducts);
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;
export const selectProductsResult = productsApiSlice.endpoints.getProducts.select();

export const { selectAll: selectAllProducts, selectById: selectProductById, selectIds: selectProductIds } =
  //pass in a selector that returns the users slice of state
  products.getSelectors((state) => selectProductsResult(state).data ?? initialState);

import axios from 'axios'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    productsData: [],
    loading: false
}

export const fetchAllProducts = createAsyncThunk("products/getAPI", async () => {
    const response = await axios.get("https://newramana.azurewebsites.net/api/product");
    console.log(response);
    console.log('sa');
    return response.data.data;
});

export const saveNewProduct = createAsyncThunk("products/getApi", async (payload) => {
    const response = await axios.post("https://newramana.azurewebsites.net/api/product", payload)
    console.log(payload);
    return response.data
})
export const productSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state, action) => {

            state.productsData = action.payload
            state.loading = true
        })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.productsData = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                // state.loading = false
            })
            .addCase(saveNewProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(saveNewProduct.fulfilled, (state) => {
                state.loading = false
            })
    }
})

export const getAllProducts = (state) => state.product.productsData;
export const getLoading = (state) => state.product.loading
export default productSlice.reducer
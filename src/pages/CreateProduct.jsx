import React, { useEffect } from "react";
import "../scss/productdetails.scss";
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCategories, getAllCategories } from "../features/categories/categorySlice";
import { fetchAllMaterials, getAllMaterials } from "../features/materials/materialSlice"
import { getLoading, getAllGenders, fetchAllGenders } from "../features/genders/genderSlice";
import { fetchAllColors, getAllColors } from "../features/colors/colorSlice";
import { saveNewProduct } from "../features/products/productSlice";

import * as yup from 'yup';
const CreateProduct = () => {
    const navigate = useNavigate();
    const validScheme = yup.object().shape({
        Name: yup.string()
            .required("Name is required"),
        Images: yup.mixed()
            .required("Image is required"),
        Description: yup.string()
            .min(10, 'Description must be at least 10 characters long')
            .required('Description is required'),
        Price: yup.number()
            .positive('Price must be a positive number')
            .required('Price is required'),
        StockKeepingUnit: yup.number()
            .integer('Stock must be an integer')
            .required('Stock is required'),
    });



    let dispatch = useDispatch();
    const loading = useSelector(getLoading)
    const categories = useSelector(getAllCategories)
    const colors = useSelector(getAllColors)
    const genders = useSelector(getAllGenders)
    let materials = useSelector(getAllMaterials)


    useEffect(() => {
        dispatch(fetchAllCategories())
        dispatch(fetchAllMaterials())
        dispatch(fetchAllColors())
        dispatch(fetchAllGenders())
    }, [dispatch])


    const submitHandler = (data) => {
        console.log(data);
        var req = new FormData()
        req.append('Name', data.Name)
        for (const image of data.Images) {
            req.append("Images", image);
        }
        req.append('Images', data.Images)
        req.append('Description', data.Description)
        data.MaterialIds.forEach((id, index) => {
            req.append(`MaterialIds[${index}]`, id);
        });
        data.ColorIds.forEach((id, index) => {
            req.append(`ColorIds[${index}]`, id);
        });
        req.append("Price", data.Price)
        req.append("GenderId", data.GenderId)
        req.append("CategoryId", data.CategoryId)
        req.append("StockKeepingUnit", data.StockKeepingUnit)
        dispatch(saveNewProduct(req));
        if (!loading) {
            navigate('/products')
        }
    }


    let options = [];

    materials && materials.map(e => {
        let option = {
            label: e.name,
            value: e.id,
        }
        options.push(option)
    })
    let options2 = [];

    colors && colors.map(e => {
        let option = {
            label: e.name,
            value: e.id,
        }
        options2.push(option)
    })
    return (
        <div className="productdetails">
            <Formik
                validationSchema={validScheme}
                initialValues={{
                    Name: '',
                    Description: '',
                    StockKeepingUnit: '',
                    ColorIds: [],
                    GenderId: '',
                    MaterialIds: [],
                    Price: '',
                    Images: [],
                }}
                onSubmit={submitHandler}
            >
                {({ touched, errors, setFieldValue }) => (
                    <Form className="form">
                        <div className="productdetails__title is-invalid">
                            <label className="title__h" htmlFor="Name">Name</label>
                            <Field name="Name" placeholder="Name"
                                className='edit_inputs' />
                        </div>
                        <ErrorMessage
                            name="Name"
                            component="div"
                            className="invalid-feedback"
                        />
                        <div className="productdetails__title is-invalid">
                            <label className="title__h" htmlFor="Description">Description</label>
                            <Field name="Description" placeholder="Description"
                                className='edit_inputs' />
                        </div>
                        <ErrorMessage
                            name="Description"
                            component="div"
                            className="invalid-feedback"
                        />
                        <div className="productdetails__title is-invalid">
                            <label className="title__h" htmlFor="StockKeepingUnit">Stock</label>
                            <Field name="StockKeepingUnit" type="number" placeholder="Stock"
                                className='edit_inputs' />
                        </div>
                        <ErrorMessage
                            name="StockKeepingUnit"
                            component="div"
                            className="invalid-feedback"
                        />
                        <div className="productdetails__title is-invalid">
                            <label className="title__h" htmlFor="Price">Price</label>
                            <Field name="Price" type="number" placeholder="Price"
                                className='edit_inputs' />
                        </div>
                        <ErrorMessage
                            name="Price"
                            component="div"
                            className="invalid-feedback"
                        />

                        <div className="productdetails__title is-invalid">
                            <label className="title__h" htmlFor="CategoryId">Category</label>
                            <Field name="CategoryId" placeholder="Category" as='select'
                                className='edit_inputs' >
                                <option disabled >Select Category</option>
                                {
                                    categories && categories.map(e => (
                                        <option value={e.id}>{e.name}</option>
                                    ))
                                }
                                <option value={null}>Other</option>

                            </Field>
                        </div>
                        <ErrorMessage
                            name="CategoryId"
                            component="div"
                            className="invalid-feedback"
                        />
                        <div className="productdetails__title is-invalid">
                            <label className="title__h" htmlFor="GenderId">Gender</label>
                            <Field name="GenderId" placeholder="Gender" as='select'
                                className='edit_inputs' >
                                <option disabled >Select Gender</option>
                                {
                                    genders && genders.map(e => (
                                        <option value={e.id}>{e.name}</option>
                                    ))
                                }
                                <option value={null}>Other</option>

                            </Field>
                        </div>
                        <ErrorMessage
                            name="CategoryId"
                            component="div"
                            className="invalid-feedback"
                        />
                        <div className="productdetails__title is-invalid">
                            <label className="title__h" htmlFor="MaterialIds">Materials</label>
                            <Select name="MaterialIds" options={options} isMulti={true} className="edit_inputs" onChange={e => setFieldValue("MaterialIds", e.map(e => e.value))} />
                        </div>
                        <ErrorMessage
                            name="MaterialIds"
                            component="div"
                            className="invalid-feedback"
                        />

                        <div className="productdetails__title is-invalid">
                            <label className="title__h" htmlFor="ColorIds">Colors</label>
                            <Select options={options2} isMulti={true} className="edit_inputs" onChange={e => setFieldValue("ColorIds", e.map(e => e.value))} />
                        </div>
                        <ErrorMessage
                            name="ColorIds"
                            component="div"
                            className="invalid-feedback"
                        />
                        <div className="productdetails__title is-invalid">
                            <label className="title__h" htmlFor="Images">Image</label>
                            <input type="file" name="Images" multiple={true} className="edit_inputs" onChange={(event) => {
                                setFieldValue("Images", event.currentTarget.files);
                            }} />
                        </div>
                        <ErrorMessage
                            name="Images"
                            component="div"
                            className="invalid-feedback"
                        />
                        <button type="submit" className="bg-success  text-light">Save</button>
                    </Form>

                )}
            </Formik>
        </div>

    );
};

export default CreateProduct;

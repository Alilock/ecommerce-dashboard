import React, { useEffect } from 'react'
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllCategories, getAllCategories, getLoading } from '../features/categories/categorySlice'
const Categories = () => {
    const navigate = useNavigate();

    const categories = useSelector(getAllCategories);
    const loading = useSelector(getLoading)
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllCategories())
    }, [dispatch])
    return (

        <div className="products" >
            <div className='addbtn'>
                <button className="border-0  bg-light" onClick={() => navigate('/CreateCategory')}>
                    <i className='bx bx-folder-plus'></i>

                </button></div>
            <div className="col-12 p-0">
                <table className="table ">
                    <thead className="p-0">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Name</th>
                            <th scope="col">Parent Category</th>
                            <th className="d-none d-md-block " scope="col">
                                Status
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <div className="my__box ">
                        {
                            loading ? <div className="loader"> <ReactLoading type="bubbles" color="#ff9066" width={100} height={100} /> </div> :
                                categories && categories.map((g, i) => {
                                    return (
                                        <tbody>
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td className="image__td">
                                                    <img
                                                        src={`https://newramana.azurewebsites.net/uploads/images/${g.imagePath}`}

                                                        alt=""
                                                    />
                                                </td>
                                                <td>{g.name}</td>
                                                <td>{g.parentName ? g.parentName : "This is Parent "}</td>
                                                <td className="d-none d-md-block ">
                                                    <select
                                                        className="form-select"
                                                        aria-label="Default select example"
                                                    >
                                                        {g.deleteDate ? (<>
                                                            <option >active</option>
                                                            <option selected value="1">deactive</option>
                                                        </>) : (<>
                                                            <option selected>active</option>
                                                            <option value="1">deactive</option>
                                                        </>)}

                                                    </select>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => navigate("/productdetails")}
                                                        className="border-0 bg-light"
                                                    >
                                                        edit
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>)
                                })
                        }
                    </div>
                </table>
            </div>
        </div >
    )
}

export default Categories
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from "react";
import ReactLoading from 'react-loading';
import { useNavigate } from "react-router-dom";
import "../scss/products.scss";
import { fetchAllProducts, getAllProducts, getLoading } from '../features/products/productSlice'

const Products = () => {
  const navigate = useNavigate();

  const products = useSelector(getAllProducts);
  const loading = useSelector(getLoading)
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])
  console.log(products);
  return (

    <div className="products">
      <div className='addbtn'>
        <button className="border-0  bg-light" onClick={() => navigate('/CreateProduct')}>
          <i class='bx bx-folder-plus'></i>

        </button></div>
      <div className="col-12 p-0">
        <table class="table ">
          <thead className="p-0">
            <tr>
              <th scope="col">#</th>
              <th scope="col">sekil</th>
              <th scope="col">ad</th>
              <th className="d-none d-md-block " scope="col">
                say
              </th>
              <th className="d-none d-md-block " scope="col">
                qiymet
              </th>
              <th className="d-none d-md-block " scope="col">
                status
              </th>
              <th>edit</th>
            </tr>
          </thead>
          <div className="my__box ">
            {
              loading ? <div className="loader"> <ReactLoading type="bubbles" color="#ff9066" width={100} height={100} /> </div> :
                products && products.map(p => (
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td className="image__td">
                        <img
                          src={`https://newramana.azurewebsites.net/uploads/images/${p.images[0].path}`}
                          alt="productimage"
                        />
                      </td>
                      <td>{p.name}</td>
                      <td className="d-none d-md-block ">{p.stockKeepingUnit}</td>
                      <td className="d-none d-md-block ">{p.price}azn</td>

                      <td className="d-none d-md-block ">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>active</option>
                          <option value="1">deactive</option>
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
                  </tbody>
                ))
            }
          </div>
        </table>
      </div>
    </div>
  );
};

export default Products;

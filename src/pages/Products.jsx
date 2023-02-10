import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import "../scss/products.scss";
import pen from "../assets/images/Vector.png";
import Swal from "sweetalert2";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil, BsSearch } from "react-icons/bs";
import {
  getIsDeleting,
  deleteProduct,
  fetchAllProducts,
  getAllProducts,
  getLoading,
} from "../features/products/productSlice";

const Products = () => {
  const navigate = useNavigate();

  const products = useSelector(getAllProducts);
  const loading = useSelector(getLoading);
  const isDeleting = useSelector(getIsDeleting);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch, isDeleting]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        if (isDeleting) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  };
  return (
    <div className="products">
      {/* <label htmlFor="search">
        <BsSearch />
      </label> */}
      <input className="search__input" type="text" placeholder="search" />
      <div className="addbtn">
        <button
          className="border-0  bg-light"
          onClick={() => navigate("/CreateProduct")}
        >
          add product
        </button>
      </div>
      <div className="col-12 p-0">
        <table className="table ">
          <thead className="p-0">
            <tr>
              <th scope="col">#</th>
              <th scope="col">ad</th>
              <th scope="col">sekil</th>
              <th className="d-none d-md-block " scope="col">
                cat
              </th>
              <th className="d-none d-md-block " scope="col">
                qiymet
              </th>
              <th className="d-none d-md-block " scope="col">
                say
              </th>
              <th>action</th>
            </tr>
          </thead>
          <div className="my__box ">
            {loading ? (
              <div className="loader">
                {" "}
                <ReactLoading
                  type="bubbles"
                  color="#ff9066"
                  width={100}
                  height={100}
                />{" "}
              </div>
            ) : (
              products &&
              products.map((p) => (
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td className="td__name">{p.name}</td>

                    <td className="image__td">
                      <img
                        src={`https://newramana.azurewebsites.net/uploads/images/${p.images[0].path}`}
                        alt="productimage"
                      />
                    </td>
                    <td className="d-none d-md-block ">shoes</td>

                    <td className="d-none d-md-block ">{p.stockKeepingUnit}</td>
                    <td className="d-none d-md-block ">{p.price}azn</td>

                    {/* <td className="d-none d-md-block ">
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>active</option>
                        <option value="1">deactive</option>
                      </select>
                    </td> */}
                    <td className="edit__td">
                      {/* <button className="border-0 bg-light">edit</button> */}
                      <br />
                      <span className="edit__pen__span">
                        {/* <img
                          className="edit__pen"
                          onClick={() => navigate("/productdetails")}
                          src={pen}
                          alt=""
                        /> */}
                        <BsPencil onClick={() => navigate("/productdetails")} />
                      </span>
                      <span>
                        <AiOutlineDelete onClick={() => handleDelete(p.id)} />
                      </span>
                      {/* <button onClick={() => handleDelete(p.id)}>delete</button> */}
                    </td>
                  </tr>
                </tbody>
              ))
            )}
          </div>
        </table>
      </div>
    </div>
  );
};

export default Products;

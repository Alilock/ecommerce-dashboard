import { spacing } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  fetchAllOrders,
  getStatus,
  updateOrder,
} from "../features/order/orderSlice";
import "../scss/orders.scss";

const Orders = () => {
  const [orderStatus, setOrderStatus] = useState({
    status: null,
    id: null,
  });
  console.log(orderStatus);
  const dispatch = useDispatch();
  const order = useSelector(getOrder);
  const status = useSelector(getStatus);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  return status === "pending" ? (
    <h1>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, autem.
    </h1>
  ) : (
    <div className="order">
      <div className="col-12 p-0">
        <table className="table ">
          <thead className="p-0">
            <tr>
              <th scope="col">#</th>
              <th scope="col">name of byer</th>
              <th scope="col">name of pr</th>

              <th scope="col">date</th>
              {/* <th scope="col">quantity</th> */}
              <th scope="col">status</th>
            </tr>
          </thead>
          <div className="my__box ">
            {order &&
              order.map((ord) => (
                <tbody>
                  <tr>
                    <th scope="row">{ord && ord.id}</th>
                    <td style={{ width: "100px" }}>
                      {ord.user && ord.user.name}
                    </td>
                    <td style={{ width: "100px" }}>
                      {ord.orderItems &&
                        ord.orderItems.map((o) => (
                          <span>{o.product.name},</span>
                        ))}
                    </td>
                    <td>
                      {ord.createdDate && ord.createdDate.substring(0, 10)}
                    </td>
                    <td>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) =>
                          dispatch(
                            updateOrder({ status: e.target.value, id: ord.id })
                          )
                        }
                      >
                        <option selected disabled value={ord && ord.status}>
                          {ord && ord.status}
                        </option>
                        <option value="ondelivery">ondelivery</option>
                        <option value="delivered">delivered</option>
                        <option value="fail">fail</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              ))}
          </div>
        </table>
      </div>
    </div>
  );
};

export default Orders;

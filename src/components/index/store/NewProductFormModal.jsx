import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNewProductModal } from "../../../features/dashboard/modalSlice";
import axios from "axios";
import { authHeader } from "../../../app/services/auth-services/auth-header";
import { getCurrentStore } from "../../../app/services/auth-services/auth-service";
import "./product.css";
import "./modal.css";
import ProductImagesUpload from "./ProductImagesUpload";
import {
  clearBlankImages,
  clearForm,
  setDescription,
  setName,
  setNewProduct,
  setPrice,
  unshiftNewProduct,
} from "../../../features/dashboard/productSlice";

function NewProductFormModal({ checkLoader }) {
  const dispatch = useDispatch();
  const { storeId } = useSelector((store) => store.store);
  const { name, description, price, productImages } = useSelector(
    (store) => store.product
  );

  const data = {
    product: {
      name: name,
      price: price,
      description: description,
      store_id: storeId,
      images: productImages.slice(1),
    },
  };

  const headers = authHeader(getCurrentStore());

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/v1/products/`, data, { headers })

      .then((response) => {
        const data = response.data;
        console.log(data);
        dispatch(setNewProduct(data.last_product));
        dispatch(unshiftNewProduct());
      });
    checkLoader(3000);
    dispatch(closeNewProductModal());
    dispatch(clearForm());
    dispatch(clearBlankImages());
  };

  return (
    <aside className="modal-container">
      <div className="modal">
        <div style={{ display: "table", height: "100%", margin: "0 auto" }}>
          <div
            style={{
              display: "table-cell",
              verticalAlign: "middle",
              textAlign: "center",
              padding: "50px",
            }}
          >
            <h3 className="header">Add New Product</h3>
            <div className="field ">
              <label style={{ textAlign: "left" }}>Choose Upto 3 images</label>
            </div>
            <br />
            <ProductImagesUpload checkLoader={checkLoader} />
            <form className="ui form ">
              <div className="field ">
                <label style={{ textAlign: "left" }}>Name</label>
                <input
                  type="text"
                  placeholder="Name Your Product "
                  onChange={(event) => dispatch(setName(event.target.value))}
                />
              </div>
              <div className="field ">
                <label style={{ textAlign: "left" }}>Description</label>
                <textarea
                  type="text"
                  placeholder="Describe Your Product "
                  rows={5}
                  cols={5}
                  onChange={(event) =>
                    dispatch(setDescription(event.target.value))
                  }
                />
              </div>
              <div className="field ">
                <label style={{ textAlign: "left" }}>Set Price</label>
                <div className="ui right labeled input">
                  <input
                    type="text"
                    placeholder="Amount"
                    id="amount"
                    onChange={(event) => dispatch(setPrice(event.target.value))}
                  />
                  <div className="ui basic label">AUD</div>
                </div>
              </div>
              <div className="actions">
                <div className="ui green button" onClick={handleSubmit}>
                  Save
                </div>
                <div
                  className="ui red button"
                  onClick={() => {
                    dispatch(closeNewProductModal());
                    dispatch(clearForm());
                  }}
                >
                  Close
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </aside>
    // <div className="modal-forms">
    //   <div className="ui active modal">
    // <div style={{ display: "table", height: "100%", margin: "0 auto" }}>
    //   <div
    //     style={{
    //       display: "table-cell",
    //       verticalAlign: "middle",
    //       textAlign: "center",
    //       padding: "50px",
    //     }}
    //   >
    //     <h2 className="header">Add New Product</h2>
    //     <br />
    //     <div className="field ">
    //       <label style={{ textAlign: "left" }}>Choose Upto 3 images</label>
    //     </div>
    //     <br />
    //     <ProductImagesUpload checkLoader={checkLoader} />
    //     <br />
    //     <br />
    //     <form className="ui form ">
    //       <div className="field ">
    //         <label style={{ textAlign: "left" }}>Name</label>
    //         <input
    //           type="text"
    //           placeholder="Name Your Product "
    //           onChange={(event) => dispatch(setName(event.target.value))}
    //         />
    //       </div>
    //       <div className="field ">
    //         <label style={{ textAlign: "left" }}>Description</label>
    //         <textarea
    //           type="text"
    //           placeholder="Describe Your Product "
    //           onChange={(event) =>
    //             dispatch(setDescription(event.target.value))
    //           }
    //         />
    //       </div>
    //       <div className="field ">
    //         <label style={{ textAlign: "left" }}>Set Price</label>
    //         <div className="ui right labeled input">
    //           <input
    //             type="text"
    //             placeholder="Amount"
    //             id="amount"
    //             onChange={(event) => dispatch(setPrice(event.target.value))}
    //           />
    //           <div className="ui basic label">AUD</div>
    //         </div>
    //       </div>
    //       <div className="actions">
    //         <div className="ui green button" onClick={handleSubmit}>
    //           Save
    //         </div>
    //         <div
    //           className="ui red button"
    //           onClick={() => {
    //             dispatch(closeNewProductModal());
    //             dispatch(clearForm());
    //           }}
    //         >
    //           Close
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    //   </div>
    // </div>
  );
}

export default NewProductFormModal;

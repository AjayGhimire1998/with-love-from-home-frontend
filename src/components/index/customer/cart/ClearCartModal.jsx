import React from 'react'
import { useDispatch } from 'react-redux';
import { clearCart, closeClearCartModal } from '../../../../features/home/homeproductSlice';
import "../../store/modal.css";

function ClearCartModal() {
    const dispatch = useDispatch();
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
          <h4>Clear All the Items ?</h4>
          <br />
          <br />
          <div className="btn-container">
            <button
              type="button"
              className="ui button tiny red"
              onClick={() => dispatch(clearCart())}
            >
              Confirm
            </button>
            <button
              type="button"
              className="ui button tiny green"
              onClick={() => {
                dispatch(closeClearCartModal());
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
  )
}

export default ClearCartModal
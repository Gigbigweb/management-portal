import React, { useEffect, useState } from "react";
import axios from "axios";
import { Url } from "src/url/url";

const Coupon = () => {
  const [allCoupons, setAllCoupons] = useState([]);

  // Create Coupon Data
  const [couponData, setCouponData] = useState({
    couponCode: "",
    discountType: "",
    discount: "",
    totalCoupon: "",
  });

  // Edit Coupon
  const [editData, setEditData] = useState(null);

  // Modal Controls
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleChange = (e) => {
    setCouponData({ ...couponData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Fetch All Coupons
  const fetchCoupons = async () => {
    const res = await axios.get(`${Url}/coupon/all`);
    setAllCoupons(res.data);
  };

  // CREATE
  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post(`${Url}/coupon/create`, couponData);
    fetchCoupons();

    setCouponData({
      couponCode: "",
      discountType: "",
      discount: "",
      totalCoupon: "",
    });

    setShowCreateModal(false);
  };

  // EDIT
  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`${Url}/coupon/update/${editData._id}`, editData);
    fetchCoupons();
    setShowEditModal(false);
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      await axios.delete(`${Url}/coupon/delete/${id}`);
      fetchCoupons();
    }
  };

  // Open Edit Modal + Pre-fill form
  const openEditModal = (item) => {
    setEditData(item);
    setShowEditModal(true);
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="fw-bold mb-3">Coupon List</h2>

        <button
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          + Generate New Coupon
        </button>
      </div>

      {/* ===================== COUPON LIST ===================== */}
      <div className="row mt-3">
        {allCoupons.map((item) => (
          <div className="col-md-4" key={item._id}>
            <div className="card p-3 shadow-sm mb-3">
              <h5>🎟 {item.couponCode}</h5>
              <p>
                Discount:{" "}
                {item.discountType === "percentage"
                  ? `${item.discount}%`
                  : `₹${item.discount}`}
              </p>
              <p>Remaining Coupon: {item.remainingCoupon}</p>

              <span
                className={`badge ${
                  item.isActive ? "bg-success" : "bg-danger"
                }`}
              >
                {item.isActive ? "Active" : "Inactive"}
              </span>

              <div className="mt-3 d-flex gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => openEditModal(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===================== CREATE COUPON MODAL ===================== */}
      {showCreateModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Generate New Coupon</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>

              <form onSubmit={handleCreate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Coupon Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="couponCode"
                      value={couponData.couponCode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Discount Type</label>
                    <select
                      className="form-select"
                      name="discountType"
                      value={couponData.discountType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Choose one</option>
                      <option value="percentage">Percentage (%)</option>
                      <option value="flat">Flat (₹)</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Discount</label>
                    <input
                      type="number"
                      className="form-control"
                      name="discount"
                      value={couponData.discount}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Total Coupon</label>
                    <input
                      type="number"
                      className="form-control"
                      name="totalCoupon"
                      value={couponData.totalCoupon}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Close
                  </button>
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ===================== EDIT COUPON MODAL ===================== */}
      {showEditModal && editData && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title">Edit Coupon</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Coupon Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="couponCode"
                      value={editData.couponCode}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Discount Type</label>
                    <select
                      className="form-select"
                      name="discountType"
                      value={editData.discountType}
                      onChange={handleEditChange}
                      required
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="flat">Flat (₹)</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Discount</label>
                    <input
                      type="number"
                      className="form-control"
                      name="discount"
                      value={editData.discount}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Total Coupon</label>
                    <input
                      type="number"
                      className="form-control"
                      name="totalCoupon"
                      value={editData.totalCoupon}
                      onChange={handleEditChange}
                      required
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupon;

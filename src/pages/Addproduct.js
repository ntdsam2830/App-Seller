import React from "react";
import CustomInput from "../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { Input } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import "../App.css";
import { createProducts } from "../features/product/productSlice";

const Addproduct = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      originPrice: null,
      quantity: null,
      quantitySale: 0,
      shortDesc: "",
      fullDesc: "",
      type: [],
      rating: 5,
      discount: "New",
      image: [],
    },
    onSubmit: (values) => {
      const formData = new FormData();
      for (let i = 0; i < values.image.length; i++) {
        formData.append(i, values.image[i]);
      }
      values.image = formData;
      dispatch(createProducts(values));
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Product Name"
            onChng={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <CustomInput
            type="number"
            label="Product Price"
            onChng={formik.handleChange("originPrice")}
            onBlr={formik.handleBlur("originPrice")}
            val={formik.values.originPrice}
          />
          <CustomInput
            type="number"
            label="Product Quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <CustomInput
            type="text"
            label="Short Description"
            onChng={formik.handleChange("shortDesc")}
            onBlr={formik.handleBlur("shortDesc")}
            val={formik.values.shortDesc}
          />
          <Input.TextArea
            rows={4}
            style={{ margin: "1rem 0", resize: "none" }}
            placeholder="Full Description"
            onChange={formik.handleChange("fullDesc")}
            value={formik.values.fullDesc}
          />
          <div className="product-list-filter">
            <div>Filter:</div>
            <label>
              <input
                name="type"
                type="checkbox"
                onChange={formik.handleChange("type")}
                value="Livingroom"
              />
              Living Room
            </label>
            <label>
              <input
                name="type"
                type="checkbox"
                cus={formik.handleChange("type")}
                value="Diningroom"
              />
              Dining Room
            </label>
            <label>
              <input
                name="type"
                type="checkbox"
                onChange={formik.handleChange("type")}
                value="Bedroom"
              />
              Bed Room
            </label>
          </div>

          <div className="form-floating mt-3">
            <input
              type="file"
              name="photo"
              accept="imgae/*"
              multiple
              onChange={(e) =>
                formik.setFieldValue("image", e.currentTarget.files)
              }
            />
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;

import React from "react";
import CustomInput from "../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import "../App.css";
import { createProducts } from "../features/product/productSlice";
import { useEffect } from "react";
import Swal from "sweetalert2";

const digitRegExp = /^[0-9]*$/;

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
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Product name is required")
        .min(2, "Minimum 2 characters")
        .max(200, "Maximum 200 characters"),
      originPrice: Yup.string()
        .required("Origin price is required")
        .matches(digitRegExp, "Origin price is not valid")
        .min(0, "No negative number"),
      quantity: Yup.string()
        .required("Quantity is required")
        .matches(digitRegExp, "Quantity is not valid")
        .min(0, "No negative number"),
      shortDesc: Yup.string()
        .required("Short description is required")
        .max(15, "Maximum 100 characters"),
      fullDesc: Yup.string().required("Full description is required"),
    }),
    onSubmit: (values) => {
      values.originPrice = Number(values.originPrice);
      values.quantity = Number(values.quantity);
      console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("originPrice", values.originPrice);
      formData.append("quantity", values.quantity);
      formData.append("shortDesc", values.shortDesc);
      formData.append("fullDesc", values.fullDesc);
      for (let i = 0; i < values.type.length; i++) {
        formData.append("type", values.type[i]);
      }
      formData.append("rating", values.rating);
      formData.append("discount", values.discount);
      for (let i = 0; i < values.image.length; i++) {
        formData.append("image", values.image[i]);
      }
      dispatch(createProducts(formData));
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
          {formik.errors.name && formik.touched.name && (
            <p className="alert-error">
              {formik.touched.name && formik.errors.name}
            </p>
          )}
          <CustomInput
            type="text"
            label="Product Price($)"
            onChng={formik.handleChange("originPrice")}
            onBlr={formik.handleBlur("originPrice")}
            val={formik.values.originPrice}
          />
          {formik.errors.originPrice && formik.touched.originPrice && (
            <p className="alert-error">
              {formik.touched.originPrice && formik.errors.originPrice}
            </p>
          )}
          <CustomInput
            type="text"
            label="Product Quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          {formik.errors.quantity && formik.touched.quantity && (
            <p className="alert-error">
              {formik.touched.quantity && formik.errors.quantity}
            </p>
          )}
          <CustomInput
            type="text"
            label="Short Description"
            onChng={formik.handleChange("shortDesc")}
            onBlr={formik.handleBlur("shortDesc")}
            val={formik.values.shortDesc}
          />
          {formik.errors.shortDesc && formik.touched.shortDesc && (
            <p className="alert-error">
              {formik.touched.shortDesc && formik.errors.shortDesc}
            </p>
          )}

          <div className="custom-textarea">
            <label htmlFor="Full Description">Full Description</label>
            <textarea
              type="text"
              label="Full Description"
              onChange={formik.handleChange("fullDesc")}
              onBlur={formik.handleBlur("fullDesc")}
              val={formik.values.fullDesc}
              rows="5"
            />
            {formik.errors.fullDesc && formik.touched.fullDesc && (
              <p className="alert-error">
                {formik.touched.fullDesc && formik.errors.fullDesc}
              </p>
            )}
          </div>

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
                onChange={formik.handleChange("type")}
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
              accept="image/*"
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

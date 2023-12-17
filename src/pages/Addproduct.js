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
        .min(2, "Minimum 2 characters")
        .max(200, "Maximum 200 characters"),
      originPrice: Yup.number().min(0, "No negative number"),
      quantity: Yup.number().min(0, "No negative number"),
      shortDesc: Yup.string().max(15, "Maximum 100 characters"),
    }),
    onSubmit: (values) => {
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
  const Alert = () => {
    Swal.fire({
      title: "Add Product Successfully!",
      icon: "success",
    });
  };

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
            <p>{formik.errors.name}</p>
          )}
          <CustomInput
            type="number"
            label="Product Price($)"
            onChng={formik.handleChange("originPrice")}
            onBlr={formik.handleBlur("originPrice")}
            val={formik.values.originPrice}
          />
          {formik.errors.originPrice && formik.touched.originPrice && (
            <p>{formik.errors.originPrice}</p>
          )}
          <CustomInput
            type="number"
            label="Product Quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          {formik.errors.quantity && formik.touched.quantity && (
            <p>{formik.errors.quantity}</p>
          )}
          <CustomInput
            type="text"
            label="Short Description"
            onChng={formik.handleChange("shortDesc")}
            onBlr={formik.handleBlur("shortDesc")}
            val={formik.values.shortDesc}
          />
          {formik.errors.shortDesc && formik.touched.shortDesc && (
            <p>{formik.errors.shortDesc}</p>
          )}
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
            onClick={Alert}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;

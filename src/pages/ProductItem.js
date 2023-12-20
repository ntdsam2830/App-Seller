import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Input, Checkbox, Flex } from "antd";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { editProduct, getOneProduct } from "../features/product/productSlice";

const { TextArea } = Input;

const convertToNumber = (input) => {
  if (/\d+%$/.test(input)) {
    const numericValue = parseInt(input);
    return Math.abs(numericValue) || 0;
  } else if (/^(-?\d+)$/.test(input)) {
    return parseInt(input);
  } else {
    return 0;
  }
};

const initProduct = {
  name: "",
  originPrice: 1,
  quantity: 0,
  shortDesc: "",
  fullDesc: "",
  type: [],
  discount: 0,
};

const ProductItem = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  const data = useSelector((state) => state.product.oneProduct) || initProduct;

  const formik = useFormik({
    initialValues: initProduct,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Minimum 2 characters")
        .max(200, "Maximum 200 characters"),
      originPrice: Yup.number().min(1, "Invalid value"),
      quantity: Yup.number().min(0, "Invalid value"),
      shortDesc: Yup.string().max(200, "Maximum 200 characters"),
      discount: Yup.number()
        .min(1, "Discount price must be greater than 1")
        .max(100, "Discount price must be less than 100"),
    }),
    onSubmit: (values) => {
      dispatch(editProduct(values));
    },
  });

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!data.id || formik.values.id === data.id) return;
    formik.setValues({
      name: data.name,
      originPrice: data.originPrice,
      quantity: data.quantity,
      shortDesc: data.shortDesc,
      fullDesc: data.fullDesc,
      type: data.type,
      discount: convertToNumber(data.discount),
      id: data.id,
    });
  }, [
    data.discount,
    data.fullDesc,
    data.id,
    data.name,
    data.originPrice,
    data.quantity,
    data.shortDesc,
    data.type,
    formik,
  ]);

  return (
    <div>
      <h3 className="mb-4 title">Edit Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Product Name"
            name="name"
            val={formik.values.name}
            onBlr={formik.onBlur}
            onChng={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="alert-error">{formik.errors.name}</p>
          )}
          <CustomInput
            type="number"
            label="Product Price($)"
            name="originPrice"
            val={formik.values.originPrice}
            onBlr={formik.onBlur}
            onChng={formik.handleChange}
          />
          {formik.errors.originPrice && formik.touched.originPrice && (
            <p className="alert-error">{formik.errors.originPrice}</p>
          )}
          <CustomInput
            type="number"
            label="Product Quantity"
            name="quantity"
            val={formik.values.quantity}
            onBlr={formik.onBlur}
            onChng={formik.handleChange}
          />
          {formik.errors.quantity && formik.touched.quantity && (
            <p className="alert-error">{formik.errors.quantity}</p>
          )}
          <CustomInput
            type="text"
            label="Short Description"
            name="shortDesc"
            val={formik.values.shortDesc}
            onBlr={formik.onBlur}
            onChng={formik.handleChange}
          />
          {formik.errors.shortDesc && formik.touched.shortDesc && (
            <p className="alert-error">{formik.errors.shortDesc}</p>
          )}

          <TextArea
            style={{
              marginBottom: "10px",
              marginTop: "15px",
              borderColor: "#00000033",
              borderRadius: "5px",
            }}
            placeholder="Full Description"
            type="text"
            label="Full Description"
            onChange={formik.handleChange("fullDesc")}
            onBlur={formik.handleBlur("fullDesc")}
            value={formik.values.fullDesc}
            autoSize={{
              minRows: 3,
              maxRows: 5,
            }}
          />

          <div className="product-list-filter">
            <div>Filter:</div>
            <label>
              <input
                name="type"
                type="checkbox"
                onChange={formik.handleChange("type")}
                value="Livingroom"
                checked={
                  formik.values.type.includes("Livingroom") ? true : false
                }
              />
              Living Room
            </label>
            <label>
              <input
                name="type"
                type="checkbox"
                onChange={formik.handleChange("type")}
                value="Diningroom"
                checked={
                  formik.values.type.includes("Diningroom") ? true : false
                }
              />
              Dining Room
            </label>
            <label>
              <input
                name="type"
                type="checkbox"
                onChange={formik.handleChange("type")}
                value="Bedroom"
                checked={formik.values.type.includes("Bedroom") ? true : false}
              />
              Bed Room
            </label>
          </div>
          <CustomInput
            type="number"
            label="Discount Price(%)"
            name="discount"
            val={formik.values.discount}
            onBlr={formik.onBlur}
            onChng={formik.handleChange}
          />
          {formik.errors.discount && formik.touched.discount && (
            <p className="alert-error">{formik.errors.discount}</p>
          )}
          <Flex gap="small" wrap="wrap">
            <button
              className="btn btn-success border-0 rounded-3 my-5"
              type="submit"
            >
              Submit
            </button>
            <Link
              to="/admin/list-product"
              className="btn btn-primary border-0 rounded-3 my-5"
              type="button"
              onClick={formik.resetForm}
            >
              Back
            </Link>
          </Flex>
        </form>
      </div>
    </div>
  );
};

export default ProductItem;

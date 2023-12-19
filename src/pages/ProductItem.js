import React from "react";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Input, Checkbox, Flex } from "antd";
import { Link, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { editProduct } from "../features/product/productSlice";
// import { useEffect } from "react";
// import Swal from "sweetalert2";

const { Dragger } = Upload;
const props = {
  listType: "picture",
  multiple: true,
  accept: "image/*",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const OPTIONS_TYPE = [
  { label: "Living Room", value: "Livingroom" },
  { label: "Dining Room", value: "Diningroom" },
  { label: "Bedroom", value: "Bedroom" },
];

const ProductItem = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [desc, setDesc] = useState();
  const [checkedList, setCheckedList] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };
  const onChange = (list) => {
    setCheckedList(list);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      originPrice: 0,
      quantity: 0,
      shortDesc: "",
      fullDesc: "",
      type: [],
      discount: "",

      id: `${id}`,
    },
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
  // const Alert = () => {
  //   Swal.fire({
  //     title: "Edit Product Successfully!",
  //     icon: "success",
  //     confirmButtonColor: "#1677ff",
  //   });
  // };
  return (
    <div>
      <h3 className="mb-4 title">Edit Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Product Name"
            name="name"
            value={formik.values.name}
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
            value={formik.values.originPrice}
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
            value={formik.values.quantity}
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
            value={formik.values.shortDesc}
            onBlr={formik.onBlur}
            onChng={formik.handleChange}
          />
          {formik.errors.shortDesc && formik.touched.shortDesc && (
            <p className="alert-error">{formik.errors.shortDesc}</p>
          )}
          <Input.TextArea
            rows={4}
            style={{ margin: "1rem 0", resize: "none" }}
            placeholder="Full Description"
          />
          <div>
            Type:{" "}
            <Checkbox.Group
              options={OPTIONS_TYPE}
              value={checkedList}
              onChange={onChange}
            />
          </div>
          <CustomInput
            type="number"
            label="Discount Price(%)"
            name="discount"
            value={formik.values.discount}
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
              type="submit"
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

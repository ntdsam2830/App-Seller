import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { message, Upload, Input } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { InboxOutlined } from "@ant-design/icons";
import "../App.css";

const { Dragger } = Upload;

const uploadFile = (values) => {
  console.log("file values: ");
  console.log(values);
};

const props = {
  listType: "picture",
  multiple: true,
  accept: "image/*",
  customRequest(arg1, arg2) {
    console.log("Dummy Request");
  },
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
      console.log(values);
      uploadFile(values);
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

          <div className="mt-3">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
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

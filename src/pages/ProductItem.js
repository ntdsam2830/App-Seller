import React from "react";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Input, Checkbox } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  { label: "Bed Room", value: "Bedroom" },
];

const ProductItem = () => {
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
      Name: "",
      Price: "",
      Quantity: "",
      Short: "",
      Dis: "",
    },
    validationSchema: Yup.object({
      Name: Yup.string()
        .min(2, "Minimum 2 characters")
        .max(200, "Maximum 200 characters"),
      Price: Yup.number().min(0, "No negative number"),
      Quantity: Yup.number().min(0),
      Short: Yup.string().max(15, "Maximum 100 characters"),
      Dis: Yup.number().min(0).max(100),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Edit Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Product Name"
            name="Name"
            value={formik.values.Name}
            onBlr={formik.onBlur}
            onChng={formik.handleChange}
          />
          {formik.errors.Name && formik.touched.Name && (
            <p>{formik.errors.Name}</p>
          )}
          <CustomInput
            type="number"
            label="Product Price($)"
            name="Price"
            value={formik.values.Price}
            onBlr={formik.onBlur}
            onChng={formik.handleChange}
          />
          {formik.errors.Price && formik.touched.Price && (
            <p>{formik.errors.Price}</p>
          )}
          <CustomInput
            type="number"
            label="Product Quantity"
            name="Quantity"
            value={formik.values.Quantity}
            onBlr={formik.onBlur}
            onChng={formik.handleChange}
          />
          {formik.errors.Quantity && formik.touched.Quantity && (
            <p>{formik.errors.Quantity}</p>
          )}
          <CustomInput
            type="text"
            label="Short Description"
            name="Short"
            value={formik.values.Short}
            onBlr={formik.onBlur}
            onChng={formik.handleChange}
          />
          {formik.errors.Short && formik.touched.Short && (
            <p>{formik.errors.Short}</p>
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
            name="Dis"
            value={formik.values.Dis}
            onBlr={formik.onBlur}
            onChng={formik.handleChange}
          />
          {formik.errors.Dis && formik.touched.Dis && (
            <p>{formik.errors.Dis}</p>
          )}

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductItem;

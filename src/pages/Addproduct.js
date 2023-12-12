import React from "react";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Input, Checkbox } from "antd";
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

const Addproduct = () => {
  const [desc, setDesc] = useState();
  const [checkedList, setCheckedList] = useState();
  const handleDesc = (e) => {
    setDesc(e);
  };
  const onChange = (list) => {
    setCheckedList(list);
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form>
          <CustomInput type="text" label="Product Name" />
          <CustomInput type="number" label="Product Price" />
          <CustomInput type="number" label="Product Quantity" />
          <CustomInput type="text" label="Short Description" />
          <Input.TextArea
            rows={4}
            style={{ margin: "1rem 0", resize: "none" }}
            placeholder="Full Description"
          />
          <div>
            Filter:{" "}
            <Checkbox.Group
              options={OPTIONS_TYPE}
              value={checkedList}
              onChange={onChange}
            />
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

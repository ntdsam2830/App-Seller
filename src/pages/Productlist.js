import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOneProduct,
  getProducts,
} from "../features/product/productSlice";

const Productlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.product.products);

  const handleEdit = (record) => {
    console.log(record);
    navigate(`${record.id}`);
  };

  const handleDelete = (record) => {
    dispatch(deleteOneProduct(record.id));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Quantity Sale",
      dataIndex: "quantitySale",
    },
    {
      title: "Price",
      dataIndex: "originPrice",
      render: (text) => <div>${text}</div>,
    },
    {
      title: "Sale Price",
      dataIndex: "price",
      render: (text) => <div>${text}</div>,
    },
    {
      title: "Edit",
      key: "edit",
      render: (_, record) => (
        <Button onClick={() => handleEdit(record)} icon={<BiEdit />} />
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Button onClick={() => handleDelete(record)} icon={<AiFillDelete />} />
      ),
    },
  ];

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, data]);

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Productlist;

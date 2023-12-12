import React, { useState } from "react";
import { Table, Button } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    shortDesc: `London, Park Lane no. ${i}`,
    quantity: 32,
    price: 200,
  });
}

const Productlist = () => {
  const [data, setData] = useState(data1);

  const handleEdit = (record) => {
    console.log(record);
  };

  const handleDelete = (record) => {
    console.log(record);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Short Description",
      dataIndex: "shortDesc",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
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

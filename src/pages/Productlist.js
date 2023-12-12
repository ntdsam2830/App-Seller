import React, { useState } from "react";
import { Table, Button } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    id: i,
    name: `Edward King ${i}`,
    shortDesc: `London, Park Lane no. ${i}`,
    quantity: 32,
    price: 200,
  });
}

const Productlist = () => {
  const [data, setData] = useState(data1);
  const navigate = useNavigate();

  const handleEdit = (record) => {
    console.log(record);
    navigate(`${record.id}`);
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

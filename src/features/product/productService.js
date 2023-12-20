import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
import { getAccessToken } from "../../utils/authStorage";

const token = getAccessToken();

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(
    `${base_url}product/createproduct`,
    product,
    {
      headers: {
        Authorization: `Bearer ${token !== null ? token : ""}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${base_url}product/deleteproduct/${id}`,
    config
  );

  return response.data;
};

const editOneProduct = async (data) => {
  const response = await axios.put(
    `${base_url}product/updateproduct/${data.id}`,
    data,
    config
  );
  return response.data;
};

const getOneProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  deleteProduct,
  editOneProduct,
  getOneProduct,
};

export default productService;

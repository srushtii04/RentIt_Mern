import axios from "axios";

const API =
"http://localhost:5000/api/items";

export const createItem =
async (formData) => {

  const res =
    await axios.post(
      `${API}/create`,
      formData
    );

  return res.data;
};

export const getItems =
async () => {

  const res =
    await axios.get(API);

  return res.data;
};

export const getItemById =
async(id)=>{

    const res=
    await axios.get(
        `${API}/${id}`
    );

    return res.data;

}
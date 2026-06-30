import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

export const generateDescription = async (data) => {

    const response = await axios.post(

        `${API_URL}/generate-description`,

        data

    );

    return response.data;

};
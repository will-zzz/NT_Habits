import axios from "axios";

export const fetchCitizen = async (season, id) => {
  try {
    const response = await axios.get(
      `http://localhost:6969/api/citizen/${season}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching citizen:", error);
  }
};

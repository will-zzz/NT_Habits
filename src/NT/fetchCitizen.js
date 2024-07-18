import axios from "axios";

export const fetchCitizen = async (season, id) => {
  try {
    const response = await axios.get("/api/fetch-images");
    return response.data.hrefs;
  } catch (error) {
    console.error("Error fetching citizen:", error);
  }
};

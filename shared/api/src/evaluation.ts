import axios from "axios";

export async function fetchEvaluationById(id: string) {
  const res = await axios.get(`/evaluation/${id}`);
  return res.data;
}

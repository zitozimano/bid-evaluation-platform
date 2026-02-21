import { get, post } from "./http";

export async function fetchEvaluation(id: string) {
  return get(`/evaluations/${id}`);
}

export async function submitCompliance(id: string, data: any) {
  return post(`/evaluations/${id}/compliance`, data);
}

export async function submitFunctionality(id: string, data: any) {
  return post(`/evaluations/${id}/functionality`, data);
}

export async function submitPrice(id: string, data: any) {
  return post(`/evaluations/${id}/price`, data);
}

export async function submitPreference(id: string, data: any) {
  return post(`/evaluations/${id}/preference`, data);
}

export async function submitRecommendation(id: string, data: any) {
  return post(`/evaluations/${id}/recommendation`, data);
}

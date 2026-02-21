import { get } from "./http";

export type Tender = {
  id: string;
  description: string;
  department: string;
  closingDate: string;
  status: string;
};

export async function fetchTenders(): Promise<Tender[]> {
  return get("/tenders");
}

export async function fetchTender(id: string): Promise<any> {
  return get(`/tenders/${id}`);
}

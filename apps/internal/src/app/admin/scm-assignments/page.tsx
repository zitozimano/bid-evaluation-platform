"use client";

import { useEffect, useState } from "react";
import { createAdminScmAssignmentsApi } from "@bidplatform/api";
import {
  ScmAssignment,
  ScmUser,
  ScmTender
} from "@bidplatform/models";
import { ScmAssignmentTable } from "./components/ScmAssignmentTable";
import { ScmAssignmentForm } from "./components/ScmAssignmentForm";

const api = createAdminScmAssignmentsApi(
  // however you create your client, e.g. fetch-based
  // createApiClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL! })
);

export default function ScmAssignmentsPage() {
  const [assignments, setAssignments] = useState<ScmAssignment[]>([]);
  const [users, setUsers] = useState<ScmUser[]>([]);
  const [tenders, setTenders] = useState<ScmTender[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await api.list();
    setAssignments(res.data.assignments);
    setUsers(res.data.users);
    setTenders(res.data.tenders);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleCreate(userId: string, tenderId: string) {
    await api.create({ userId, tenderId });
    await load();
  }

  async function handleDelete(id: string) {
    await api.remove(id);
    await load();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">SCM → Tender Assignments</h1>
      <ScmAssignmentForm
        users={users}
        tenders={tenders}
        onCreate={handleCreate}
      />
      <ScmAssignmentTable
        assignments={assignments}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
}

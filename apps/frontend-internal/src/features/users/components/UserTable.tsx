import React from 'react';

export const UserTable = ({ users, onSelect }) => (
  <table className="min-w-full text-sm">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u) => (
        <tr key={u.id} onClick={() => onSelect(u)} className="cursor-pointer hover:bg-gray-100">
          <td>{u.name}</td>
          <td>{u.email}</td>
          <td>{u.role}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

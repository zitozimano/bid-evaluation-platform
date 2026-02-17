import React, { useState } from "react";
import { Input } from "../form/Input";
import { PrimaryButton } from "../buttons/PrimaryButton";

export function LoginForm({
  onSubmit
}: {
  onSubmit: (values: { email: string; password: string }) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ email, password });
      }}
    >
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PrimaryButton type="submit" className="w-full">
        Sign in
      </PrimaryButton>
    </form>
  );
}

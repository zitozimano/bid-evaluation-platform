export function resetPasswordEmail(resetLink: string) {
  return {
    subject: "Password reset request",
    html: `
      <p>A password reset was requested for your account.</p>
      <p>If this was you, click the link below to set a new password:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>If you did not request this, you can ignore this email.</p>
    `
  };
}

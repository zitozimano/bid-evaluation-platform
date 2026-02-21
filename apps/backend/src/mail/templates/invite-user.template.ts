export function inviteUserEmail(inviteLink: string) {
  return {
    subject: "You’ve been invited to the Bid Evaluation Platform",
    html: `
      <p>You have been invited to access the Bid Evaluation Platform.</p>
      <p>Please click the link below to set your password and activate your account:</p>
      <p><a href="${inviteLink}">${inviteLink}</a></p>
      <p>This link will expire in 24 hours.</p>
    `
  };
}

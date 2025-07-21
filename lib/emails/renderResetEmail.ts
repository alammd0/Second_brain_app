import { render } from "@react-email/render";
import ResetPasswordEmail from "./ResetPasswordEmail";

export function generateResetPasswordHtml(username: string, url: string) {
  return render(ResetPasswordEmail({ username, resetUrl: url }));
}

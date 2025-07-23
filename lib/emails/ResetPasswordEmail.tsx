import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Button,
} from "@react-email/components";

interface ResetPasswordEmailProps {
  username: string;
  resetUrl: string;
}

export default function ResetPasswordEmail({
  username,
  resetUrl,
}: ResetPasswordEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Password Reset Instructions</Preview>
      <Body style={{ backgroundColor: "#f4f4f4", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "10px",
            fontFamily: "Arial",
          }}
        >
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
            Hello {username},
          </Text>

          <Text>
            You recently requested to reset your password. Click the button
            below to set a new password.
          </Text>

          <Button
            href={resetUrl}
            style={{
              backgroundColor: "#0070f3",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            Reset Password
          </Button>

          <Text style={{ fontSize: "14px", color: "#666666" }}>
            If you did not request this, please ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from "@react-email/components";
import React from 'react'

export const KoalaWelcomeEmail = ({
  userFirstname,
}) => (
  <Html>
    <Head />
    <Preview>
    Your Trusted Source for best Medical Equipments
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={'https://iconape.com/wp-content/png_logo_vector/healthfirst-logo.png'}
          width="170"
          height="50"
          alt="Koala"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
        Welcome to Healthfirst Medicorp! We are delighted to have you on board. 
        As your trusted partner in medical equipments, we are committed to providing 
        you with top-quality products and exceptional service.

        </Text>
        <Section style={btnContainer}>
          <Button style={button} href="https://www.healthfirstmedicorp.in/">
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Warm regards,
          <br />
          The Healthfirst Medicorp Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
        A17, Bramha Avenue, Kondhwa, Pune, MH 411048
        </Text>
      </Container>
    </Body>
  </Html>
);

export default KoalaWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center",
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};

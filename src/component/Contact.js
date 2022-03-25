import React, { useCallback, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    let reponse = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await reponse.json();
    alert(result.status);
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }
  const [disableSubmit, setDisableSubmit] = useState(true);
  return (
    <div className="p-4">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            id="name"
            placeholder="Full Name"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Email Address"
            required
          />
          <Form.Text>
            Don't worry, your email will never share with anyone.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control as={"textarea"} id="message" rows={3} required />
        </Form.Group>
        <div className="text-center">
          <ReCAPTCHA
            className="d-inline-block"
            sitekey="6Lcthg4fAAAAAMLTYkI2Rt9uDKN2PW6xS2xU0I9j"
            onChange={useCallback(() => setDisableSubmit(false))}
          />
          <br />
          <Button
            className="m-1"
            variant="primary"
            type="submit"
            disabled={disableSubmit}
          >
            {status}
          </Button>
          <Button className="m-1" variant="danger" type="reset">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}

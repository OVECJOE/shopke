import { useState, useRef } from "react";
import { contactDetails } from "../../data/contact";
import "./contact.css";

const emailPattern = /^\S+@\S+\.\S+$/;

export default function ContactPage() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const refs = { name: nameRef, email: emailRef, message: messageRef };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const found = {};
    if (!values.name.trim()) {
      found.name = "Enter your name.";
    }
    if (!emailPattern.test(values.email)) {
      found.email = "Enter a valid email address.";
    }
    if (values.message.trim().length < 10) {
      found.message = "Write at least 10 characters.";
    }

    setErrors(found);

    // Send the cursor to the first field that has a problem
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      refs[firstInvalid].current.focus();
      return;
    }

    setSent(true);
  };

  return (
    <section className="section">
      <h1 className="h-page contact__title">Contact us</h1>

      <div className="split contact__layout">
        {sent ? (
          <div className="card" role="status">
            <h2 className="h-section contact__thanks">
              Thank you, {values.name}.
            </h2>
            <p className="text-muted">
              We got your message and will reply to {values.email} soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="label" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                ref={nameRef}
                className={`input${errors.name ? " input--error" : ""}`}
                type="text"
                placeholder="Your name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
              />
              {errors.name && (
                <p className="field-error" id="contact-name-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                ref={emailRef}
                className={`input${errors.email ? " input--error" : ""}`}
                type="email"
                placeholder="you@business.com"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
              />
              {errors.email && (
                <p className="field-error" id="contact-email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="field">
              <label className="label" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                ref={messageRef}
                className={`textarea contact__message${
                  errors.message ? " textarea--error" : ""
                }`}
                placeholder="How can we help?"
                value={values.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
              />
              {errors.message && (
                <p className="field-error" id="contact-message-error">
                  {errors.message}
                </p>
              )}
              <p className="text-small text-muted contact__counter">
                {values.message.length} characters
              </p>
            </div>

            <button type="submit" className="btn">
              Send message
            </button>
          </form>
        )}

        <aside className="card">
          <h2 className="contact__reach">Reach us</h2>
          <p>{contactDetails.email}</p>
          <p>{contactDetails.phone}</p>
          <p>{contactDetails.address}</p>
        </aside>
      </div>
    </section>
  );
}
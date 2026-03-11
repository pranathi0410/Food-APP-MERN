

function Contact() {
  return (
    <div className="page-container">
      <h1 className="page-title">Contact Us</h1>

      <div className="contact-card">
        <p><strong>Email:</strong> support@tastyexpress.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Address:</strong> Bangalore, India</p>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

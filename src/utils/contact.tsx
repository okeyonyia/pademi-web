const sendEmail = () => {
  const companyEmail = "example@company.com";
  const defaultMessage =
    "Hello, I would like to discuss matters related to pademi assistance. Please let me know how we can proceed.";
  const subjectMessage = "Inquiry from Pademi Website";

  const email = encodeURIComponent(companyEmail);
  const subject = encodeURIComponent(subjectMessage);
  const body = encodeURIComponent(defaultMessage);

  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;
};

export default sendEmail;

const sendEmail = () => {
  const companyEmail = "okey@octinnovations.com";
  const defaultMessage = "Please submit this email to join our waiting list.";
  const subjectMessage = "Inquiry from Pademi Website";

  const email = encodeURIComponent(companyEmail);
  const subject = encodeURIComponent(subjectMessage);
  const body = encodeURIComponent(defaultMessage);

  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;
};

export default sendEmail;

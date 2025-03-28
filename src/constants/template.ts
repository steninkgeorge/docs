export const templates = [
  {
    id: "blank-document",
    label: "Blank Document",
    image: "/blank-document.svg",
    content: `<p>Start typing...</p>`,
  },
  {
    id: "resume",
    label: "Resume",
    image: "/resume.svg",
    content: `
      <h1 style="color: #2D3748;"><strong>John Doe</strong></h1>
      <p><strong>Email:</strong> <u>johndoe@example.com</u></p>
      <p><strong>Phone:</strong> <u>(123) 456-7890</u></p>
      <h2 style="color: #4A5568;">Summary</h2>
      <p><em>Experienced software engineer with expertise in full-stack development.</em></p>
      <h2 style="color: #4A5568;">Experience</h2>
      <table border="1" width="100%" cellpadding="5">
        <tr>
          <th><strong>Company</strong></th>
          <th><strong>Role</strong></th>
          <th><strong>Duration</strong></th>
        </tr>
        <tr>
          <td>ABC Corp</td>
          <td>Software Engineer</td>
          <td>2020 - Present</td>
        </tr>
        <tr>
          <td>XYZ Ltd</td>
          <td>Frontend Developer</td>
          <td>2018 - 2020</td>
        </tr>
      </table>
      <h2 style="color: #4A5568;">Education</h2>
      <p><strong>Bachelor of Science in Computer Science</strong> - XYZ University</p>
    `,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    image: "/business-letter.svg",
    content: `
      <p><strong>Sender's Name</strong></p>
      <p>123 Business St, City, State</p>
      <p><u>Email:</u> sender@example.com</p>
      <p><u>Phone:</u> (123) 456-7890</p>
      <p><strong>Date:</strong> March 28, 2025</p>
      <p><strong>Recipient's Name</strong></p>
      <p>Company Name</p>
      <p>Address</p>
      <p><strong>Subject:</strong> <em>Important Business Discussion</em></p>
      <p>Dear <strong>[Recipient's Name]</strong>,</p>
      <p>I am writing to inform you about an important update...</p>
      <p><strong>Sincerely,</strong></p>
      <p><em>Sender's Name</em></p>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    image: "/cover-letter.svg",
    content: `
      <p><strong>John Doe</strong></p>
      <p>123 Main Street</p>
      <p>City, State, ZIP Code</p>
      <p><u>Email:</u> johndoe@example.com</p>
      <p><u>Phone:</u> (123) 456-7890</p>
      <p><strong>Date:</strong> March 28, 2025</p>
      <p><strong>Hiring Manager's Name</strong></p>
      <p><strong>Company Name</strong></p>
      <p><strong>Subject:</strong> <em>Application for Software Engineer Position</em></p>
      <p>Dear Hiring Manager,</p>
      <p>I am excited to apply for the <strong>Software Engineer</strong> position...</p>
      <p><strong>Best regards,</strong></p>
      <p><em>John Doe</em></p>
    `,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    image: "/project-proposal.svg",
    content: `
      <h1 style="color: #2B6CB0;"><strong>Project Proposal</strong></h1>
      <h2 style="color: #3182CE;">Title: <u>Innovative Web Application</u></h2>
      <h2 style="color: #3182CE;">Introduction</h2>
      <p><em>This proposal outlines the development of an innovative web application...</em></p>
      <h2 style="color: #3182CE;">Objectives</h2>
      <ul>
        <li><strong>Improve user experience.</strong></li>
        <li><strong>Increase efficiency.</strong></li>
      </ul>
      <h2 style="color: #3182CE;">Timeline</h2>
      <table border="1" width="100%" cellpadding="5">
        <tr>
          <th>Phase</th>
          <th>Duration</th>
        </tr>
        <tr>
          <td>Development</td>
          <td>3 months</td>
        </tr>
        <tr>
          <td>Testing</td>
          <td>1 month</td>
        </tr>
      </table>
      <h2 style="color: #3182CE;">Budget</h2>
      <p>The estimated budget for this project is <strong>$50,000</strong>.</p>
    `,
  },
  {
    id: "software-proposal",
    label: "Software Proposal",
    image: "/software-proposal.svg",
    content: `
      <h1 style="color: #4A5568;"><strong>Software Development Proposal</strong></h1>
      <h2 style="color: #718096;">Client: <u>XYZ Corporation</u></h2>
      <h2 style="color: #718096;">Project Overview</h2>
      <p>We propose developing a robust software solution to address...</p>
      <h2 style="color: #718096;">Technology Stack</h2>
      <table border="1" width="100%" cellpadding="5">
        <tr>
          <th>Component</th>
          <th>Technology</th>
        </tr>
        <tr>
          <td>Frontend</td>
          <td>React, Next.js</td>
        </tr>
        <tr>
          <td>Backend</td>
          <td>Node.js, Express</td>
        </tr>
      </table>
      <h2 style="color: #718096;">Estimated Cost</h2>
      <p>The estimated cost for this project is <strong>$XX,XXX</strong>.</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    image: "/letter.svg",
    content: `
      <p><strong>Dear [Recipient's Name],</strong></p>
      <p><em>I hope this letter finds you well. I am writing to...</em></p>
      <p><strong>Best regards,</strong></p>
      <p><em>[Your Name]</em></p>
    `,
  },
];

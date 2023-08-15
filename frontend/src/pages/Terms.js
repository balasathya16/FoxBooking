// Terms.js

import '../styles/Terms.css'; // Import the Terms.css file
import React from 'react';

const Terms = () => {
  // Add the Terms content here
  const termsContent = `
Welcome to our website ("Website"). These terms and conditions ("Terms") govern your use of our services to book indoor and outdoor cricket and sporting courts. By using our Website, you agree to comply with these Terms and our Privacy Policy.

**1. Acceptance of Terms**

By using our Website, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our services.

**2. User Conduct**

You agree to use our services only for lawful purposes and in a manner consistent with these Terms and applicable laws and regulations.

**3. User Account**

If you create an account on our Website, you are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and complete information when creating your account.

**4. Intellectual Property**

The content on our Website, including text, images, graphics, and logos, is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or use our content without our express permission.

**5. Limitation of Liability**

We strive to provide accurate and reliable information, but we do not guarantee the accuracy, completeness, or reliability of our services. We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our Website.

**6. Indemnification**

You agree to indemnify and hold us harmless from any claims, losses, liabilities, and expenses arising out of your use of our services or violation of these Terms.

**7. Changes to Terms**

We may update these Terms from time to time. Any changes will be effective upon posting the updated Terms on our Website. It is your responsibility to review these Terms periodically.

**8. Governing Law**

These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].

If you have any questions or concerns about these Terms or our services, please refer to our Privacy Policy or contact us at [contact email/phone number].

By using our Website, you agree to the terms and conditions outlined in these Terms.`.trim();

  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>{termsContent}</p>
    </div>
  );
};

export default Terms;

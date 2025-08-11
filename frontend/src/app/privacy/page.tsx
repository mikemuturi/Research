import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-4 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          
          <p className="text-gray-600">
            Last updated: January 2025
          </p>
        </div>

        <Card>
          <CardContent className="prose prose-gray max-w-none p-8">
            <h2>Data Collection and Purpose</h2>
            <p>
              The RAFSIA (Readiness Assessment Framework for Satellite Internet Adoption) tool 
              collects information to assess the readiness of institutions and service providers 
              for satellite internet adoption. This research is conducted to understand and improve 
              connectivity solutions in underserved areas.
            </p>

            <h3>Information We Collect</h3>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number (optional, can be submitted anonymously)</li>
              <li><strong>Professional Information:</strong> Role, institution name, county</li>
              <li><strong>Assessment Responses:</strong> Your ratings and answers to readiness assessment questions</li>
              <li><strong>Technical Information:</strong> IP address, submission timestamp</li>
            </ul>

            <h3>How We Use Your Information</h3>
            <ul>
              <li>To generate your personalized readiness assessment report</li>
              <li>To conduct research on satellite internet adoption readiness</li>
              <li>To create aggregate statistics and insights (anonymized)</li>
              <li>To improve the assessment tool and methodology</li>
              <li>To provide recommendations for improving readiness</li>
            </ul>

            <h3>Anonymous Submissions</h3>
            <p>
              You can choose to submit your assessment anonymously. When you select this option:
            </p>
            <ul>
              <li>Your name, email, and phone number will not be collected or stored</li>
              <li>You will still receive your complete assessment results</li>
              <li>Your responses will still contribute to research insights (anonymously)</li>
            </ul>

            <h3>Data Sharing and Disclosure</h3>
            <p>
              We do not sell, rent, or trade your personal information. Your data may be shared only in the following circumstances:
            </p>
            <ul>
              <li><strong>Research Publications:</strong> Aggregate, anonymized data may be used in academic publications</li>
              <li><strong>Legal Requirements:</strong> If required by law or legal process</li>
              <li><strong>Research Collaboration:</strong> With approved research partners under strict confidentiality agreements</li>
            </ul>

            <h3>Data Security</h3>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul>
              <li>Encrypted data transmission (HTTPS)</li>
              <li>Secure database storage</li>
              <li>Access controls and authentication</li>
              <li>Regular security assessments</li>
            </ul>

            <h3>Data Retention</h3>
            <p>
              We retain your information for the following periods:
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Up to 5 years after collection or until you request deletion</li>
              <li><strong>Assessment Responses:</strong> Indefinitely for research purposes (anonymized after 2 years)</li>
              <li><strong>Technical Information:</strong> Up to 1 year for security and system administration</li>
            </ul>

            <h3>Your Rights</h3>
            <p>
              You have the following rights regarding your personal information:
            </p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
            </ul>

            <h3>Compliance</h3>
            <p>
              This privacy policy is designed to comply with:
            </p>
            <ul>
              <li>Kenya Data Protection Act 2019</li>
              <li>General Data Protection Regulation (GDPR) where applicable</li>
              <li>International research ethics standards</li>
              <li>Academic institutional review board requirements</li>
            </ul>

            <h3>Cookies and Tracking</h3>
            <p>
              This website uses minimal cookies and tracking:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics:</strong> Basic usage statistics (anonymized)</li>
              <li><strong>No Third-Party Tracking:</strong> We do not use advertising or social media tracking</li>
            </ul>

            <h3>Children's Privacy</h3>
            <p>
              This service is not intended for individuals under 18 years of age. 
              If you are under 18, please have a parent or guardian complete the assessment on your behalf.
            </p>

            <h3>International Transfers</h3>
            <p>
              Your information may be transferred to and stored in countries other than your country of residence. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h3>Contact Information</h3>
            <p>
              For questions about this privacy policy or to exercise your rights, please contact:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Research Team Contact:</strong></p>
              <p>RAFSIA Assessment Project<br />
              Email: privacy@rafsia-assessment.org<br />
              Phone: [Contact Number]<br />
              Address: [Research Institution Address]</p>
            </div>

            <h3>Changes to This Policy</h3>
            <p>
              We may update this privacy policy from time to time. We will notify you of any material 
              changes by posting the new policy on this page with a new "last updated" date. 
              Your continued use of the service after such changes constitutes acceptance of the updated policy.
            </p>

            <h3>Consent</h3>
            <p>
              By using the RAFSIA assessment tool and providing your information, you consent to the 
              collection and use of your information as described in this privacy policy. 
              You can withdraw your consent at any time by contacting us.
            </p>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/" className="text-blue-600 hover:text-blue-500 transition-colors">
            ← Return to Assessment Tool
          </Link>
        </div>
      </div>
    </div>
  );
}
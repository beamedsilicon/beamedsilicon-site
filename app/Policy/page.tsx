import React from "react";

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Policies & Terms
        </h1>

        {/* Privacy Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Privacy Policy
          </h2>
          <p className="text-gray-600 mb-4">
            We value your privacy and are committed to protecting your personal
            information. Any data collected through this website is used solely
            to provide and improve our services.
          </p>
          <p className="text-gray-600">
            We do not sell, rent, or share your personal information with third
            parties except as required by law or to provide our services.
          </p>
        </section>

        {/* Terms of Service */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Terms of Service
          </h2>
          <p className="text-gray-600 mb-4">
            By accessing and using this website, you agree to comply with all
            applicable laws and regulations.
          </p>
          <p className="text-gray-600">
            We reserve the right to update, modify, or discontinue any part of
            our services at any time without prior notice.
          </p>
        </section>

        {/* Cookie Policy */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Cookie Policy
          </h2>
          <p className="text-gray-600 mb-4">
            We use cookies and similar technologies to enhance user experience,
            analyze website traffic, and improve our services.
          </p>
          <p className="text-gray-600">
            By continuing to use our website, you consent to the use of cookies
            in accordance with this policy.
          </p>
        </section>

        {/* Disclaimer */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Disclaimer
          </h2>
          <p className="text-gray-600">
            The information provided on this website is for general
            informational purposes only. We make no warranties regarding the
            completeness, accuracy, or reliability of any content.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600">
            If you have questions regarding these policies, please contact us
            at:
          </p>
          <p className="mt-2 font-medium text-blue-600">
            support@yourwebsite.com
          </p>
        </section>

        <div className="mt-10 pt-6 border-t text-sm text-gray-500">
          Last Updated: June 2026
        </div>
      </div>
    </div>
  );
}
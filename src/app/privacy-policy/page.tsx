import Navbar from "@/components/home/navbar";
import type { Metadata } from 'next';
import Footer from "@/components/home/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Fresh Plus Professional Cleaning Melbourne",
  description: "Learn how Fresh Plus Professional Cleaning Services protects your personal information. Our privacy policy complies with Australian Privacy Principles.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-16 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/Home_Hero.webp')" }}>
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
              Privacy <span className="text-green-500">Policy</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium">
              Your privacy is important to us. Learn how we protect your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 border border-gray-100">

              {/* Last Updated */}
              <div className="mb-12 p-6 bg-green-50 rounded-2xl border-l-8 border-green-500">
                <p className="text-sm font-bold text-gray-700 uppercase tracking-widest">
                  Last updated: {new Date().toLocaleDateString('en-AU')}
                </p>
              </div>

              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Introduction</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-lg font-medium">
                  <p>
                    FreshPlus Professional Cleaning Services ("we", "our", or "us") is committed to protecting your privacy.
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit
                    our website or use our cleaning services in Melbourne, Victoria, Australia.
                  </p>
                  <p>
                    This policy complies with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth)
                    and applicable Victorian privacy legislation.
                  </p>
                </div>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Information We Collect</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-green-600 mb-4 uppercase tracking-wide">Personal Information</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
                    {[
                      "Name and contact details",
                      "Home or business address",
                      "Payment information",
                      "Service preferences",
                      "Communication records"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-green-600 mb-4 uppercase tracking-wide">Automatically Collected Information</h3>
                  <ul className="space-y-3 text-gray-600 font-medium">
                    {[
                      "Website usage data and analytics",
                      "IP address and browser information",
                      "Cookies and tracking technologies"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* How We Use Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">How We Use Your Information</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
                  {[
                    "Deliver cleaning services",
                    "Process payments & billing",
                    "Communicate appointments",
                    "Improve customer experience",
                    "Marketing communications",
                    "Legal compliance"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Security */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Data Security</h2>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  We implement appropriate technical and organisational measures to protect your personal information
                  against unauthorised access, alteration, disclosure, or destruction. This includes secure storage
                  systems, encrypted communications, and regular security assessments.
                </p>
              </div>

              {/* Information Sharing */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Information Sharing</h2>
                <p className="text-gray-600 leading-relaxed text-lg font-medium mb-6">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
                  {[
                    "With trusted service providers",
                    "When required by law",
                    "With your explicit consent",
                    "To protect employee/customer safety"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Your Rights */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Your Rights</h2>
                <p className="text-gray-600 leading-relaxed text-lg font-medium mb-6">
                  Under the Privacy Act 1988, you have the right to:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
                  {[
                    "Access your personal information",
                    "Request correction of data",
                    "Request deletion of data",
                    "Opt-out of marketing",
                    "Make a privacy complaint"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cookies */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Cookies & Tracking</h2>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  Our website uses cookies to enhance your browsing experience and analyse website usage.
                  You can control cookie settings through your browser preferences. Disabling cookies may
                  affect the functionality of our website.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-[2.5rem] text-white shadow-2xl">
                <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Contact Us</h2>
                <p className="text-gray-300 mb-8 font-medium leading-relaxed">
                  If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
                </p>
                <div className="space-y-6">
                  <div className="flex flex-col gap-4">
                    <a href="mailto:Info@freshpluscleaning.com.au" className="flex items-center gap-4 group">
                      <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-green-500 transition-all duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                        <p className="text-lg font-black group-hover:text-green-500 transition-colors">Info@freshpluscleaning.com.au</p>
                      </div>
                    </a>
                    <a href="tel:043971720" className="flex items-center gap-4 group">
                      <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-green-500 transition-all duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Phone</p>
                        <p className="text-lg font-black group-hover:text-green-500 transition-colors">0439 717 20</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Policy Updates */}
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tight">Policy Updates</h3>
                <p className="text-sm text-gray-500 font-medium">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or
                  applicable laws. We will notify you of any material changes by posting the updated policy on our website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}




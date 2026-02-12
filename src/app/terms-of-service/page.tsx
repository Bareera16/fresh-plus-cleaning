import Navbar from "@/components/home/navbar";
import type { Metadata } from 'next';
import Footer from "@/components/home/footer";

export const metadata: Metadata = {
  title: "Terms of Service | Fresh Plus Professional Cleaning Melbourne",
  description: "Read our terms of service to understand our quality guarantee, booking process, and professional cleaning standards in Melbourne.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-16 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/Home_Hero.webp')" }}>
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
              Terms of <span className="text-green-500">Service</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium">
              Professional cleaning services you can trust. Our terms ensure quality and transparency.
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
                    Welcome to FreshPlus Professional Cleaning Services. These Terms of Service ("Terms") govern your use
                    of our cleaning services and website located in Melbourne, Victoria, Australia.
                  </p>
                  <p>
                    By engaging our services, you agree to be bound by these Terms. Please read them carefully before
                    booking any cleaning services.
                  </p>
                </div>
              </div>

              {/* Services */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Our Services</h2>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-green-600 mb-4 uppercase tracking-wide">Service Types</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
                    {[
                      "Residential cleaning",
                      "Commercial cleaning",
                      "Deep cleaning",
                      "Carpet cleaning",
                      "Window cleaning",
                      "End of lease cleaning",
                      "Post-construction cleanup"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  All services are performed by trained, insured professionals using environmentally safe cleaning products
                  and modern equipment.
                </p>
              </div>

              {/* Quality Guarantee */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Service Guarantee</h2>
                <div className="bg-green-600 p-8 rounded-[2rem] mb-8 shadow-xl text-white">
                  <h3 className="text-2xl font-bold mb-4 uppercase">100% Satisfaction Guarantee</h3>
                  <p className="text-lg font-medium leading-relaxed opacity-90">
                    We stand behind our work. If you're not completely satisfied with our cleaning service,
                    contact us within 24 hours and we'll return to re-clean the affected areas at no additional charge.
                  </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
                  {[
                    "Quality inspections on request",
                    "Eco-friendly products",
                    "Trained & vetted staff",
                    "Public liability insurance"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Booking and Scheduling */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Booking and Scheduling</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold text-green-600 mb-4 uppercase">Booking Process</h3>
                    <ul className="space-y-2 text-gray-600 font-medium text-sm">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online, phone, or email booking</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Written estimate provided</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Confirmation includes all details</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <h3 className="text-lg font-bold text-green-600 mb-4 uppercase">Cancellations</h3>
                    <ul className="space-y-2 text-gray-600 font-medium text-sm">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 24-hour notice required</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Same-day fees may apply</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Weather reschedules are free</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Pricing and Payment */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Pricing and Payment</h2>
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">Pricing Policy</h3>
                    <p className="text-gray-600 font-medium mb-4">All quotes are in AUD and include GST where applicable. Quotes are valid for 30 days.</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">Payment Terms</h3>
                    <p className="text-gray-600 font-medium">Payment is due upon completion. We accept cash, card, and bank transfers.</p>
                  </div>
                </div>
              </div>

              {/* Customer Responsibilities */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Your Responsibilities</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
                  {[
                    "Provide safe access to property",
                    "Secure valuable/fragile items",
                    "Inform us of special requirements",
                    "Ensure pets are secured",
                    "Report concerns within 24 hours"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed text-lg font-medium mb-6">
                  While we take every precaution, our liability is limited to the cost of the service provided and coverage available through our public liability insurance.
                </p>
                <div className="p-4 bg-orange-50 text-orange-800 rounded-xl text-sm font-bold border border-orange-100">
                  NOTE: We are not liable for damage to items that should have been secured or items in poor condition prior to cleaning.
                </div>
              </div>

              {/* Governing Law */}
              <div className="mb-12">
                <h2 className="text-3xl font-black text-gray-900 mb-6 uppercase tracking-tight">Governing Law</h2>
                <p className="text-gray-600 leading-relaxed text-lg font-medium">
                  These Terms are governed by the laws of Victoria, Australia. We comply with Australian Consumer Law and your rights as a consumer are protected.
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-[2.5rem] text-white shadow-2xl">
                <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">Questions?</h2>
                <p className="text-gray-300 mb-8 font-medium leading-relaxed">
                  If you have any questions about our Terms of Service, please don't hesitate to contact us:
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

              {/* Terms Updates */}
              <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-tight">Terms Updates</h3>
                <p className="text-sm text-gray-500 font-medium">
                  We reserve the right to modify these Terms at any time. Updated Terms will be posted on our
                  website and take effect immediately upon posting.
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




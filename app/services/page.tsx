import { Home, Building2, Sparkles, Wind, Droplets, Armchair, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function ServicesPage() {
  const services = [
    {
      id: 'residential',
      icon: Home,
      title: 'Residential Cleaning',
      description: 'Keep your home fresh and spotless with our comprehensive residential cleaning services.',
      features: [
        'Regular weekly or bi-weekly cleaning',
        'Deep cleaning for thorough sanitization',
        'Move-in/move-out cleaning',
        'Kitchen and bathroom deep cleaning',
        'Dusting and vacuuming',
        'Floor mopping and care'
      ],
      price: 'From $120'
    },
    {
      id: 'commercial',
      icon: Building2,
      title: 'Commercial Cleaning',
      description: 'Professional office and commercial space cleaning to maintain a productive work environment.',
      features: [
        'Office cleaning and sanitization',
        'Retail space maintenance',
        'After-hours cleaning available',
        'Restroom sanitization',
        'Break room cleaning',
        'Trash removal and recycling'
      ],
      price: 'From $200'
    },
    {
      id: 'deep',
      icon: Sparkles,
      title: 'Deep Cleaning',
      description: 'Intensive cleaning service for a thorough refresh of your entire space.',
      features: [
        'Behind and under furniture',
        'Inside cabinets and drawers',
        'Baseboards and molding',
        'Light fixtures and ceiling fans',
        'Detailed kitchen appliances',
        'Bathroom grout and tiles'
      ],
      price: 'From $180'
    },
    {
      id: 'carpet',
      icon: Droplets,
      title: 'Carpet & Upholstery',
      description: 'Professional steam cleaning and stain removal for carpets, rugs, and furniture.',
      features: [
        'Hot water extraction method',
        'Stain and odor removal',
        'Pet odor treatment',
        'Furniture upholstery cleaning',
        'Area rug cleaning',
        'Fast drying technology'
      ],
      price: 'From $80'
    },
    {
      id: 'window',
      icon: Wind,
      title: 'Window Cleaning',
      description: 'Crystal-clear windows inside and out with professional equipment and techniques.',
      features: [
        'Interior and exterior cleaning',
        'Screen cleaning and repair',
        'Track and frame cleaning',
        'High-rise window cleaning',
        'Streak-free finish',
        'Safety equipment included'
      ],
      price: 'From $50'
    },
    {
      id: 'specialized',
      icon: Armchair,
      title: 'Specialized Services',
      description: 'Additional cleaning services for specific needs and situations.',
      features: [
        'Post-construction cleaning',
        'Spring cleaning packages',
        'Garage and basement cleaning',
        'Balcony and patio cleaning',
        'Oven and appliance cleaning',
        'Organizing services'
      ],
      price: 'Custom Quote'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white section-padding">
        <div className="container-custom text-center">
          <h1 className="font-display text-5xl md:text-6xl font-bold text-secondary mb-6">
            Our Services
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Comprehensive cleaning solutions tailored to your needs. From residential to commercial,
            we have the expertise to keep your space immaculate.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className="bg-gradient-to-br from-white to-primary-50 border border-primary-100 rounded-2xl p-8 card-hover"
                >
                  <div className="flex items-start gap-6 mb-6">
                    <div className="bg-primary text-white w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl font-bold text-secondary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-secondary-600 mb-2">
                        {service.description}
                      </p>
                      <div className="text-primary font-bold text-lg">
                        {service.price}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-secondary-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-secondary-900 text-white">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Need a Custom Cleaning Solution?
          </h2>
          <p className="text-xl text-secondary-300 mb-8 max-w-2xl mx-auto">
            Every space is unique. Contact us to discuss your specific cleaning needs and get a personalized quote.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/get-quote" className="btn-primary">
              Get Free Quote
            </Link>
            <Link href="/calculator" className="btn-outline">
              Use Cost Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Calculator, Home, Building2, Sparkles, Clock, CheckCircle } from 'lucide-react'

export default function CalculatorPage() {
  const [formData, setFormData] = useState({
    serviceType: 'residential',
    propertySize: 'small',
    bedrooms: '2',
    bathrooms: '1',
    cleaningType: 'regular',
    frequency: 'once',
    extras: [] as string[]
  })

  const [estimatedCost, setEstimatedCost] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const baseRates = {
    residential: {
      small: 120,
      medium: 180,
      large: 250,
      xlarge: 350
    },
    commercial: {
      small: 200,
      medium: 350,
      large: 500,
      xlarge: 800
    }
  }

  const cleaningTypeMultiplier = {
    regular: 1,
    deep: 1.5,
    moveout: 1.8
  }

  const frequencyDiscount = {
    once: 0,
    weekly: 0.15,
    biweekly: 0.10,
    monthly: 0.05
  }

  const extraServices = [
    { id: 'windows', name: 'Window Cleaning', price: 50 },
    { id: 'carpet', name: 'Carpet Cleaning', price: 80 },
    { id: 'oven', name: 'Oven Cleaning', price: 40 },
    { id: 'fridge', name: 'Fridge Cleaning', price: 30 },
    { id: 'balcony', name: 'Balcony Cleaning', price: 35 },
    { id: 'garage', name: 'Garage Cleaning', price: 60 }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setShowResult(false)
  }

  const handleExtraToggle = (extraId: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId]
    }))
    setShowResult(false)
  }

  const calculateCost = () => {
    const baseRate = baseRates[formData.serviceType as keyof typeof baseRates][
      formData.propertySize as keyof typeof baseRates.residential
    ]
    
    const multiplier = cleaningTypeMultiplier[formData.cleaningType as keyof typeof cleaningTypeMultiplier]
    const discount = frequencyDiscount[formData.frequency as keyof typeof frequencyDiscount]
    
    const extrasTotal = formData.extras.reduce((sum, extraId) => {
      const extra = extraServices.find(e => e.id === extraId)
      return sum + (extra?.price || 0)
    }, 0)
    
    const subtotal = (baseRate * multiplier) + extrasTotal
    const total = subtotal * (1 - discount)
    
    setEstimatedCost(Math.round(total))
    setShowResult(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container-custom py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary text-white rounded-2xl mb-6">
            <Calculator size={40} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-secondary mb-4">
            Cost Calculator
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Get an instant estimate for your cleaning service. Adjust the options below to match your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Service Type */}
              <div className="mb-8">
                <label className="block font-display font-semibold text-secondary mb-4 text-lg">
                  Service Type
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleInputChange('serviceType', 'residential')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      formData.serviceType === 'residential'
                        ? 'border-primary bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-300'
                    }`}
                  >
                    <Home size={32} className={formData.serviceType === 'residential' ? 'text-primary' : 'text-secondary-400'} />
                    <div className="font-semibold text-secondary mt-2">Residential</div>
                  </button>
                  <button
                    onClick={() => handleInputChange('serviceType', 'commercial')}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      formData.serviceType === 'commercial'
                        ? 'border-primary bg-primary-50'
                        : 'border-secondary-200 hover:border-primary-300'
                    }`}
                  >
                    <Building2 size={32} className={formData.serviceType === 'commercial' ? 'text-primary' : 'text-secondary-400'} />
                    <div className="font-semibold text-secondary mt-2">Commercial</div>
                  </button>
                </div>
              </div>

              {/* Property Size */}
              <div className="mb-8">
                <label className="block font-display font-semibold text-secondary mb-4 text-lg">
                  Property Size
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'small', label: 'Small', sqft: '< 1000 sqft' },
                    { value: 'medium', label: 'Medium', sqft: '1000-2000 sqft' },
                    { value: 'large', label: 'Large', sqft: '2000-3000 sqft' },
                    { value: 'xlarge', label: 'X-Large', sqft: '> 3000 sqft' }
                  ].map(size => (
                    <button
                      key={size.value}
                      onClick={() => handleInputChange('propertySize', size.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.propertySize === size.value
                          ? 'border-primary bg-primary-50 text-primary'
                          : 'border-secondary-200 hover:border-primary-300 text-secondary-600'
                      }`}
                    >
                      <div className="font-semibold">{size.label}</div>
                      <div className="text-xs mt-1">{size.sqft}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cleaning Type */}
              <div className="mb-8">
                <label className="block font-display font-semibold text-secondary mb-4 text-lg">
                  Cleaning Type
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { value: 'regular', label: 'Regular Clean', desc: 'Standard cleaning' },
                    { value: 'deep', label: 'Deep Clean', desc: 'Thorough cleaning' },
                    { value: 'moveout', label: 'Move Out', desc: 'End of lease' }
                  ].map(type => (
                    <button
                      key={type.value}
                      onClick={() => handleInputChange('cleaningType', type.value)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        formData.cleaningType === type.value
                          ? 'border-primary bg-primary-50'
                          : 'border-secondary-200 hover:border-primary-300'
                      }`}
                    >
                      <Sparkles size={24} className={formData.cleaningType === type.value ? 'text-primary' : 'text-secondary-400'} />
                      <div className="font-semibold text-secondary mt-2">{type.label}</div>
                      <div className="text-sm text-secondary-600">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Frequency */}
              <div className="mb-8">
                <label className="block font-display font-semibold text-secondary mb-4 text-lg">
                  Frequency
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'once', label: 'One Time', discount: '0%' },
                    { value: 'weekly', label: 'Weekly', discount: '15% off' },
                    { value: 'biweekly', label: 'Bi-Weekly', discount: '10% off' },
                    { value: 'monthly', label: 'Monthly', discount: '5% off' }
                  ].map(freq => (
                    <button
                      key={freq.value}
                      onClick={() => handleInputChange('frequency', freq.value)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.frequency === freq.value
                          ? 'border-primary bg-primary-50 text-primary'
                          : 'border-secondary-200 hover:border-primary-300 text-secondary-600'
                      }`}
                    >
                      <Clock size={20} className="mx-auto mb-2" />
                      <div className="font-semibold text-sm">{freq.label}</div>
                      {freq.value !== 'once' && (
                        <div className="text-xs text-primary font-semibold mt-1">{freq.discount}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Services */}
              <div className="mb-8">
                <label className="block font-display font-semibold text-secondary mb-4 text-lg">
                  Extra Services (Optional)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {extraServices.map(extra => (
                    <button
                      key={extra.id}
                      onClick={() => handleExtraToggle(extra.id)}
                      className={`p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                        formData.extras.includes(extra.id)
                          ? 'border-primary bg-primary-50'
                          : 'border-secondary-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle 
                          size={20} 
                          className={formData.extras.includes(extra.id) ? 'text-primary' : 'text-secondary-300'} 
                        />
                        <span className="font-medium text-secondary">{extra.name}</span>
                      </div>
                      <span className="font-semibold text-primary">${extra.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateCost}
                className="w-full btn-primary text-lg py-4"
              >
                Calculate Estimate
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <h3 className="font-display text-2xl font-bold text-secondary mb-6">
                Your Estimate
              </h3>
              
              {showResult ? (
                <div className="animate-scale-in">
                  <div className="bg-primary-50 rounded-xl p-6 mb-6">
                    <div className="text-sm text-secondary-600 mb-2">Estimated Cost</div>
                    <div className="font-display text-5xl font-bold text-primary mb-2">
                      ${estimatedCost}
                    </div>
                    <div className="text-sm text-secondary-600">
                      {formData.frequency !== 'once' && 'per clean'}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Service Type:</span>
                      <span className="font-semibold text-secondary capitalize">{formData.serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Property Size:</span>
                      <span className="font-semibold text-secondary capitalize">{formData.propertySize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Cleaning Type:</span>
                      <span className="font-semibold text-secondary capitalize">{formData.cleaningType}</span>
                    </div>
                    {formData.extras.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-secondary-600">Extra Services:</span>
                        <span className="font-semibold text-secondary">{formData.extras.length}</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full btn-primary">
                    Book Now
                  </button>
                  <p className="text-xs text-secondary-500 text-center mt-4">
                    Final price may vary based on property condition
                  </p>
                </div>
              ) : (
                <div className="text-center py-12 text-secondary-400">
                  <Calculator size={48} className="mx-auto mb-4 opacity-30" />
                  <p>Fill in the details and click Calculate to see your estimate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
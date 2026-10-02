
import React from 'react';
import Marquee from 'react-fast-marquee';
import paypallogo from '../../assets/partners/paypal.png'
import accenturelogo from '../../assets/partners/accenture.png'
import adobelogo from '../../assets/partners/adobe.png'
import microsoftlogo from '../../assets/partners/microsoft_logo.png'
import walmartlogo from '../../assets/partners/walmart_logo.png'

const companyLogos = [
  paypallogo, accenturelogo, adobelogo,
  microsoftlogo, walmartlogo,
];

const Colaborators = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
          Our Collaborators
        </span>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
          Trusted by{' '}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Leading Brands
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Learn skills that are valued by some of the world's most innovative companies.
        </p>

        {/* Marquee with faded edges */}
        <div className="relative mt-12">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent md:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent md:w-40" />

          <Marquee speed={50} pauseOnHover={true} gradient={false}>
            {companyLogos.map((logo, index) => (
              <div
                key={index}
                className="group mx-4 flex h-24 w-48 items-center justify-center rounded-2xl border border-slate-100 bg-white px-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10"
              >
                <img
                  src={logo}
                  alt={`Client Logo ${index + 1}`}
                  className="max-h-12 w-auto object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Colaborators;
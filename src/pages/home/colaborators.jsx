import React from 'react';
import Marquee from 'react-fast-marquee';
import paypallogo from '../../assets/partners/paypal.png'
import accenturelogo from '../../assets/partners/accenture.png'
import adobelogo from '../../assets/partners/adobe.png'
import microsoftlogo from '../../assets/partners/microsoft_logo.png'
import walmartlogo from '../../assets/partners/walmart_logo.png'
// Sample logos - replace with your actual image paths or imports
const companyLogos = [
  paypallogo,accenturelogo,adobelogo,
  microsoftlogo,walmartlogo
  ];

const Colaborators = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Trusted by Leading Brands</h2>
        <Marquee speed={50} pauseOnHover={true} gradient={false}>
          <div className="flex items-center gap-10">
            {companyLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={logo}
                  alt={`Client Logo ${index + 1}`}
                  className="h-16 w-auto hover:grayscale-0 transition duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default Colaborators;

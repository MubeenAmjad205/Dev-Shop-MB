import React from 'react';

const features = [
  {
    title: 'Free Shipping',
    desc: 'On all orders over $50',
    icon: '🚚'
  },
  {
    title: 'Easy Returns',
    desc: '30-day return policy',
    icon: '📦'
  },
  {
    title: 'Secure Payment',
    desc: '100% safe checkout',
    icon: '🔒'
  },
  {
    title: '24/7 Support',
    desc: 'Dedicated kid-experts',
    icon: '💬'
  }
];

const SectionAppDownload = () => {
  return (
    <div className="container py-16">
      
      {/* App Download Box */}
      <div className="bg-primary rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 md:w-1/2 text-white space-y-6 text-center md:text-left mb-10 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-md">
            The Toy Shop in Your Pocket.
          </h2>
          <p className="text-lg text-white/90 font-medium max-w-md mx-auto md:mx-0">
            Download our app to get exclusive deals, early access to new toys, and a personalized shopping experience for your kids.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
            <button className="bg-white text-neutral-900 px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform">
              🍏 App Store
            </button>
            <button className="bg-white text-neutral-900 px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform">
              🤖 Google Play
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full md:w-1/3 flex justify-center">
          <div className="w-64 h-[400px] bg-white rounded-[2.5rem] shadow-2xl border-8 border-neutral-800 p-4 flex flex-col overflow-hidden rotate-12 hover:rotate-0 transition-transform duration-500">
             <div className="w-full h-32 bg-teal-100 rounded-2xl mb-4"></div>
             <div className="w-full h-16 bg-blue-100 rounded-xl mb-3"></div>
             <div className="w-full h-16 bg-pink-100 rounded-xl mb-3"></div>
             <div className="w-full h-16 bg-orange-100 rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface dark:bg-neutral-900 rounded-[2rem] p-8 border border-neutral-100 dark:border-neutral-800">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-3">
            <div className="w-16 h-16 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center text-3xl shadow-sm">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-bold text-neutral-900 dark:text-white">{feature.title}</h4>
              <p className="text-sm text-neutral-500">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SectionAppDownload;

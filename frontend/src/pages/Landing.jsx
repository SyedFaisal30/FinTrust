import React from "react";
import landingImg from "../assets/landingimg.jpg";

const Landing = () => {
  return (
    <main className="bg-white text-gray-800 w-full">
      <section className="w-full px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Banking Made <span className="text-blue-600">Simple</span> & Secure
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Experience fast, reliable, and transparent banking services with
            BankerOp. Your money. Your control.
          </p>
          <div className="flex gap-4">
            <a
              href="/signup"
              className="px-6 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a
              href="/features"
              className="px-6 py-3 text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={landingImg}
            alt="Landing Illustration"
            className="w-full max-w-md md:max-w-lg h-auto rounded-xl shadow-lg object-contain"
          />
        </div>
      </section>
    </main>
  );
};

export default Landing;

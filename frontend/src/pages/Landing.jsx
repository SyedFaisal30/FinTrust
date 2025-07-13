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
          <p className="text-lg text-gray-600 mb-4">
            Welcome to{" "}
            <span className="font-semibold text-gray-800">Fintrust</span> —
            where modern banking meets trust and convenience.
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Open your account in minutes, manage your money with ease, and enjoy
            banking that works on your terms — fast, safe, and always
            transparent.
          </p>
          <div className="flex">
            <a
              href="/login"
              className="px-6 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
            >
              Get Started
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

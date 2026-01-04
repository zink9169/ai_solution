// src/pages/Home.jsx

import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
export default function Home() {
  return (
    <div className="flex flex-col font-inter">
      {/* HERO SECTION */}
      <section className="w-full">
        <div
          className="relative h-[430px] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-6">
            <div className="max-w-2xl text-white space-y-4">
              <h1 className="text-3xl md:text-4xl font-extrabold">
                AI-Solutions for Modern Businesses
              </h1>
              <p className="text-sm md:text-base leading-relaxed text-slate-200">
                We help companies build scalable, secure and intelligent
                software solutions. From AI-powered automation to custom systems
                development, we deliver technology that moves your business
                forward.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-2">
                <Link
                  to="/contact"
                  className="px-5 py-2 rounded-md bg-sky-600 text-white text-sm font-semibold"
                >
                  Contact Us
                </Link>

                <Link
                  to="/jobs"
                  className="px-5 py-2 rounded-md border border-white text-white text-sm font-semibold"
                >
                  Submit Job Requirement
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="w-full py-10 bg-[#f9f9f9]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Content (Text) */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-6">
              Our Vision
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Our vision is to revolutionize industries by providing innovative
              AI-driven solutions that enable businesses to enhance operational
              efficiency, foster smarter decision-making, and ultimately drive
              growth. We are committed to integrating advanced artificial
              intelligence technologies to solve real-world problems and pave
              the way for a sustainable, tech-driven future.
            </p>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/5668842/pexels-photo-5668842.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Vision"
              className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="w-full  bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/8866736/pexels-photo-8866736.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Mission"
              className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105"
            />
          </div>

          {/* Right Content (Text) */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Our mission is to harness the power of artificial intelligence to
              create customized solutions that streamline processes, increase
              automation, and enable smarter business strategies. Through
              innovative AI applications, we help our clients improve
              efficiency, reduce operational costs, and stay ahead of the
              competition in the rapidly evolving digital world.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTIONS TEASER */}
      <section className="w-full bg-[#f2f2f2] py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-600 text-center mb-10">
            Our Software Solutions
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* AI Automation */}
            <div className="bg-white rounded-md shadow-sm p-6 flex flex-col items-center text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png"
                alt="AI Automation"
                className="h-20 w-20 mb-4"
              />
              <h3 className="font-semibold text-lg text-slate-800">
                AI Automation
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Automate repetitive business tasks using smart machine learning
                systems.
              </p>
            </div>

            {/* Custom Software */}
            <div className="bg-white rounded-md shadow-sm p-6 flex flex-col items-center text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
                alt="Custom Software"
                className="h-20 w-20 mb-4"
              />
              <h3 className="font-semibold text-lg text-slate-800">
                Custom Software
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Tailor-made applications built for your specific business needs.
              </p>
            </div>

            {/* Cloud & API */}
            <div className="bg-white rounded-md shadow-sm p-6 flex flex-col items-center text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4144/4144747.png"
                alt="Cloud & API Systems"
                className="h-20 w-20 mb-4"
              />
              <h3 className="font-semibold text-lg text-slate-800">
                Cloud & API Systems
              </h3>
              <p className="text-sm text-slate-600 mt-2">
                Modern cloud infrastructures, secure APIs, and scalable backend
                systems.
              </p>
            </div>
          </div>

          {/* View More */}
          <div className="text-center mt-6">
            <Link
              to="/solutions"
              className="text-sky-600 font-semibold hover:underline"
            >
              View All Solutions →
            </Link>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="w-full bg-white py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-600 text-center mb-10">
            What Our Customers Say
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Review Item 1 */}
            <div className="bg-[#f2f2f2] rounded-md px-6 py-6 flex gap-4">
              {/* Avatar */}
              <div className="h-12 w-12 rounded-full bg-black/20 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">Htet Naing</p>
                {/* Star Rating */}
                <div className="flex items-center space-x-1 mt-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`w-5 h-5 ${
                        index < 4 ? "text-yellow-400" : "text-gray-300"
                      }`} // Set the rating dynamically if needed
                    />
                  ))}
                </div>
                <p className="text-xs md:text-sm leading-relaxed text-slate-700 mt-1">
                  “AI-Solutions transformed our workflow. Smooth setup and very
                  professional support.”
                </p>
              </div>
            </div>

            {/* Review Item 2 */}
            <div className="bg-[#f2f2f2] rounded-md px-6 py-6 flex gap-4">
              {/* Avatar */}
              <div className="h-12 w-12 rounded-full bg-black/20 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">Nyein Chan Aung</p>
                {/* Star Rating */}
                <div className="flex items-center space-x-1 mt-1">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`w-5 h-5 ${
                        index < 5 ? "text-yellow-400" : "text-gray-300"
                      }`} // Set the rating dynamically if needed
                    />
                  ))}
                </div>
                <p className="text-xs md:text-sm leading-relaxed text-slate-700 mt-1">
                  “Clear communication and fast delivery. Highly recommended.”
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/feedback"
              className="text-sky-600 font-semibold hover:underline"
            >
              Read More Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTS & WORKSHOPS */}
      <section className="w-full bg-[#f2f2f2] py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-sky-600 text-center mb-10">
            Events & Workshops
          </h2>

          {/*
      Use ONLY the first 2 events from Gallery.jsx
      (Copy the event objects into this file OR import later if you separate data)
    */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                date: "March 12, 2025",
                title: "AI Innovation Workshop",
                desc: "Hands-on exploration of AI tools, automation workflows, and real-world business integrations.",
                img: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1600",
              },
              {
                date: "April 5, 2025",
                title: "Tech Leadership Talk",
                desc: "A transformation talk about digital leadership, software trends, and future-thinking mindsets.",
                img: "https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1600",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="relative bg-white rounded-lg shadow-sm overflow-hidden group"
              >
                {/* Event image */}
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Text Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-xl text-slate-800">
                    {event.title}
                  </h3>
                  <p className="text-sky-600 text-sm font-medium">
                    {event.date}
                  </p>
                  <p className="text-sm text-slate-600 mt-2">{event.desc}</p>

                  <div className="mt-4 text-right">
                    <Link
                      to="/gallery"
                      className="text-sky-600 text-sm font-semibold hover:underline"
                    >
                      View Event Photos →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#e7e7e7] py-12 text-center">
        <h3 className="text-xl font-bold text-sky-600">AI-Solutions</h3>

        <p className="text-sm font-semibold mt-3 text-slate-700">
          “Empowering businesses with intelligent software.”
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/contact"
            className="px-5 py-2 bg-sky-600 text-white rounded-md font-semibold"
          >
            Contact Us
          </Link>

          <Link
            to="/articles"
            className="px-5 py-2 bg-white border border-sky-600 text-sky-600 rounded-md font-semibold"
          >
            Read Articles
          </Link>
        </div>

        <p className="text-xs mt-6 text-slate-700">
          © 2025 <span className="text-sky-600">AI-Solutions</span> — All rights
          reserved
        </p>
      </footer>
    </div>
  );
}

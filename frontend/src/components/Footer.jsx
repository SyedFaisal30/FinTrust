import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Globe
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-6 mt-12">
      <div className="w-full px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600 text-center md:text-left">© 2025 BankerOp. All rights reserved.</p>

        <div className="flex gap-6 mt-3 md:mt-0 text-sm text-gray-500 items-center">
          <a href="https://github.com/SyedFaisal30" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <Github className="w-5 h-5" />
          </a>

          <a href="https://www.linkedin.com/in/syedfaisal30/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <Linkedin className="w-5 h-5" />
          </a>

          <a href="mailto:sfarz172320@gmail.com" className="hover:text-blue-600">
            <Mail className="w-5 h-5" />
          </a>

          <a href="https://wa.me/919892996342" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <Phone className="w-5 h-5" />
          </a>

          <a href="https://syedfaisal30.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

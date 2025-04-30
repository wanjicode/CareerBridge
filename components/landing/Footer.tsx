import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <span className="text-2xl font-bold text-blue-600">
              Career<span className="text-amber-500">Bridge</span>
            </span>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xs">
              Connecting ambitious professionals with industry experts for career guidance and mentorship.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialLink href="#" aria-label="Facebook">
                <Facebook size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <Twitter size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <Instagram size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <Linkedin size={20} />
              </SocialLink>
              <SocialLink href="#" aria-label="GitHub">
                <Github size={20} />
              </SocialLink>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-2">
              <FooterLink href="#">How it works</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
              <FooterLink href="#">Testimonials</FooterLink>
              <FooterLink href="#">FAQ</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">eBooks</FooterLink>
              <FooterLink href="#">Webinars</FooterLink>
              <FooterLink href="#">Career Guides</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CareerBridge. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, children, ...props }) {
  return (
    <a 
      href={href} 
      className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
      {...props}
    >
      {children}
    </a>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
}
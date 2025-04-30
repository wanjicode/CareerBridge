import { CalendarDays, Briefcase, LucideGraduationCap, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 dark:text-blue-50 mb-6 tracking-tight">
              <span className="text-amber-500">Stranded</span> in your career?
            </h1>
            <p className="text-xl md:text-2xl text-blue-700 dark:text-blue-200 mb-8 max-w-3xl mx-auto">
              Worried about your first job? <span className="font-bold">CareerBridge</span> got you!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply/mentee">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-md text-lg">
                  Apply as Mentee
                </Button>
              </Link>
              <Link href="/apply/mentor">
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 px-6 py-6 rounded-md text-lg">
                  Apply as Mentor
                </Button>
              </Link>
              <Link href="/login?role=admin">
                <Button size="lg" variant="ghost" className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 px-6 py-6 rounded-md text-lg">
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900 dark:text-blue-50">How CareerBridge Works</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<CalendarDays className="h-10 w-10 text-blue-500" />} 
                title="Schedule Mentorship Sessions"
                description="Connect with industry experts through structured mentoring sessions tailored to your career goals."
              />
              <FeatureCard 
                icon={<Briefcase className="h-10 w-10 text-blue-500" />} 
                title="Industry Expertise"
                description="Learn from professionals with real-world experience in your field of interest."
              />
              <FeatureCard 
                icon={<LucideGraduationCap className="h-10 w-10 text-blue-500" />} 
                title="Personalized Growth"
                description="Receive customized guidance to navigate your career path with confidence."
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-blue-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-blue-900 dark:text-blue-50">Success Stories</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard 
                quote="CareerBridge connected me with a mentor who helped me land my dream job at a tech startup. The personalized guidance made all the difference."
                name="Alex Johnson"
                role="Software Developer"
              />
              <TestimonialCard 
                quote="As a mentor, I've been able to give back to the community while sharpening my leadership skills. It's a win-win experience."
                name="Sarah Williams"
                role="Product Manager"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Bridge the Gap in Your Career?</h2>
            <p className="text-xl mb-8">Join our community of mentors and mentees today.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/apply/mentee">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-6 rounded-md text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/apply/mentor">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 px-6 py-6 rounded-md text-lg">
                  Become a Mentor
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white dark:bg-blue-900 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 dark:border-blue-800">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-blue-900 dark:text-blue-50">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
      <div className="mt-4">
        <Link href="/login" className="text-blue-500 inline-flex items-center">
          Learn more <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, name, role }) {
  return (
    <div className="bg-white dark:bg-blue-900 p-6 rounded-lg shadow-md border border-gray-100 dark:border-blue-800">
      <div className="mb-4">
        <Award className="h-8 w-8 text-amber-500" />
      </div>
      <p className="text-gray-700 dark:text-gray-200 mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-blue-900 dark:text-blue-50">{name}</p>
        <p className="text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  );
}
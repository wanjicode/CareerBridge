import { 
  UserPlus, Users, Calendar, MessageCircle, 
  BookOpen, Award, ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-50 mb-6">
              How CareerBridge Works
            </h1>
            <p className="text-xl text-blue-700 dark:text-blue-200 mb-8">
              Your journey to career success starts here
            </p>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 px-4 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The Process</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <ProcessCard
                icon={<UserPlus className="h-8 w-8 text-blue-500" />}
                step="1"
                title="Sign Up"
                description="Create your profile and tell us about your career goals and interests"
              />
              <ProcessCard
                icon={<Users className="h-8 w-8 text-blue-500" />}
                step="2"
                title="Get Matched"
                description="We'll match you with a mentor who aligns with your goals and expertise"
              />
              <ProcessCard
                icon={<Calendar className="h-8 w-8 text-blue-500" />}
                step="3"
                title="Start Learning"
                description="Schedule sessions and begin your mentorship journey"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Program Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<MessageCircle className="h-6 w-6 text-blue-500" />}
                title="1-on-1 Mentoring"
                description="Regular one-on-one sessions with your mentor"
              />
              <FeatureCard
                icon={<BookOpen className="h-6 w-6 text-blue-500" />}
                title="Learning Resources"
                description="Access to curated resources and materials"
              />
              <FeatureCard
                icon={<Calendar className="h-6 w-6 text-blue-500" />}
                title="Flexible Scheduling"
                description="Schedule sessions at your convenience"
              />
              <FeatureCard
                icon={<Users className="h-6 w-6 text-blue-500" />}
                title="Community Access"
                description="Join a community of like-minded professionals"
              />
              <FeatureCard
                icon={<Award className="h-6 w-6 text-blue-500" />}
                title="Skill Development"
                description="Structured approach to developing key skills"
              />
              <FeatureCard
                icon={<MessageCircle className="h-6 w-6 text-blue-500" />}
                title="Ongoing Support"
                description="Continuous guidance throughout your journey"
              />
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-4 bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Your Journey</h2>
            <div className="space-y-8">
              <TimelineItem
                title="Application"
                description="Submit your application and tell us about your goals"
              />
              <TimelineItem
                title="Matching Process"
                description="We'll review your profile and match you with the right mentor"
              />
              <TimelineItem
                title="Initial Meeting"
                description="Have your first meeting and set expectations"
              />
              <TimelineItem
                title="Regular Sessions"
                description="Engage in regular mentoring sessions and track progress"
              />
              <TimelineItem
                title="Goal Achievement"
                description="Work towards and achieve your career goals"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8">Join CareerBridge today and take the first step towards your career goals.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Apply as Mentee
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                Become a Mentor
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ProcessCard({ icon, step, title, description }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            {icon}
          </div>
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold mb-4">
            {step}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function TimelineItem({ title, description }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
        <div className="flex-grow w-0.5 bg-blue-200 dark:bg-blue-800"></div>
      </div>
      <div className="pb-8">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}
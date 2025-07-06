import { Briefcase, Users, Award, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-50 mb-6">
              About CareerBridge
            </h1>
            <p className="text-xl text-blue-700 dark:text-blue-200 mb-8">
              Bridging the gap between aspiring professionals and industry experts
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 bg-white dark:bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
                CareerBridge is dedicated to empowering the next generation of professionals by connecting them with experienced mentors who can guide them through their career journey. We believe that mentorship is a powerful tool for professional growth and development.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Community</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Building strong connections and fostering meaningful relationships within our community
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Award className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Striving for the highest standards in mentorship and professional development
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Impact</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Making a real difference in people's careers and professional lives
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <TeamMember
                name="Susan Maina"
                role="Founder & CEO"
                image="https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg"
              />
              <TeamMember
                name="Victor"
                role="Head of Mentorship"
                image="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
              />
              <TeamMember
                name="Raynor"
                role="Community Lead"
                image="https://images.pexels.com/photos/3757004/pexels-photo-3757004.jpeg"
              />
              <TeamMember
                name="Kelvin"
                role="Community Lead"
                image="https://images.pexels.com/photos/3757004/pexels-photo-3757004.jpeg"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function TeamMember({ name, role, image }) {
  return (
    <div className="text-center">
      <div className="relative w-48 h-48 mx-auto mb-4">
        <img
          src={image}
          alt={name}
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-gray-600 dark:text-gray-400">{role}</p>
    </div>
  );
}
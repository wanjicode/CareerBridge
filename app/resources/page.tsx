import { 
  FileText, BookOpen, Video, Download,
  ExternalLink, Search, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-blue-50 mb-6">
              Career Resources
            </h1>
            <p className="text-xl text-blue-700 dark:text-blue-200 mb-8">
              Everything you need to accelerate your career growth
            </p>
            <div className="max-w-xl mx-auto">
              <div className="flex gap-2">
                <Input 
                  placeholder="Search resources..." 
                  className="bg-white dark:bg-gray-800"
                />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 px-4 bg-white dark:bg-black">
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <TabsList>
                  <TabsTrigger value="all">All Resources</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="guides">Guides</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                </TabsList>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <TabsContent value="all">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ResourceCard
                    icon={<FileText className="h-6 w-6 text-red-500" />}
                    title="ATS-Friendly Resume Template"
                    description="Professional resume template optimized for Applicant Tracking Systems"
                    type="Template"
                    tags={["Resume", "ATS", "Job Search"]}
                  />
                  <ResourceCard
                    icon={<BookOpen className="h-6 w-6 text-blue-500" />}
                    title="Personal Branding Guide"
                    description="Comprehensive guide to building your professional brand"
                    type="Guide"
                    tags={["Branding", "LinkedIn", "Social Media"]}
                  />
                  <ResourceCard
                    icon={<Video className="h-6 w-6 text-purple-500" />}
                    title="Interview Mastery Course"
                    description="Master the art of job interviews with this comprehensive course"
                    type="Course"
                    tags={["Interviews", "Career"]}
                  />
                  <ResourceCard
                    icon={<FileText className="h-6 w-6 text-green-500" />}
                    title="Cover Letter Template"
                    description="Customizable cover letter template with examples"
                    type="Template"
                    tags={["Cover Letter", "Job Search"]}
                  />
                  <ResourceCard
                    icon={<BookOpen className="h-6 w-6 text-orange-500" />}
                    title="Networking Strategy Guide"
                    description="Learn effective networking strategies for career growth"
                    type="Guide"
                    tags={["Networking", "Career Growth"]}
                  />
                  <ResourceCard
                    icon={<Video className="h-6 w-6 text-blue-500" />}
                    title="Public Speaking Course"
                    description="Improve your presentation and public speaking skills"
                    type="Course"
                    tags={["Communication", "Skills"]}
                  />
                </div>
              </TabsContent>

              <TabsContent value="templates">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ResourceCard
                    icon={<FileText className="h-6 w-6 text-red-500" />}
                    title="ATS-Friendly Resume Template"
                    description="Professional resume template optimized for Applicant Tracking Systems"
                    type="Template"
                    tags={["Resume", "ATS", "Job Search"]}
                  />
                  <ResourceCard
                    icon={<FileText className="h-6 w-6 text-green-500" />}
                    title="Cover Letter Template"
                    description="Customizable cover letter template with examples"
                    type="Template"
                    tags={["Cover Letter", "Job Search"]}
                  />
                  <ResourceCard
                    icon={<FileText className="h-6 w-6 text-blue-500" />}
                    title="Portfolio Template"
                    description="Professional portfolio template for showcasing your work"
                    type="Template"
                    tags={["Portfolio", "Personal Brand"]}
                  />
                </div>
              </TabsContent>

              <TabsContent value="guides">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ResourceCard
                    icon={<BookOpen className="h-6 w-6 text-blue-500" />}
                    title="Personal Branding Guide"
                    description="Comprehensive guide to building your professional brand"
                    type="Guide"
                    tags={["Branding", "LinkedIn", "Social Media"]}
                  />
                  <ResourceCard
                    icon={<BookOpen className="h-6 w-6 text-orange-500" />}
                    title="Networking Strategy Guide"
                    description="Learn effective networking strategies for career growth"
                    type="Guide"
                    tags={["Networking", "Career Growth"]}
                  />
                  <ResourceCard
                    icon={<BookOpen className="h-6 w-6 text-purple-500" />}
                    title="Salary Negotiation Guide"
                    description="Master the art of negotiating your salary and benefits"
                    type="Guide"
                    tags={["Negotiation", "Career"]}
                  />
                </div>
              </TabsContent>

              <TabsContent value="courses">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ResourceCard
                    icon={<Video className="h-6 w-6 text-purple-500" />}
                    title="Interview Mastery Course"
                    description="Master the art of job interviews with this comprehensive course"
                    type="Course"
                    tags={["Interviews", "Career"]}
                  />
                  <ResourceCard
                    icon={<Video className="h-6 w-6 text-blue-500" />}
                    title="Public Speaking Course"
                    description="Improve your presentation and public speaking skills"
                    type="Course"
                    tags={["Communication", "Skills"]}
                  />
                  <ResourceCard
                    icon={<Video className="h-6 w-6 text-green-500" />}
                    title="Leadership Skills Course"
                    description="Develop essential leadership skills for career advancement"
                    type="Course"
                    tags={["Leadership", "Management"]}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Resources</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <FeaturedResourceCard
                title="Career Development Bundle"
                description="Complete package including resume templates, interview guides, and career planning resources"
                image="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
              />
              <FeaturedResourceCard
                title="Professional Growth Toolkit"
                description="Essential tools and templates for accelerating your professional development"
                image="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ResourceCard({ icon, title, description, type, tags }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          {icon}
          <Badge variant="outline">{type}</Badge>
        </div>
        <CardTitle className="text-lg mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <Badge key={i} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <Button className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardContent>
    </Card>
  );
}

function FeaturedResourceCard({ title, description, image }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full">
          <ExternalLink className="h-4 w-4 mr-2" />
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CreditCard,
  Users,
  PieChart,
  Sparkles,
  Receipt,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col pt-16">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
              Split expenses. Simplify life.
            </div>

            <h1 className="text-4xl md:text-7xl font-bold max-w-4xl gradient-title">
              The smartest way to split expenses with friends
            </h1>

            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Track shared expenses, split bills effortlessly, and settle up
              quickly. Never worry about who owes who again.
            </p>

            <div className="flex flex-col md:flex-row gap-4 min-[400px]:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700"
              >
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50"
              >
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase */}
      <section className="px-4 md:px-6 py-12">
        <div className="relative container mx-auto mx-auto max-w-5xl overflow-hidden rounded-xl border bg-background shadow-xl">
          <div className="gradient p-1 bg-opacity-10">
            <div className="overflow-hidden rounded-lg border">
              {/* This would be an image or screenshot of your app */}
              <div className="aspect-[16/9] bg-gray-100 flex items-center justify-center">
                <p className="text-gray-400">App screenshot will go here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                Features
              </div>
              <h2 className="text-3xl md:text-4xl gradient-title">
                Everything you need to split expenses
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform provides all the tools you need to handle shared
                expenses with ease.
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Group Expenses</h3>
              <p className="text-center text-gray-500">
                Create groups for roommates, trips, or events to keep expenses
                organized.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-teal-100 p-3">
                <CreditCard className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold">Smart Settlements</h3>
              <p className="text-center text-gray-500">
                Our algorithm simplifies debts so you make fewer transactions
                when settling up.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3">
                <PieChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Expense Analytics</h3>
              <p className="text-center text-gray-500">
                Track spending patterns and see insights on your shared
                expenses.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-teal-100 p-3">
                <Sparkles className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold">AI-Powered Entry</h3>
              <p className="text-center text-gray-500">
                Simply type "Split $30 dinner with Bob and Alice" and let our AI
                handle the rest.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-green-100 p-3">
                <Receipt className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Multiple Split Types</h3>
              <p className="text-center text-gray-500">
                Split equally, by percentage, or exact amounts to fit any
                situation.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-teal-100 p-3">
                <svg
                  className="h-6 w-6 text-teal-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 14v1" />
                  <path d="M9 19v2" />
                  <path d="M9 3v2" />
                  <path d="M9 9v1" />
                  <path d="M15 14v1" />
                  <path d="M15 19v2" />
                  <path d="M15 3v2" />
                  <path d="M15 9v1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Real-time Updates</h3>
              <p className="text-center text-gray-500">
                See expenses and settlements in real-time as your friends add
                them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                How It Works
              </div>
              <h2 className="text-3xl md:text-4xl gradient-title">
                Splitting expenses has never been easier
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Follow these simple steps to start tracking and splitting
                expenses with friends.
              </p>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold">Create or Join a Group</h3>
              <p className="text-center text-gray-500">
                Set up a group for your roommates, trip, or event. Invite
                friends to join.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold">Add Expenses</h3>
              <p className="text-center text-gray-500">
                Record who paid for what and how it should be split among group
                members.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold">Settle Up</h3>
              <p className="text-center text-gray-500">
                See who owes what and record payments when debts are settled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-700">
                Testimonials
              </div>
              <h2 className="text-3xl md:text-4xl gradient-title">
                What our users are saying
              </h2>
            </div>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
              <div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-gray-500">
                  "SplitEase has made managing expenses with my roommates so
                  much easier. No more awkward money conversations!"
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="text-sm font-medium">Alex Johnson</p>
                  <p className="text-sm text-gray-500">College Student</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
              <div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-gray-500">
                  "Planned a trip with friends and SplitEase made keeping track
                  of all our expenses effortless. Great app!"
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="text-sm font-medium">Sarah Chen</p>
                  <p className="text-sm text-gray-500">Trip Organizer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="flex flex-col justify-between space-y-4 rounded-lg border p-6 shadow-sm">
              <div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-4 text-gray-500">
                  "The AI feature is amazing! I can just type what I spent and
                  who was there, and it figures everything out."
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                <div>
                  <p className="text-sm font-medium">Michael Torres</p>
                  <p className="text-sm text-gray-500">Tech Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Ready to simplify expense sharing?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users who have made splitting expenses
                stress-free.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="gradient hover:opacity-90">
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 text-center text-sm text-gray-500 py-12">
        © {new Date().getFullYear()} SplitEase. All rights reserved.
      </footer>
    </div>
  );
}

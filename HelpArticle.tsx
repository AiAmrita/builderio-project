import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Settings,
} from "lucide-react";

interface HelpArticleProps {
  title: string;
  category: string;
  readTime: string;
  lastUpdated: string;
  content: React.ReactNode;
  relatedArticles?: { title: string; slug: string }[];
}

export default function HelpArticle({
  title,
  category,
  readTime,
  lastUpdated,
  content,
  relatedArticles = [],
}: HelpArticleProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                ARRSAL
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <Link
                to="/features"
                className="text-gray-500 hover:text-gray-900"
              >
                Features
              </Link>
              <Link to="/pricing" className="text-gray-500 hover:text-gray-900">
                Pricing
              </Link>
              <Link
                to="/help"
                className="text-blue-600 font-medium border-b-2 border-blue-600"
              >
                Help
              </Link>
              <Link
                to="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            to="/help"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Help Center
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <Badge variant="outline" className="mb-4">
            {category}
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {readTime}
            </div>
            <div>Last updated: {lastUpdated}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <div className="prose max-w-none">{content}</div>

                {/* Article Feedback */}
                <div className="border-t pt-8 mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Was this article helpful?
                  </h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Yes
                    </Button>
                    <Button variant="outline" size="sm">
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      No
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {relatedArticles.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Related Articles
                  </h3>
                  <div className="space-y-3">
                    {relatedArticles.map((article, idx) => (
                      <Link
                        key={idx}
                        to={`/help/articles/${article.slug}`}
                        className="block text-sm text-blue-600 hover:text-blue-700"
                      >
                        {article.title}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Need more help?</h3>
                <div className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full">
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link to="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">ARRSAL</h4>
              <p className="text-gray-400">
                AI-powered business management platform for modern companies.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/demo" className="hover:text-white">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Admin</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/controls"
                    className="hover:text-white flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    ARRSAL Controls
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ARRSAL. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Calculator,
  TrendingUp,
  Download,
  RefreshCw,
  Sparkles,
  DollarSign,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Target,
} from "lucide-react";

export default function BudgetPlanner() {
  const [selectedYear, setSelectedYear] = useState("2023");
  const [budgetIncrease, setBudgetIncrease] = useState("10");
  const [customIncrease, setCustomIncrease] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  // Mock QuickBooks data for last year
  const lastYearData = {
    totalRevenue: 1250000,
    totalExpenses: 950000,
    netIncome: 300000,
    categories: [
      { name: "Office Rent", amount: 120000, percentage: 12.6 },
      { name: "Salaries", amount: 480000, percentage: 50.5 },
      { name: "Marketing", amount: 85000, percentage: 8.9 },
      { name: "Software", amount: 36000, percentage: 3.8 },
      { name: "Utilities", amount: 24000, percentage: 2.5 },
      { name: "Travel", amount: 15000, percentage: 1.6 },
      { name: "Other", amount: 190000, percentage: 20.0 },
    ],
    arrears: [
      { vendor: "Office Supplies Co.", amount: 2500, daysOverdue: 45 },
      { vendor: "Marketing Agency", amount: 8000, daysOverdue: 30 },
      { vendor: "Software License", amount: 1200, daysOverdue: 15 },
    ],
  };

  const generateBudget = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowAIRecommendations(true);
    }, 2000);
  };

  const getScaledAmount = (amount: number) => {
    const increase = customIncrease || budgetIncrease;
    return amount * (1 + parseInt(increase) / 100);
  };

  const aiRecommendations = [
    {
      category: "Salaries",
      recommendation:
        "Consider performance-based increases rather than flat percentage",
      savings: 15000,
      priority: "high",
    },
    {
      category: "Marketing",
      recommendation: "Shift 20% budget to digital channels for better ROI",
      savings: 8500,
      priority: "medium",
    },
    {
      category: "Software",
      recommendation: "Bundle subscriptions for volume discounts",
      savings: 4200,
      priority: "low",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Budget Planner
          </h2>
          <p className="text-gray-600">
            Generate intelligent budget forecasts from your QuickBooks data
          </p>
        </div>
        <Button onClick={generateBudget} disabled={isGenerating}>
          {isGenerating ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Calculator className="h-4 w-4 mr-2" />
          )}
          {isGenerating ? "Generating..." : "Generate Budget"}
        </Button>
      </div>

      <Tabs defaultValue="setup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="setup">Budget Setup</TabsTrigger>
          <TabsTrigger value="preview">Budget Preview</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="export">Export & Save</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Source</CardTitle>
                <CardDescription>
                  Select the base year for budget calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="year">Base Year</Label>
                  <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  >
                    <option value="2023">2023 (QuickBooks Data)</option>
                    <option value="2022">2022 (Historical)</option>
                  </select>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">
                      QuickBooks Connected
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Last sync: {new Date().toLocaleDateString()} at{" "}
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Parameters</CardTitle>
                <CardDescription>
                  Set your budget increase preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Budget Increase</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {["5", "10", "15"].map((value) => (
                      <Button
                        key={value}
                        variant={
                          budgetIncrease === value ? "default" : "outline"
                        }
                        onClick={() => {
                          setBudgetIncrease(value);
                          setCustomIncrease("");
                        }}
                        className="w-full"
                      >
                        {value}%
                      </Button>
                    ))}
                  </div>
                  <div className="mt-3">
                    <Label htmlFor="custom">Custom Percentage</Label>
                    <Input
                      id="custom"
                      type="number"
                      placeholder="Enter custom %"
                      value={customIncrease}
                      onChange={(e) => {
                        setCustomIncrease(e.target.value);
                        setBudgetIncrease("");
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {selectedYear} Financial Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${lastYearData.totalRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    ${lastYearData.totalExpenses.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Expenses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${lastYearData.netIncome.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Net Income</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>2024 Budget Forecast</CardTitle>
              <CardDescription>
                Based on {selectedYear} data with{" "}
                {customIncrease || budgetIncrease}% increase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lastYearData.categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-sm text-gray-600">
                        {category.percentage}% of total budget
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        ${getScaledAmount(category.amount).toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600">
                        +$
                        {(
                          getScaledAmount(category.amount) - category.amount
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Budget 2024</span>
                    <span>
                      $
                      {getScaledAmount(
                        lastYearData.totalExpenses,
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    Increase: $
                    {(
                      getScaledAmount(lastYearData.totalExpenses) -
                      lastYearData.totalExpenses
                    ).toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          {lastYearData.arrears.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertCircle className="h-5 w-5" />
                  Arrears Detection
                </CardTitle>
                <CardDescription>
                  Outstanding payments that should be addressed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {lastYearData.arrears.map((arrear, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{arrear.vendor}</div>
                        <div className="text-sm text-gray-600">
                          {arrear.daysOverdue} days overdue
                        </div>
                      </div>
                      <div className="font-semibold text-orange-600">
                        ${arrear.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                  <Button className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Remove Arrears from Budget
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium">{rec.category}</div>
                        <Badge
                          variant={
                            rec.priority === "high"
                              ? "destructive"
                              : rec.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {rec.priority} priority
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">
                          ${rec.savings.toLocaleString()} savings
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{rec.recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export Options
              </CardTitle>
              <CardDescription>
                Save your budget in various formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF Report
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export to Excel
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  QuickBooks Import
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  JSON Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

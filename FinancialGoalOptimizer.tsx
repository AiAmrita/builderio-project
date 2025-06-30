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
  Target,
  TrendingUp,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Lightbulb,
  Download,
  Brain,
  Clock,
} from "lucide-react";

export default function FinancialGoalOptimizer() {
  const [targetIncome, setTargetIncome] = useState("");
  const [timeframe, setTimeframe] = useState("12");
  const [hasGenerated, setHasGenerated] = useState(false);

  // Mock current financial state
  const currentFinancials = {
    monthlyRevenue: 104167, // $1.25M annually
    monthlyExpenses: 79167, // $950K annually
    monthlyNetIncome: 25000, // $300K annually
    growthRate: 0.08, // 8% monthly growth
  };

  const generateGoalPlan = () => {
    setHasGenerated(true);
  };

  const targetMonthlyIncome = parseInt(targetIncome) / 12;
  const requiredIncrease =
    targetMonthlyIncome - currentFinancials.monthlyNetIncome;
  const feasibilityScore = Math.min(
    100,
    Math.max(
      0,
      100 - (requiredIncrease / currentFinancials.monthlyNetIncome) * 50,
    ),
  );

  const actionPlan = [
    {
      category: "Revenue Growth",
      priority: 1,
      actions: [
        {
          action: "Launch premium service tier",
          impact: "$15,000/month",
          timeline: "2-3 months",
          effort: "high",
        },
        {
          action: "Expand to 2 new market segments",
          impact: "$12,000/month",
          timeline: "4-6 months",
          effort: "high",
        },
        {
          action: "Optimize pricing strategy",
          impact: "$8,000/month",
          timeline: "1 month",
          effort: "medium",
        },
      ],
    },
    {
      category: "Cost Optimization",
      priority: 2,
      actions: [
        {
          action: "Renegotiate software contracts",
          impact: "$3,000/month",
          timeline: "1-2 months",
          effort: "low",
        },
        {
          action: "Automate manual processes",
          impact: "$8,000/month",
          timeline: "3-4 months",
          effort: "medium",
        },
        {
          action: "Optimize office space",
          impact: "$2,500/month",
          timeline: "2 months",
          effort: "medium",
        },
      ],
    },
    {
      category: "Operational Efficiency",
      priority: 3,
      actions: [
        {
          action: "Implement productivity tools",
          impact: "$5,000/month",
          timeline: "1-2 months",
          effort: "medium",
        },
        {
          action: "Streamline workflow processes",
          impact: "$4,000/month",
          timeline: "2-3 months",
          effort: "medium",
        },
      ],
    },
  ];

  const milestones = [
    {
      month: 1,
      targetIncome: currentFinancials.monthlyNetIncome + requiredIncrease * 0.1,
      actions: ["Optimize pricing", "Renegotiate contracts"],
      status: "upcoming",
    },
    {
      month: 3,
      targetIncome: currentFinancials.monthlyNetIncome + requiredIncrease * 0.3,
      actions: ["Launch premium tier", "Automate processes"],
      status: "upcoming",
    },
    {
      month: 6,
      targetIncome: currentFinancials.monthlyNetIncome + requiredIncrease * 0.6,
      actions: ["Market expansion", "Complete automation"],
      status: "upcoming",
    },
    {
      month: 12,
      targetIncome: targetMonthlyIncome,
      actions: ["Full goal achievement"],
      status: "target",
    },
  ];

  const getFeasibilityColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getFeasibilityLabel = (score: number) => {
    if (score >= 80) return "Highly Achievable";
    if (score >= 60) return "Moderately Achievable";
    return "Challenging";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            Financial Goal Optimizer
          </h2>
          <p className="text-gray-600">
            Set target income and get AI-generated strategies to achieve it
          </p>
        </div>
        <Button onClick={generateGoalPlan} disabled={!targetIncome}>
          <Brain className="h-4 w-4 mr-2" />
          Generate Plan
        </Button>
      </div>

      <Tabs defaultValue="setup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="setup">Goal Setup</TabsTrigger>
          <TabsTrigger value="analysis">Feasibility Analysis</TabsTrigger>
          <TabsTrigger value="strategy">Action Strategy</TabsTrigger>
          <TabsTrigger value="timeline">Implementation Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Financial Position</CardTitle>
                <CardDescription>
                  Your current monthly averages based on QuickBooks data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Monthly Revenue</span>
                    <span className="font-bold text-blue-600">
                      ${currentFinancials.monthlyRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="font-medium">Monthly Expenses</span>
                    <span className="font-bold text-red-600">
                      ${currentFinancials.monthlyExpenses.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Net Income</span>
                    <span className="font-bold text-green-600">
                      ${currentFinancials.monthlyNetIncome.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Growth Rate</span>
                    <span className="font-bold text-purple-600">
                      {(currentFinancials.growthRate * 100).toFixed(1)}%/month
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Set Your Goal</CardTitle>
                <CardDescription>
                  Define your target annual net income
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="target">Target Annual Net Income</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="target"
                      type="number"
                      placeholder="500000"
                      value={targetIncome}
                      onChange={(e) => setTargetIncome(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeframe">Achievement Timeframe</Label>
                  <select
                    id="timeframe"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md"
                  >
                    <option value="6">6 months</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months</option>
                  </select>
                </div>

                {targetIncome && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Monthly target:</div>
                    <div className="text-xl font-bold">
                      ${targetMonthlyIncome.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Required increase: ${requiredIncrease.toLocaleString()}
                      /month
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {hasGenerated && targetIncome && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Feasibility Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div
                        className={`text-3xl font-bold ${getFeasibilityColor(feasibilityScore)}`}
                      >
                        {feasibilityScore.toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-600">
                        Feasibility Score
                      </div>
                      <Badge
                        variant={
                          feasibilityScore >= 80
                            ? "default"
                            : feasibilityScore >= 60
                              ? "secondary"
                              : "destructive"
                        }
                        className="mt-2"
                      >
                        {getFeasibilityLabel(feasibilityScore)}
                      </Badge>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {(
                          (requiredIncrease /
                            currentFinancials.monthlyNetIncome) *
                          100
                        ).toFixed(0)}
                        %
                      </div>
                      <div className="text-sm text-gray-600">
                        Required Growth
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        {timeframe}
                      </div>
                      <div className="text-sm text-gray-600">Months</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      Success Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">
                          Strong current growth rate
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Healthy profit margins</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">
                          Multiple optimization opportunities
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Stable revenue base</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <AlertTriangle className="h-5 w-5" />
                      Risk Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">Market competition</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">
                          Economic downturn impact
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">Execution complexity</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">Resource requirements</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          {hasGenerated && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    AI-Generated Action Plan
                  </CardTitle>
                  <CardDescription>
                    Prioritized strategies to achieve your financial goal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {actionPlan.map((category, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="default">
                            Priority {category.priority}
                          </Badge>
                          <h3 className="font-semibold text-lg">
                            {category.category}
                          </h3>
                        </div>
                        <div className="space-y-3">
                          {category.actions.map((action, actionIndex) => (
                            <div
                              key={actionIndex}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-1">
                                <div className="font-medium">
                                  {action.action}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {action.timeline} • {action.effort} effort
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-green-600">
                                  {action.impact}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          {hasGenerated && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Implementation Timeline
                </CardTitle>
                <CardDescription>
                  Monthly milestones and progress tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${
                        milestone.status === "target"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-blue-600">
                              {milestone.month}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">
                              Month {milestone.month}
                            </div>
                            <div className="text-sm text-gray-600">
                              Target: ${milestone.targetIncome.toLocaleString()}
                              /month
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            milestone.status === "target"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {milestone.status === "target"
                            ? "Final Goal"
                            : "Milestone"}
                        </Badge>
                      </div>
                      <div className="pl-11">
                        <div className="text-sm text-gray-600">
                          Key Actions:
                        </div>
                        <ul className="text-sm list-disc list-inside text-gray-700 mt-1">
                          {milestone.actions.map((action, actionIndex) => (
                            <li key={actionIndex}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex gap-4">
                    <Button className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Export Implementation Plan
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Add to Calendar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

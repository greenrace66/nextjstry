import { useState } from 'react';
import { 
  Activity, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  Star, 
  Play, 
  CheckCircle,
  Calendar,
  Zap,
  BarChart3,
  Users,
  Database
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const usageData = [
  { month: 'Jan', credits: 120, jobs: 8 },
  { month: 'Feb', credits: 150, jobs: 12 },
  { month: 'Mar', credits: 180, jobs: 15 },
  { month: 'Apr', credits: 140, jobs: 10 },
  { month: 'May', credits: 200, jobs: 18 },
  { month: 'Jun', credits: 250, jobs: 22 }
];

const recentJobs = [
  { id: 'job_001', name: 'ESMFold Analysis', status: 'completed', time: '2 hours ago' },
  { id: 'job_002', name: 'MD Simulation', status: 'running', time: '1 hour ago' },
  { id: 'job_003', name: 'Protein Docking', status: 'completed', time: '4 hours ago' },
  { id: 'job_004', name: 'AlphaFold Run', status: 'pending', time: '30 minutes ago' }
];

const chartConfig = {
  credits: {
    label: "Credits Used",
    color: "hsl(var(--primary))",
  },
  jobs: {
    label: "Jobs Run",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig;

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('6months');

  const currentCredits = 850;
  const creditLimit = 1000;
  const creditUsage = (currentCredits / creditLimit) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Welcome back! Here's an overview of your computational biology research.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentCredits}</div>
              <div className="mt-2">
                <Progress value={creditUsage} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {currentCredits} / {creditLimit} credits used
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Jobs This Month</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">22</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+18%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.5%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12m</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-3m</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Usage Analytics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Usage Analytics
              </CardTitle>
              <CardDescription>
                Your credit usage and job execution over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="credits" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="credits">Credits</TabsTrigger>
                  <TabsTrigger value="jobs">Jobs</TabsTrigger>
                </TabsList>
                <TabsContent value="credits" className="space-y-4">
                  <ChartContainer config={chartConfig}>
                    <LineChart data={usageData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="credits" 
                        stroke="var(--color-credits)" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ChartContainer>
                </TabsContent>
                <TabsContent value="jobs" className="space-y-4">
                  <ChartContainer config={chartConfig}>
                    <BarChart data={usageData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="jobs" fill="var(--color-jobs)" />
                    </BarChart>
                  </ChartContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Jobs
              </CardTitle>
              <CardDescription>
                Your latest computational analysis runs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobs.map(job => (
                  <div key={job.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-1 rounded ${
                        job.status === 'completed' ? 'bg-green-100 text-green-600' :
                        job.status === 'running' ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {job.status === 'completed' ? <CheckCircle className="h-3 w-3" /> :
                         job.status === 'running' ? <Play className="h-3 w-3" /> :
                         <Clock className="h-3 w-3" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{job.name}</p>
                        <p className="text-xs text-muted-foreground">{job.time}</p>
                      </div>
                    </div>
                    <Badge variant={job.status === 'completed' ? 'default' : 'secondary'}>
                      {job.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Jobs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Run ESMFold</h3>
                  <p className="text-sm text-muted-foreground">Quick protein folding</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Database className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">Browse Models</h3>
                  <p className="text-sm text-muted-foreground">Explore available tools</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Community</h3>
                  <p className="text-sm text-muted-foreground">Share & collaborate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Star className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold">Favorites</h3>
                  <p className="text-sm text-muted-foreground">Your saved models</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Status
            </CardTitle>
            <CardDescription>
              Current performance and availability of computational resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">1.2s</div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">847</div>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
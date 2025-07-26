import { useState } from 'react';
import { Search, Filter, Calendar, Clock, CheckCircle, XCircle, Play, Download, Eye, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Job {
  id: string;
  name: string;
  model: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  startTime: string;
  endTime?: string;
  duration: string;
  credits: number;
  inputData: string;
  progress?: number;
}

const mockJobs: Job[] = [
  {
    id: 'job_001',
    name: 'Protein Structure Analysis',
    model: 'ESMFold',
    status: 'completed',
    startTime: '2024-01-20T10:30:00Z',
    endTime: '2024-01-20T10:45:00Z',
    duration: '15m 23s',
    credits: 10,
    inputData: 'MKTVRQERLKSIVRILERSKEPVSGAQLAEELSVSRQVIVQDIAYLRSLGYNIVATPRGYVLAGG'
  },
  {
    id: 'job_002',
    name: 'MD Simulation Run',
    model: 'MD Simulation',
    status: 'running',
    startTime: '2024-01-20T14:15:00Z',
    duration: '45m 12s',
    credits: 25,
    inputData: 'Complex_protein_structure.pdb',
    progress: 65
  },
  {
    id: 'job_003',
    name: 'AlphaFold Analysis',
    model: 'AlphaFold2',
    status: 'failed',
    startTime: '2024-01-19T16:20:00Z',
    endTime: '2024-01-19T16:25:00Z',
    duration: '5m 12s',
    credits: 15,
    inputData: 'INVALID_SEQUENCE'
  },
  {
    id: 'job_004',
    name: 'Visualization Pipeline',
    model: 'ChimeraX Analysis',
    status: 'pending',
    startTime: '2024-01-20T15:30:00Z',
    duration: '-',
    credits: 5,
    inputData: 'structure_data.mol2'
  }
];

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modelFilter, setModelFilter] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const statusColors = {
    running: 'bg-blue-500',
    completed: 'bg-green-500',
    failed: 'bg-red-500',
    pending: 'bg-yellow-500'
  };

  const statusIcons = {
    running: <Play className="h-3 w-3" />,
    completed: <CheckCircle className="h-3 w-3" />,
    failed: <XCircle className="h-3 w-3" />,
    pending: <Clock className="h-3 w-3" />
  };

  const models = ['all', ...new Set(mockJobs.map(job => job.model))];

  const filteredJobs = mockJobs
    .filter(job => 
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(job => statusFilter === 'all' || job.status === statusFilter)
    .filter(job => modelFilter === 'all' || job.model === modelFilter);

  const toggleJobSelection = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const toggleAllJobs = () => {
    setSelectedJobs(prev => 
      prev.length === filteredJobs.length ? [] : filteredJobs.map(job => job.id)
    );
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full bg-muted rounded-full h-2">
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Job Management
          </h1>
          <p className="text-xl text-muted-foreground">
            Track and manage your computational biology analysis jobs.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(statusColors).map(([status, colorClass]) => {
            const count = filteredJobs.filter(job => job.status === status).length;
            return (
              <Card key={status}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground capitalize">
                        {status}
                      </p>
                      <p className="text-2xl font-bold">{count}</p>
                    </div>
                    <div className={`p-2 rounded-full ${colorClass}`}>
                      {statusIcons[status as keyof typeof statusIcons]}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs by name, model, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={modelFilter} onValueChange={setModelFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                {models.map(model => (
                  <SelectItem key={model} value={model}>
                    {model === 'all' ? 'All Models' : model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bulk Actions */}
          {selectedJobs.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">
                {selectedJobs.length} job{selectedJobs.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Results
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Jobs
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Job History</CardTitle>
            <CardDescription>
              View and manage all your computational analysis jobs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                      onCheckedChange={toggleAllJobs}
                    />
                  </TableHead>
                  <TableHead>Job Name</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Started</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map(job => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedJobs.includes(job.id)}
                        onCheckedChange={() => toggleJobSelection(job.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{job.name}</p>
                        <p className="text-sm text-muted-foreground">{job.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{job.model}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="secondary" 
                          className={`${statusColors[job.status]} text-white`}
                        >
                          {statusIcons[job.status]}
                          <span className="ml-1 capitalize">{job.status}</span>
                        </Badge>
                        {job.status === 'running' && job.progress && (
                          <div className="w-20">
                            <ProgressBar progress={job.progress} />
                            <p className="text-xs text-muted-foreground mt-1">{job.progress}%</p>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{formatDateTime(job.startTime)}</p>
                      </div>
                    </TableCell>
                    <TableCell>{job.duration}</TableCell>
                    <TableCell>{job.credits}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        {job.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-4">
              You haven't run any analysis jobs yet, or none match your current filters.
            </p>
            <Button>Run Your First Model</Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
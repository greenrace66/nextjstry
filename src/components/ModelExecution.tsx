import { useState } from 'react';
import { Play, Download, Share2, Save, Clock, Zap, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import MolstarViewer from './MolstarViewer';

interface ModelExecutionProps {
  modelId: string;
  modelName: string;
  creditsRequired: number;
  onExecute?: (jobId: string) => void;
}

const ModelExecution = ({ 
  modelId, 
  modelName = "ESMFold", 
  creditsRequired = 10,
  onExecute 
}: ModelExecutionProps) => {
  const { toast } = useToast();
  const [sequence, setSequence] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const sampleSequences = {
    short: 'MKTVRQERLKSIVRILERSKEPVSGAQLAEELSVSRQVIVQDIAYLRSLGYNIVATPRGYVLAGG',
    medium: 'MKTVRQERLKSIVRILERSKEPVSGAQLAEELSVSRQVIVQDIAYLRSLGYNIVATPRGYVLAGGDMFRTPLLEVLDGVSLPQPVGVCACAGRSGKYLAKEGDYFAFGKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFA',
    complex: 'MKTVRQERLKSIVRILERSKEPVSGAQLAEELSVSRQVIVQDIAYLRSLGYNIVATPRGYVLAGGDMFRTPLLEVLDGVSLPQPVGVCACAGRSGKYLAKEGDYFAFGKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFAGEKGFAGTPTAEKGRVYALTAPEGLVFEPTTDNTLYKVTNASGVGVKDYEGFVIGGGATAYFA'
  };

  const validateSequence = (seq: string): boolean => {
    const validAminoAcids = /^[ACDEFGHIKLMNPQRSTVWY]*$/i;
    return validAminoAcids.test(seq.replace(/\s/g, ''));
  };

  const handleRun = async () => {
    const cleanSequence = sequence.replace(/\s/g, '').toUpperCase();
    
    if (!cleanSequence) {
      toast({
        title: "Input Required",
        description: "Please enter a protein sequence to analyze.",
        variant: "destructive"
      });
      return;
    }

    if (!validateSequence(cleanSequence)) {
      toast({
        title: "Invalid Sequence",
        description: "Please enter a valid protein sequence using standard amino acid codes.",
        variant: "destructive"
      });
      return;
    }

    if (cleanSequence.length < 10) {
      toast({
        title: "Sequence Too Short",
        description: "Please enter a sequence with at least 10 amino acids.",
        variant: "destructive"
      });
      return;
    }

    setIsRunning(true);
    setProgress(0);
    const newJobId = `job_${Date.now()}`;
    setJobId(newJobId);

    // Simulate model execution with progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Mock result
      const mockResult = {
        pdbId: '1AOI',
        confidence: 0.89,
        executionTime: '4m 32s',
        energyScore: -234.5,
        downloadUrl: '/api/download/structure.pdb'
      };
      
      setResult(mockResult);
      onExecute?.(newJobId);
      
      toast({
        title: "Analysis Complete!",
        description: `${modelName} analysis finished successfully.`,
      });
    } catch (error) {
      toast({
        title: "Execution Failed",
        description: "There was an error running the analysis. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
      clearInterval(progressInterval);
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your structure file is being prepared for download.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Results Saved",
      description: "Analysis results saved to your dashboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                {modelName} Execution
              </CardTitle>
              <CardDescription>
                Enter a protein sequence to predict its 3D structure
              </CardDescription>
            </div>
            <Badge variant="secondary">{creditsRequired} credits</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sequence">Protein Sequence</Label>
            <Textarea
              id="sequence"
              placeholder="Enter protein sequence (single letter amino acid codes)..."
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              rows={4}
              className="font-mono text-sm"
              disabled={isRunning}
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Length: {sequence.replace(/\s/g, '').length} amino acids</span>
              <span>Valid: {validateSequence(sequence) ? '✅' : '❌'}</span>
            </div>
          </div>

          {/* Sample Sequences */}
          <div className="space-y-2">
            <Label>Sample Sequences</Label>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(sampleSequences).map(([key, seq]) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() => setSequence(seq)}
                  disabled={isRunning}
                >
                  {key} ({seq.length} aa)
                </Button>
              ))}
            </div>
          </div>

          {/* Execution Controls */}
          <div className="flex items-center gap-4 pt-4">
            <Button 
              onClick={handleRun} 
              disabled={!sequence.trim() || isRunning}
              className="flex-1"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Running Analysis...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run {modelName}
                </>
              )}
            </Button>
            {result && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Progress Section */}
      {isRunning && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analysis Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Estimated time remaining: {Math.max(0, Math.round((100 - progress) / 20))} minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              Structure prediction completed with job ID: {jobId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="visualization" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="visualization">3D Structure</TabsTrigger>
                <TabsTrigger value="metrics">Quality Metrics</TabsTrigger>
                <TabsTrigger value="download">Download Options</TabsTrigger>
              </TabsList>
              
              <TabsContent value="visualization" className="space-y-4">
                <MolstarViewer 
                  pdbId={result.pdbId}
                  className="w-full h-[500px]"
                  autoRotate={false}
                />
              </TabsContent>
              
              <TabsContent value="metrics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{result.confidence}</div>
                        <p className="text-sm text-muted-foreground">Confidence Score</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{result.energyScore}</div>
                        <p className="text-sm text-muted-foreground">Energy Score (kcal/mol)</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{result.executionTime}</div>
                        <p className="text-sm text-muted-foreground">Execution Time</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    High confidence prediction (&gt;0.8) indicates reliable structural features. 
                    Energy score represents the stability of the predicted structure.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              
              <TabsContent value="download" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <div className="text-left">
                      <div className="font-medium">PDB Structure File</div>
                      <div className="text-sm text-muted-foreground">3D coordinates in PDB format</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <div className="text-left">
                      <div className="font-medium">Analysis Report</div>
                      <div className="text-sm text-muted-foreground">Detailed PDF report with metrics</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <div className="text-left">
                      <div className="font-medium">Confidence Data</div>
                      <div className="text-sm text-muted-foreground">Per-residue confidence scores</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-4">
                    <div className="text-left">
                      <div className="font-medium">Visualization State</div>
                      <div className="text-sm text-muted-foreground">Molstar session file</div>
                    </div>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModelExecution;
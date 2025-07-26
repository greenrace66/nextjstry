import { useState } from 'react';
import { Search, Filter, Grid, List, Star, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ModelData {
  id: string;
  name: string;
  description: string;
  category: string;
  popularity: number;
  lastUpdated: string;
  credits: number;
  tags: string[];
  featured: boolean;
}

const mockModels: ModelData[] = [
  {
    id: 'esmfold',
    name: 'ESMFold',
    description: 'State-of-the-art protein structure prediction using evolutionary scale modeling',
    category: 'Protein Folding',
    popularity: 95,
    lastUpdated: '2024-01-15',
    credits: 10,
    tags: ['AI/ML', 'Structure', 'Prediction'],
    featured: true
  },
  {
    id: 'alphafold2',
    name: 'AlphaFold2',
    description: 'DeepMind\'s revolutionary protein structure prediction system',
    category: 'Protein Folding',
    popularity: 98,
    lastUpdated: '2024-01-10',
    credits: 15,
    tags: ['AI/ML', 'DeepMind', 'Structure'],
    featured: true
  },
  {
    id: 'chimeraX',
    name: 'ChimeraX Analysis',
    description: 'Advanced molecular visualization and analysis pipeline',
    category: 'Visualization',
    popularity: 85,
    lastUpdated: '2024-01-12',
    credits: 5,
    tags: ['Visualization', 'Analysis'],
    featured: false
  },
  {
    id: 'molecular-dynamics',
    name: 'MD Simulation',
    description: 'Molecular dynamics simulation for protein behavior analysis',
    category: 'Simulation',
    popularity: 78,
    lastUpdated: '2024-01-08',
    credits: 25,
    tags: ['Simulation', 'Dynamics'],
    featured: false
  }
];

const Models = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['all', ...new Set(mockModels.map(model => model.category))];

  const filteredModels = mockModels
    .filter(model => 
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(model => selectedCategory === 'all' || model.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'recent':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });

  const featuredModels = filteredModels.filter(model => model.featured);

  const ModelCard = ({ model }: { model: ModelData }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {model.name}
            </CardTitle>
            {model.featured && <Star className="h-4 w-4 text-warning fill-current" />}
          </div>
          <Badge variant="secondary">{model.credits} credits</Badge>
        </div>
        <CardDescription className="line-clamp-2">{model.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {model.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{model.popularity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{new Date(model.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
          <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
            Run Model
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Computational Models
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Discover and run state-of-the-art computational biology models for protein analysis, 
            structure prediction, and molecular simulations.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search models, techniques, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex rounded-lg border p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-md"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-md"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="all">All Models ({filteredModels.length})</TabsTrigger>
            <TabsTrigger value="featured">Featured ({featuredModels.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
            }>
              {filteredModels.map(model => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="featured">
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
            }>
              {featuredModels.map(model => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold mb-2">No models found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Models;
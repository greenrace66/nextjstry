import { motion } from "framer-motion";
import { 
  Eye, 
  Zap, 
  Brain, 
  RotateCcw, 
  Target, 
  Dna,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Features = () => {
  const features = [
    {
      icon: Eye,
      title: "Interactive 3D Visualization",
      description: "Explore protein structures with cutting-edge 3D visualization powered by Molstar. Rotate, zoom, and analyze molecular details with intuitive controls.",
      capabilities: ["Real-time rendering", "Multiple representation styles", "High-quality exports"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Target,
      title: "Molecular Docking",
      description: "Perform protein-ligand interaction analysis with advanced docking algorithms. Predict binding sites and evaluate molecular interactions.",
      capabilities: ["AutoDock integration", "Binding affinity prediction", "Interaction visualization"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: Brain,
      title: "Deep Learning Models",
      description: "Leverage state-of-the-art AI models for structure prediction, including ESMFold, ChimeraX, and custom-trained networks.",
      capabilities: ["ESMFold integration", "AlphaFold predictions", "Custom model support"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: RotateCcw,
      title: "Molecular Dynamics",
      description: "Run comprehensive MD simulations to understand protein behavior over time. Analyze conformational changes and stability.",
      capabilities: ["GROMACS integration", "Trajectory analysis", "Energy calculations"],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Dna,
      title: "Protein Binder Design",
      description: "Design custom protein binders and analyze binding sites with advanced computational tools for drug discovery applications.",
      capabilities: ["Binding site detection", "Affinity optimization", "ADMET predictions"],
      color: "from-red-500 to-red-600"
    },
    {
      icon: Zap,
      title: "Structure Prediction",
      description: "Predict protein structures from sequence using advanced folding algorithms. Compare results with experimental structures.",
      capabilities: ["Ab initio folding", "Homology modeling", "Quality assessment"],
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Powerful Features for
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Computational Biology
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover our comprehensive suite of tools designed to accelerate your 
              research with cutting-edge computational biology capabilities.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/models">
                Explore Models
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-gradient-card border-border/50 hover:shadow-floating transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <div className="space-y-2">
                        {feature.capabilities.map((capability, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{capability}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-6 group-hover:border-primary/40"
                        asChild
                      >
                        <Link to="/models">
                          Try Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Research?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of researchers using our platform to accelerate 
              scientific discoveries in computational biology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="glass" size="lg" asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Features;
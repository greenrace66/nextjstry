import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Users, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import MolstarViewer from "@/components/MolstarViewer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process complex molecular structures in seconds with our optimized algorithms"
    },
    {
      icon: Target,
      title: "Precision Analysis",
      description: "Advanced AI models provide accurate structure predictions and binding analysis"
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "Share your research and collaborate with scientists worldwide"
    }
  ];

  const stats = [
    { value: "50K+", label: "Structures Analyzed" },
    { value: "1K+", label: "Active Researchers" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="text-primary font-medium">Structural Biology made simple</span>
                  </motion.div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                    Computational
                    <span className="block bg-gradient-primary bg-clip-text text-transparent">
                      Biology
                    </span>
                    <span className="block">Platform</span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                    Advanced tools for protein structure analysis, molecular docking, 
                    and AI-powered predictions. Accelerate your research with 
                    cutting-edge computational biology.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/models">
                      Start Analyzing
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="xl" asChild>
                    <Link to="/features">
                      <Play className="mr-2 h-5 w-5" />
                      Watch Demo
                    </Link>
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column - 3D Viewer */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-primary rounded-2xl blur-2xl opacity-20 animate-pulse-glow" />
                  <MolstarViewer 
                    pdbId="1AOI" 
                    className="w-full h-[500px] relative z-10" 
                    autoRotate={true}
                  />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center mt-4"
                >
                  <p className="text-sm text-muted-foreground">
                    Live 3D visualization of protein structure 1AOI
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-20 bg-gradient-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Why Choose MolStar Hub?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Built for researchers, by researchers. Our platform combines 
                simplicity with powerful computational capabilities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full bg-background border-border/50 hover:shadow-floating transition-all duration-300 group">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                See It in Action
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the power of our computational biology tools with 
                real protein structures and advanced analysis capabilities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <Card className="overflow-hidden bg-gradient-card border-border/50 shadow-floating">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold">
                        Interactive Protein Visualization
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Explore protein structures with our advanced 3D viewer. 
                        Analyze binding sites, conformational changes, and molecular 
                        interactions with professional-grade tools.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm">Real-time 3D rendering</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-secondary rounded-full" />
                          <span className="text-sm">Multiple representation styles</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-accent rounded-full" />
                          <span className="text-sm">Export high-quality images</span>
                        </div>
                      </div>
                      <Button variant="hero" asChild>
                        <Link to="/models">Try Now</Link>
                      </Button>
                    </div>
                    
                    <MolstarViewer 
                      pdbId="1AOI" 
                      className="w-full h-[300px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-hero rounded-3xl p-8 md:p-16 text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Accelerate Your Research?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Join thousands of researchers using MolStar Hub to advance 
                computational biology. Start with our free tier today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="glass" size="xl" asChild>
                  <Link to="/auth">Get Started Free</Link>
                </Button>
                <Button variant="outline" size="xl" className="border-white/20 text-white hover:bg-white/10" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

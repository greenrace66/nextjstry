import { motion } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for students and researchers getting started",
      icon: Star,
      features: [
        "10 credits per day",
        "Access to all models",
        "Basic visualizations",
        "Community support",
        "PDB downloads",
        "Job history (7 days)"
      ],
      limitations: [
        "Limited daily usage",
        "Basic support only"
      ],
      cta: "Start Free",
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Premium",
      price: "$10",
      period: "per month",
      description: "Ideal for active researchers and small labs",
      icon: Zap,
      features: [
        "1,000 credits per day",
        "Access to all models",
        "Advanced visualizations",
        "Pipeline creation",
        "Priority support",
        "Unlimited job history",
        "API access",
        "Custom exports",
        "Batch processing"
      ],
      limitations: [],
      cta: "Start Premium",
      popular: true,
      variant: "hero" as const
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations and research institutions",
      icon: Crown,
      features: [
        "Unlimited credits",
        "All premium features",
        "Custom model training",
        "Dedicated support",
        "On-premise deployment",
        "SSO integration",
        "Custom integrations",
        "SLA guarantees",
        "Training & onboarding"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      variant: "secondary" as const
    }
  ];

  const faqs = [
    {
      question: "What are credits and how do they work?",
      answer: "Credits are used to run computational models. Each model has a different credit cost based on computational complexity. Simple visualizations use 1 credit, while complex AI predictions may use 10-50 credits."
    },
    {
      question: "Can I upgrade or downgrade my plan anytime?",
      answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle."
    },
    {
      question: "Do unused credits roll over?",
      answer: "Premium plan credits reset daily and don't roll over. This ensures consistent performance and resource allocation across our platform."
    },
    {
      question: "Is there a student discount?",
      answer: "Yes! We offer 50% off Premium plans for verified students and academic researchers. Contact us with your institutional email for verification."
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
              Simple, Transparent
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your research needs. All plans include 
              access to our powerful computational biology tools.
            </p>
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-primary text-primary-foreground px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <Card className={`h-full ${plan.popular ? 'border-primary/50 shadow-glow' : 'border-border/50'} bg-gradient-card hover:shadow-floating transition-all duration-300`}>
                    <CardHeader className="text-center pb-4">
                      <div className={`w-12 h-12 mx-auto rounded-lg ${plan.popular ? 'bg-gradient-primary' : 'bg-gradient-secondary'} flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                      <div className="flex items-baseline justify-center space-x-1">
                        <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground">/{plan.period}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{plan.description}</p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                        
                        {plan.limitations.map((limitation, idx) => (
                          <div key={idx} className="flex items-center space-x-3 opacity-60">
                            <div className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant={plan.variant} 
                        className="w-full" 
                        size="lg"
                        asChild
                      >
                        <Link to={plan.name === "Enterprise" ? "/contact" : "/signup"}>
                          {plan.cta}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our pricing and plans
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="bg-gradient-card border-border/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of researchers using MolStar Hub to accelerate 
              their computational biology research.
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

export default Pricing;
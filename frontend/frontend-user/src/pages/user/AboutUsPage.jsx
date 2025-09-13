import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Smartphone, Truck, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About Gadjetify</h1>
        <p className="text-lg mb-6">
          Your trusted online store for the latest smartphones and gadgets.
        </p>
        <Link to="/products">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Shop Now
          </Button>
        </Link>
      </section>

      {/* Mission and Vision */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 px-6 py-12">
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p>
              To make premium gadgets accessible and affordable for everyone,
              bringing technology closer to your lifestyle.
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p>
              To be the go-to online store for tech enthusiasts, delivering the
              best products with unbeatable service.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Smartphone,
              title: "Latest Gadgets",
              desc: "Curated collection of trending smartphones and accessories.",
            },
            {
              icon: Truck,
              title: "Fast Delivery",
              desc: "Quick and reliable shipping right to your doorstep.",
            },
            {
              icon: CreditCard,
              title: "Secure Payments",
              desc: "Safe checkout process with multiple payment options.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white border rounded-2xl shadow-sm p-6 flex flex-col items-center text-center"
            >
              <item.icon className="text-indigo-600 w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        {/* <img
          src="/images/about-story.jpg"
          alt="Our Story"
          className="rounded-2xl shadow-md"
        /> */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg">
            Gadjetify was born out of a passion for technology and a mission to
            make gadget shopping seamless. From humble beginnings to becoming a
            trusted mobile store, we have always focused on quality, value, and
            excellent service.
          </p>
        </div>
      </section>

      {/* Team Section (Optional) */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
        <div className="flex justify-center gap-6 flex-wrap">
          {[
            { name: "Yahiya Muhammed", role: "Founder" },
            { name: "Jane Doe", role: "Operations" },
            { name: "John Smith", role: "Tech Lead" },
          ].map((member, index) => (
            <Card key={index} className="rounded-2xl shadow-md w-40">
              <CardContent className="p-4 flex flex-col items-center">
                <Avatar className="mb-3">
                  <AvatarImage src={`/images/team-${index + 1}.jpg`} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Explore the Latest Gadgets?
        </h2>
        <Link
          to="/products"
          className="inline-block text-center px-4 py-2 text-indigo-600 bg-white rounded hover:bg-gray-100"
        >
          Browse Products
        </Link>
      </section>
    </div>
  );
};

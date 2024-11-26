import { AboutPage } from "@/appPages/AboutPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "At Zeeinvoices, we are committed to provide AI powered invoice generator. We specialize in providing solutions and are passionate about delivering. Our team of dedicated professionals is here to provide industry standard solutions. Learn more about our journey, values, and what drives us forward",
};

const About = () => {
  return <AboutPage />;
};

export default About;

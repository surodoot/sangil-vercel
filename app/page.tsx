import { StoryIntro } from "@/components/sections/StoryIntro";
import { About } from "@/components/sections/About";
import { BusinessStory } from "@/components/sections/BusinessStory";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Equipment } from "@/components/sections/Equipment";
import { Quality } from "@/components/sections/Quality";
import { Gallery } from "@/components/sections/Gallery";
import { CompanyInfo } from "@/components/sections/CompanyInfo";
import { AIEstimate } from "@/components/sections/AIEstimate";
import { ContactForm } from "@/components/sections/ContactForm";
import { LocationMap } from "@/components/sections/LocationMap";

export default function Home() {
  return (
    <>
      <StoryIntro />
      <About />
      <BusinessStory />
      <ProcessTimeline />
      <Equipment />
      <Quality />
      <Gallery />
      <CompanyInfo />
      <AIEstimate />
      <ContactForm />
      <LocationMap />
    </>
  );
}

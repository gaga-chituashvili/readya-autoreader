import type { TeamMember } from "@/types/ourTeam.type";
import founder from "@/assets/founder.png";
import salomeImage from "@/assets/salomephoto.png";
import gch from "@/assets/gch.png";
import pixoraImage from "@/assets/pixora.png";

export const teamMembers: TeamMember[] = [
  {
    name: "rusudan",
    role: "Founder & CEO",
    image: founder,
  },
  {
    name: "salome",
    role: "Social Media & Marketing Manager",
    image: salomeImage,
  },
  {
    name: "gaga",
    role: "Full-Stack Developer & AI Engineer",
    image: gch,
  },
  {
    name: "pixora",
    role: "Creative Agency",
    image: pixoraImage,
  },
];

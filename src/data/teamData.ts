import type { TeamMember } from "../types/ourTeam";
import rusudanImage from "@/assets/rusudanphoto.png";
import salomeImage from "@/assets/salomephoto.png";
import gagaImage from "@/assets/gagaphoto.png";
import pixoraImage from "@/assets/pixora.png";


export const teamMembers: TeamMember[] = [
  {
    name: "rusudan",
    role: "Founder & CEO",
    image: rusudanImage,
  },
  {
    name: "salome",
    role: "Social Media & Marketing Manager",
    image: salomeImage,
  },
  {
    name: "gaga",
    role: "Full-Stack Developer & AI Engineer",
    image: gagaImage,
  },
  {
    name: "pixora",
    role: "Creative Agency",
    image: pixoraImage,
  },
];

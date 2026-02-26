/**
 * Content loader — all site content comes from here.
 */

import profileData from "@/content/profile.json";
import skillsData from "@/content/skills.json";
import projectsData from "@/content/projects.json";

export interface Link {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  occupation: string;
  bio: string;
  links: Link[];
}

export interface Skill {
  name: string;
  category: string;
  icon: string | null;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  links: Link[];
  screenshot: string | null;
  tags: string[];
}

export const profile: Profile = profileData;
export const skills: Skill[] = skillsData;
export const projects: Project[] = projectsData;

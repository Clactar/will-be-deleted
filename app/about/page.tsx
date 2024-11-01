import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Your Name",
  description:
    "Software engineer crafting digital experiences with modern web technologies",
};

export default function AboutPage() {
  return (
    <main className='container mx-auto px-4 py-16 max-w-3xl'>
      {/* Profile Section */}
      <div className='space-y-8'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='relative w-32 h-32 rounded-full overflow-hidden'>
            <Image
              src='/avatar-placeholder.jpg'
              alt='Profile picture'
              fill
              className='object-cover'
              priority
            />
          </div>
          <h1 className='text-3xl font-bold tracking-tight'>Your Name</h1>
          <p className='text-muted-foreground text-center max-w-lg'>
            Building thoughtful digital experiences that make a difference
          </p>
        </div>

        {/* Expertise Section */}
        <Card className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>Tech Stack</h2>
          <div className='flex flex-wrap gap-2'>
            {[
              "Next.js",
              "React",
              "TypeScript",
              "TailwindCSS",
              "Node.js",
              "PostgreSQL",
            ].map((skill) => (
              <Badge key={skill} variant='secondary'>
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* About Text */}
        <div className='space-y-4 text-muted-foreground'>
          <p>
            Hey there! I'm a software engineer who loves crafting web
            applications that are both beautiful and functional. My focus is on
            creating intuitive user experiences while maintaining clean,
            efficient code under the hood.
          </p>
          <p>
            Currently, I'm working on projects that push the boundaries of
            modern web technologies. When I'm not coding, you'll find me
            exploring new tech, sharing knowledge through my blog, or
            contributing to open-source projects that catch my interest.
          </p>
        </div>

        {/* Contact Section */}
        <Card className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>Let's Connect</h2>
          <div className='space-y-2'>
            <p className='text-muted-foreground'>
              Have an interesting project in mind? I'm always open to new
              opportunities and collaborations.
            </p>
            <p className='text-muted-foreground'>→ your.email@example.com</p>
          </div>
        </Card>
      </div>
    </main>
  );
}

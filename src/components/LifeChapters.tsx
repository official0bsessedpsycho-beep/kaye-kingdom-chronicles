import React from 'react';
import { BookOpen, Heart, Plane, Users } from 'lucide-react';

const chapters = [
  {
    icon: BookOpen,
    title: 'School & Goals',
    tagalog: 'Pag-aaral ko',
    description: 'What I\'m learning and working towards',
    color: 'bg-blue-50 hover:bg-blue-100',
    borderColor: 'border-blue-200 hover:border-blue-300',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100',
  },
  {
    icon: Heart,
    title: 'Us ❤️',
    tagalog: 'Tayo',
    description: 'Love stories and sweet moments',
    color: 'bg-rose-50 hover:bg-rose-100',
    borderColor: 'border-rose-200 hover:border-rose-300',
    iconColor: 'text-rose-500',
    iconBg: 'bg-rose-100',
  },
  {
    icon: Plane,
    title: 'Trips & Memories',
    tagalog: 'Mga lakad namin',
    description: 'Places I\'ve been and want to go',
    color: 'bg-emerald-50 hover:bg-emerald-100',
    borderColor: 'border-emerald-200 hover:border-emerald-300',
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-100',
  },
  {
    icon: Users,
    title: 'My People',
    tagalog: 'Pamilya at kaibigan',
    description: 'The ones who make life special',
    color: 'bg-amber-50 hover:bg-amber-100',
    borderColor: 'border-amber-200 hover:border-amber-300',
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-100',
  },
];

const LifeChapters: React.FC = () => {
  return (
    <section id="chapters" className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-magical text-3xl md:text-4xl text-foreground mb-3">
            My life, lately
          </h2>
          <p className="font-elegant text-lg text-muted-foreground">
            Stuff I've been up to and things I care about
          </p>
        </div>

        {/* Chapter Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.title}
              className={`
                group relative p-6 rounded-2xl
                ${chapter.color}
                border-2 ${chapter.borderColor}
                transform transition-all duration-300
                hover:scale-[1.02] hover:shadow-lift
                cursor-pointer
                animate-fade-in
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-xl ${chapter.iconBg} ${chapter.iconColor} transition-transform group-hover:scale-110`}>
                  <chapter.icon className="w-6 h-6" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-magical text-xl text-center text-foreground mb-1">
                {chapter.title}
              </h3>
              <p className="font-elegant text-sm text-center text-muted-foreground italic mb-3">
                {chapter.tagalog}
              </p>
              <p className="font-clean text-sm text-center text-muted-foreground">
                {chapter.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeChapters;
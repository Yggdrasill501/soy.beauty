import { allServices } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/app/components/mdx";
import "./mdx.css";
import { Navigation } from "@/app/components/nav";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = allServices.find((service: any) => service.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-zinc-900 min-h-screen">
      <Navigation />
      
      {/* Hero Section with Full-width Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        {service.image && (
          <>
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-zinc-900/70 to-zinc-900"></div>
          </>
        )}
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-display mb-4">
            {service.title}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl">
            {service.description}
          </p>
        </div>
      </div>
      
      {/* Back Button */}
      <div className="relative z-10 container mx-auto px-4 -mt-8">
        <Link
          href="/sluzby"
          className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-800/80 text-zinc-300 hover:text-white hover:bg-zinc-700/80 transition-colors backdrop-blur-sm shadow-md shadow-zinc-900/30"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Späť na služby
        </Link>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 bg-zinc-800/50 rounded-xl p-8 backdrop-blur-sm shadow-lg shadow-zinc-900/50">
            <div className="prose prose-invert max-w-none">
              <Mdx code={service.body.code} />
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Info Card */}
            <div className="bg-zinc-800/50 rounded-xl p-6 backdrop-blur-sm shadow-lg shadow-zinc-900/50">
              <h3 className="text-xl font-display text-zinc-100 mb-4">Rýchle informácie</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-pink-500/20 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Trvanie</p>
                    <p className="text-zinc-200">30-90 minút</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-pink-500/20 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Cena od</p>
                    <p className="text-zinc-200">25€</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-pink-500/20 p-2 rounded-lg mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Rezervácia</p>
                    <p className="text-zinc-200">Potrebná</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Card */}
            <div className="bg-zinc-800/50 rounded-xl p-6 backdrop-blur-sm shadow-lg shadow-zinc-900/50">
              <h3 className="text-xl font-display text-zinc-100 mb-4">Rezervujte si termín</h3>
              <p className="text-zinc-400 mb-4">Pre rezerváciu termínu nás kontaktujte:</p>
              <div className="space-y-3">
                <a href="tel:+421900000000" className="flex items-center text-zinc-300 hover:text-pink-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +421 900 000 000
                </a>
                <a href="mailto:soybeautysk@gmail.com" className="flex items-center text-zinc-300 hover:text-pink-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  soybeautysk@gmail.com
                </a>
              </div>
              <button className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors">
                Rezervovať online
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return allServices.map((service: any) => ({
    slug: service.slug,
  }));
}

import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";
import { SEOHead } from "@/components/SEOHead";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id,
    }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = blogPosts.find((p) => p.id === id);

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <SEOHead
                title={`${post.title} | Fresh Plus Cleaning Blog`}
                description={post.excerpt}
                canonical={`https://www.freshpluscleaning.com.au/blog/${post.id}`}
                type="article"
            />

            <Navbar />

            <main className="overflow-hidden">
                {/* Hero Section */}
                <section className="relative pt-64 pb-24 px-6 text-center overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/Home_Hero.webp"
                            alt="Background"
                            fill
                            priority
                            className="object-cover brightness-[0.4]"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
                    </div>

                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-100 mb-8 font-medium">
                            <span className="bg-brand-green/20 text-brand-green px-4 py-1.5 rounded-full backdrop-blur-md border border-brand-green/30">{post.category}</span>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8 leading-[1.1]">
                            {post.title}
                        </h1>

                        <p className="text-xl text-gray-100 leading-relaxed font-medium">
                            {post.excerpt}
                        </p>
                    </div>
                </section>

                <article className="max-w-3xl mx-auto py-16 px-4 relative z-10">
                    {/* Back Link */}
                    <div className="mb-12">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-50 text-gray-700 hover:bg-green-600 hover:text-white font-black uppercase text-[11px] tracking-widest transition-all group border border-gray-200 shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Articles
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="mb-12 rounded-2xl overflow-hidden shadow-lg aspect-video relative">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>

                    {/* Body Content */}
                    <div className="prose prose-lg max-w-none text-gray-700">
                        {/* Introduction */}
                        <p className="text-xl text-gray-800 leading-relaxed mb-8 border-l-4 border-green-600 pl-6 bg-green-50 py-4 rounded-r-lg">
                            {post.content.introduction}
                        </p>

                        {/* Main Content Sections */}
                        {post.content.sections.map((section, index) => (
                            <div key={index} className="mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
                                <p className="text-gray-700 leading-relaxed mb-6">{section.content}</p>

                                {/* Subsections for checklist items */}
                                {section.subsections && (
                                    <div className="space-y-6">
                                        {section.subsections.map((subsection, subIndex) => (
                                            <div key={subIndex} className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
                                                <h3 className="text-xl font-bold text-gray-900 mb-4">{subsection.title}</h3>
                                                <ul className="space-y-2">
                                                    {subsection.items.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex items-start gap-3">
                                                            <span className="w-2 h-2 bg-green-600 rounded-full flex-shrink-0 mt-2"></span>
                                                            <span className="text-gray-700">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Regular list items */}
                                {section.items && (
                                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-400">
                                        <ul className="space-y-2">
                                            {section.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="flex items-start gap-3">
                                                    <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></span>
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Conclusion */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200 mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">{post.content.conclusion}</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Book?</h3>
                        <p className="text-gray-600 mb-6">Get a free quote for your cleaning needs today.</p>
                        <Button asChild size="lg" className="bg-accent hover:bg-accent-dark text-black font-semibold">
                            <Link href="/get-quote">Get Your Free Quote</Link>
                        </Button>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}

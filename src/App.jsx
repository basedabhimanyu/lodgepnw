import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, CalendarSync, MessageSquare, Image as ImageIcon, Smartphone, LayoutTemplate, Code2, Sparkles, MapPin, Building2, BookHeart, Mail, Phone, ExternalLink } from 'lucide-react'

const App = () => {
    const [expertiseTab, setExpertiseTab] = useState('cabins') // 'cabins' or 'venues'

    const cabinFeatures = [
        { title: 'Instant Booking', desc: 'Zero commissions, secure payments directly to your bank.' },
        { title: 'Complete Calendar Sync', desc: 'Real-time synchronization across Airbnb, VRBO, and booking.com. No double bookings.' },
        { title: 'Automated Logistics', desc: 'Automated check-in instructions and follow-ups to save you hours.' }
    ]

    const venueFeatures = [
        { title: 'Lead Generation & Tours', desc: 'Capture high-intent wedding and event leads with seamless tour scheduling.' },
        { title: 'Cinematic Visual Galleries', desc: 'Optimized, high-res visual layouts that showcase your venue in its best light.' },
        { title: 'Custom Inquiries', desc: 'Tailored application forms to qualify budgets, dates, and event sizes.' }
    ]

    return (
        <>
            {/* Navigation */}
            <nav>
                <div className="container nav-container">
                    <div className="nav-logo">
                        LodgePNW
                    </div>
                    <div className="nav-links">
                        <a href="#work">Work</a>
                        <a href="#expertise">Expertise</a>
                        <a href="#why-us">Why Us</a>
                        <a href="#features">Features</a>
                        <a href="#pricing">Pricing</a>
                        <a href="#about">About</a>
                    </div>
                    <div>
                        <a href="#pricing" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', border: '1px solid #fff' }}>
                            Get Started
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="badge" style={{ marginBottom: '2rem' }}>
                            <span className="status-dot"></span>
                            Available for New Projects
                        </div>
                        <h1>
                            Elevate Your Stay.<br />
                            <span style={{ color: '#666' }}>Automate Your Bookings.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', margin: '2rem auto 3rem', color: '#888', maxWidth: '700px' }}>
                            We build high-performance websites and seamless software integrations for the world's most iconic stays. From PNW cabins to luxury event venues, we turn visitors into guests.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="#pricing" className="btn btn-primary">
                                Get Started – Starting at $999
                            </a>
                            <a href="#why-us" className="btn">
                                View Our Network
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Marquee */}
            <div className="marquee-container">
                <div className="marquee-content" style={{ display: 'flex' }}>
                    <span>DIRECT BOOKINGS — PROPERTY MANAGEMENT SYNC — SEAMLESS PAYMENTS — HIGH-END DESIGN — LODGIFY & CLOUDBEDS INTEGRATION — DIRECT BOOKINGS — PROPERTY MANAGEMENT SYNC — SEAMLESS PAYMENTS — HIGH-END DESIGN — LODGIFY & CLOUDBEDS INTEGRATION — </span>
                </div>
            </div>

            {/* Featured Work / Sample */}
            <section id="work" style={{ padding: '8rem 0', background: '#050505', borderBottom: '1px solid #222' }}>
                <div className="container" style={{ maxWidth: '1000px', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="badge" style={{ marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            Featured Project
                        </div>
                        <h2 style={{ marginBottom: '1.5rem' }}>Experience a <br/><span style={{ color: '#666' }}>Live Direct Booking Website</span></h2>
                        <p style={{ fontSize: '1.125rem', marginBottom: '3rem', color: '#888', maxWidth: '700px', margin: '0 auto' }}>
                            Take a tour of our sample booking website. Fast, responsive, and designed for seamless checkouts without the OTA fees.
                        </p>
                        
                        <div style={{ background: '#111', border: '1px solid #333', borderRadius: '1rem', overflow: 'hidden', maxWidth: '1000px', margin: '0 auto', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                            <div style={{ padding: '1rem', borderBottom: '1px solid #222', display: 'flex', gap: '0.5rem', background: '#0a0a0a', alignItems: 'center' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }}></div>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EAB308' }}></div>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
                                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                    <div className="preview-embed-url">
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }}></div>
                                        Live Preview Active
                                    </div>
                                </div>
                            </div>
                            <div className="preview-iframe-wrapper">
                                <iframe 
                                    src="https://whispering-pines-amber.vercel.app/" 
                                    style={{ width: '100%', height: '100%', border: 'none' }} 
                                    title="Whispering Pines Retreat Preview"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        
                        <div style={{ marginTop: '3rem' }}>
                            <a href="https://whispering-pines-amber.vercel.app/" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '1rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                                View Full Screen
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Industry Expertise Toggle */}
            <section id="expertise" style={{ padding: '8rem 0' }}>
                <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem', marginBottom: '1rem', color: '#888' }}>Industry Expertise</p>
                        <h2 style={{ marginBottom: '3rem' }}>Tailored <span style={{ color: '#666' }}>for your specific needs.</span></h2>

                        <div className="tabs-wrapper">
                            <button
                                className={`tab-btn ${expertiseTab === 'cabins' ? 'active' : ''}`}
                                onClick={() => setExpertiseTab('cabins')}
                            >
                                <Building2 size={18} />
                                Cabins & Resorts
                            </button>
                            <button
                                className={`tab-btn ${expertiseTab === 'venues' ? 'active' : ''}`}
                                onClick={() => setExpertiseTab('venues')}
                            >
                                <BookHeart size={18} />
                                Event Venues
                            </button>
                        </div>

                        <div className="content-box">
                            <AnimatePresence mode="wait">
                                {expertiseTab === 'cabins' && (
                                    <motion.div
                                        key="cabins"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Cabins & Resorts</h3>
                                        <p style={{ marginBottom: '2rem' }}>Optimized for seamless self-service operations and maximum occupancy.</p>
                                        <div className="feature-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {cabinFeatures.map((feat, idx) => (
                                                <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                                                    <CheckCircle2 color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                    <div>
                                                        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', fontWeight: 500 }}>{feat.title}</h4>
                                                        <p style={{ fontSize: '1rem' }}>{feat.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                                {expertiseTab === 'venues' && (
                                    <motion.div
                                        key="venues"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>High-End Event Venues</h3>
                                        <p style={{ marginBottom: '2rem' }}>Engineered to showcase luxury spaces and capture high-budget wedding leads.</p>
                                        <div className="feature-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                            {venueFeatures.map((feat, idx) => (
                                                <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                                                    <CheckCircle2 color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                    <div>
                                                        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', fontWeight: 500 }}>{feat.title}</h4>
                                                        <p style={{ fontSize: '1rem' }}>{feat.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Us Section */}
            <section id="why-us" style={{ background: '#0a0a0a', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
                        <motion.div
                            style={{ flex: '1 1 500px' }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                                More Than Just Code.<br />
                                <span style={{ color: '#666' }}>We Have the Audience.</span>
                            </h2>
                            <p style={{ marginBottom: '2rem', fontSize: '1.125rem', lineHeight: 1.6 }}>
                                Most agencies build a site and leave you to find the traffic. We do it differently. When you work with us, you aren't just getting a developer—you're getting a partner with a 180k+ reach across the Pacific Northwest and the United States.
                            </p>
                            <p style={{ fontSize: '1.125rem' }}>
                                We know what travelers want to see because we engage with them every day on <a href="https://instagram.com/visit.the.pnw" style={{ color: '#fff', textDecoration: 'underline' }}>@visit.the.pnw</a> and <a href="https://instagram.com/visit.the.states" style={{ color: '#fff', textDecoration: 'underline' }}>@visit.the.states</a>.
                            </p>
                        </motion.div>

                        <motion.div
                            style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="info-card">
                                <h3>Integrated Ecosystem</h3>
                                <p>We specialize in seamless integrations with Lodgify, Cloudbeds, and custom rental booking engines.</p>
                            </div>
                            <div className="info-card">
                                <h3>Conversion Focused</h3>
                                <p>No "ghost" bookings. Just streamlined checkout flows, perfectly synced calendars, and completely secure payments.</p>
                            </div>
                            <div className="info-card">
                                <h3>Social Edge</h3>
                                <p>Gain visibility through our organic reach, connecting your property directly with travel enthusiasts.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Every Modern Rental Needs */}
            <section id="features">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title" style={{ textAlign: 'center' }}
                    >
                        <h2>Features Every <br /><span style={{ color: '#666' }}>Modern Rental Needs</span></h2>
                    </motion.div>

                    <div className="bento-grid">
                        <motion.div className="bento-item large" whileHover={{ y: -5 }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                            <div className="bento-icon"><LayoutTemplate size={24} color="#FAFAFA" /></div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '2rem' }}>Direct Booking Engine</h3>
                            <p>Skip the 15% Airbnb/VRBO fees. Provide a flawless checkout experience and truly own your guest relationship.</p>
                            <ArrowUpRight size={24} style={{ position: 'absolute', top: '3rem', right: '3rem', color: '#444' }} />
                        </motion.div>

                        <motion.div className="bento-item" whileHover={{ y: -5 }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <div className="bento-icon"><CalendarSync size={24} color="#FAFAFA" /></div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Channel Manager</h3>
                            <p>Sync your calendar across all platforms in real-time. No double bookings, ever.</p>
                            <ArrowUpRight size={24} style={{ position: 'absolute', top: '3rem', right: '3rem', color: '#444' }} />
                        </motion.div>

                        <motion.div className="bento-item" whileHover={{ y: -5 }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                            <div className="bento-icon"><ImageIcon size={24} color="#FAFAFA" /></div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Visual Storytelling</h3>
                            <p>Optimized galleries designed for high-end wedding venues, resorts, and immersive lodge experiences.</p>
                            <ArrowUpRight size={24} style={{ position: 'absolute', top: '3rem', right: '3rem', color: '#444' }} />
                        </motion.div>

                        <motion.div className="bento-item" whileHover={{ y: -5 }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <div className="bento-icon"><MessageSquare size={24} color="#FAFAFA" /></div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Automated Messaging</h3>
                            <p>Trigger automated check-in instructions, emails, and follow-ups to save you countless hours.</p>
                            <ArrowUpRight size={24} style={{ position: 'absolute', top: '3rem', right: '3rem', color: '#444' }} />
                        </motion.div>

                        <motion.div className="bento-item" whileHover={{ y: -5 }} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                            <div className="bento-icon"><Smartphone size={24} color="#FAFAFA" /></div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Mobile-First Design</h3>
                            <p>70% of travelers book on their phones. We ensure your interface is flawless on every device.</p>
                            <ArrowUpRight size={24} style={{ position: 'absolute', top: '3rem', right: '3rem', color: '#444' }} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About / Hybrid Advantage */}
            <section id="about" style={{ padding: '8rem 0', background: '#0a0a0a', borderTop: '1px solid #222', borderBottom: '1px solid #222' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '4rem' }}
                    >
                        <h2 style={{ marginBottom: '1.5rem' }}>Where Hospitality Intuition<br /><span style={{ color: '#666' }}>Meets Modern Engineering</span></h2>
                        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>We didn't start by writing code; we started by telling stories.</p>
                        <p style={{ marginBottom: '2rem' }}>
                            Through our platforms, @visit.the.pnw and @visit.the.states, we’ve spent years showcasing the most breathtaking stays in the United States to an audience of over 180,000 travelers. We saw firsthand what makes a guest stop scrolling, and more importantly, what makes them hit "Book Now."
                        </p>
                        <p style={{ marginBottom: '2rem' }}>
                            But we also saw the friction. We saw incredible resorts struggling with clunky booking engines, lodges losing 15% to OTA fees, and event venues bogged down by manual paperwork. That's why we built this agency.
                        </p>
                        <p>
                            As Computer Science professionals with a pulse on the travel market, we don’t just build "pretty websites." We build MVPs and full-scale integrations that solve the operational headaches of the hospitality world.
                        </p>
                    </motion.div>

                    <div className="advantage-box">
                        <h3 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>The Hybrid Advantage</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Code2 size={20} color="#10B981" /> Technical Precision
                                </h4>
                                <p style={{ fontSize: '0.95rem' }}>From Lodgify and Cloudbeds to custom-coded booking flows, we ensure your entire tech stack is completely seamless.</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MapPin size={20} color="#10B981" /> Market Authority
                                </h4>
                                <p style={{ fontSize: '0.95rem' }}>We understand the US travel markets perfectly, allowing us to design for the exact demographic you want to attract.</p>
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Sparkles size={20} color="#10B981" /> Streamlined Solutions
                                </h4>
                                <p style={{ fontSize: '0.95rem' }}>We focus on hitting release targets to get your digital presence live, functional, and profitable fast.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" style={{ padding: '8rem 0', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ marginBottom: '1rem' }}>One Simple <span style={{ color: '#666' }}>Starting Point.</span></h2>
                        <p style={{ marginBottom: '3rem', fontSize: '1.125rem' }}>We don’t believe in hidden fees or complex tiers. We offer professional, enterprise-grade hospitality solutions.</p>

                        <div className="pricing-box">
                            <div style={{ position: 'absolute', top: '0', left: '0', right: '0', height: '100px', background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.05) 0%, transparent 70%)' }}></div>
                            <span style={{ fontSize: '1rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '2px' }}>Starting At</span>
                            <div className="pricing-amount">$999<span className="pricing-plus">+</span></div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginBottom: '4rem' }}>
                                {['Full Website Development (Responsive & SEO Optimized)', 'Vacation Rental Software Integration (PMS / Channel Manager)', 'Automated Booking & Payment Setup', 'Initial Launch Consultation'].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.125rem' }}>
                                        <CheckCircle2 size={20} color="#10B981" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <a href="mailto:contact@lodgepnw.com" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1.25rem 3rem', width: '100%', maxWidth: '300px' }}>
                                Start Your Project
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact / Final CTA */}
            <section id="contact" style={{ padding: '8rem 0', borderTop: '1px solid #222' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '700px' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Ready to Scale <span style={{ color: '#666' }}>Your Property?</span></h2>
                    <p style={{ fontSize: '1.25rem', marginBottom: '3rem' }}>Whether you’re a boutique hotel, a cozy cabin, or a premier event venue, let’s get you booked.</p>

                    <a href="mailto:contact@lodgepnw.com" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1.5rem 3rem', marginBottom: '2rem' }}>
                        Email Us: contact@lodgepnw.com
                    </a>

                    <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid #222' }}>
                        <div style={{ background: '#111', borderRadius: '1rem', border: '1px solid #333', padding: '2rem', maxWidth: '400px', margin: '0 auto 3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#FAFAFA' }}>Direct Contact</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <a href="mailto:contact@lodgepnw.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: '#fff', textDecoration: 'none', fontSize: '1.125rem' }}>
                                    <Mail size={20} color="#10B981" />
                                    <span>contact@lodgepnw.com</span>
                                </a>
                                <a href="tel:+917240727283" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: '#fff', textDecoration: 'none', fontSize: '1.125rem' }}>
                                    <Phone size={20} color="#10B981" />
                                    <span>+91 72407 27283</span>
                                </a>
                            </div>
                        </div>

                        <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Prefer Social?</h4>
                        <p style={{ marginBottom: '1.5rem' }}>Slide into our DMs for a quick audit of your current digital presence:</p>
                        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                            <a href="https://instagram.com/visit.the.pnw" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                                @visit.the.pnw
                            </a>
                            <span style={{ color: '#444' }}>|</span>
                            <a href="https://instagram.com/visit.the.states" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                                @visit.the.states
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border-color)', color: '#666' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    <div className="nav-logo" style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 'bold' }}>
                        LodgePNW
                    </div>
                    <div>
                        <p style={{ fontSize: '0.875rem' }}>© {new Date().getFullYear()} LodgePNW. All rights reserved.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
                        <a href="https://instagram.com/visit.the.pnw" target="_blank" rel="noreferrer">@visit.the.pnw</a>
                        <a href="https://instagram.com/visit.the.states" target="_blank" rel="noreferrer">@visit.the.states</a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default App

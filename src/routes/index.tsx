import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, Github, Linkedin, Mail, MapPin, Menu, X, Code2, Braces, Terminal, GraduationCap, FolderCode, Award, Compass, Check, Copy, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import portrait from '@/assets/yuvraj-profile.jpeg.asset.json';

// Replace these clearly marked details as your portfolio grows.
const profile = {
  email: 'yuvraj.26bcon2462@jecrcu.edu.in',
  github: 'https://github.com/Yuvraj-Krishnani-2462',
  linkedin: 'https://www.linkedin.com/in/yuvraj-krishnani-1a234138b/',
};
const navigation = [ ['home', 'Home'], ['about', 'About'], ['education', 'Education'], ['skills', 'Skills'], ['projects', 'Projects'], ['achievements', 'Achievements'], ['interests', 'Interests'] ];

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Yuvraj Krishnani — Computer Science Student' },
    { name: 'description', content: 'Meet Yuvraj Krishnani, a first-year B.Tech Computer Science Engineering student at JECRC University, Jaipur. Explore his education and developing portfolio.' },
    { property: 'og:title', content: 'Yuvraj Krishnani — Personal Portfolio' },
    { property: 'og:description', content: 'Computer Science Engineering student at JECRC University, Jaipur. A journey into code, learning, and technology.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});

function SectionHeading({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-heading"><span className="section-number">{number}.</span><h2>{children}</h2></div>;
}
function SocialLinks({ compact = false }: { compact?: boolean }) {
  return <div className="flex items-center gap-4">
    <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Yuvraj on GitHub" title="GitHub" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"><Github size={18} />{!compact && <span className="text-xs">GitHub</span>}</a>
    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Yuvraj on LinkedIn" title="LinkedIn" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"><Linkedin size={18} />{!compact && <span className="text-xs">LinkedIn</span>}</a>
  </div>;
}
function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); window.setTimeout(() => setCopied(false), 2000); }
    catch { setCopied(false); }
  }
  return <>
    <header className="site-header">
      <div className="site-width header-inner">
        <a className="brand min-w-0" href="#home" aria-label="Yuvraj Krishnani home">yk<span>.</span></a>
        <div className="hidden items-center gap-7 lg:flex">
          <nav className="flex items-center gap-6" aria-label="Main navigation">{navigation.map(([id, label]) => <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'active' : ''}`}>{label}</a>)}</nav>
          <Button variant="outline" size="sm" asChild><a href="#contact">Let's talk <ArrowUpRight /></a></Button>
        </div>
        <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation">{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav lg:hidden" aria-label="Mobile navigation">{[...navigation, ['contact', 'Contact']].map(([id, label]) => <a key={id} href={`#${id}`} className="nav-link" onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
    </header>
    <main>
      <section id="home" className="hero">
        <img className="hero-photo" src={portrait.url} alt="Yuvraj Krishnani standing outdoors" fetchPriority="high" />
        <div className="site-width hero-content reveal">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 text-[10px] text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-success" /> A new chapter in computer science</div>
          <p className="mt-8 font-mono text-xs text-muted-foreground">Hello world, I'm</p>
          <h1>Yuvraj<br /><span className="gradient-text">Krishnani<span className="text-primary">.</span></span></h1>
          <p className="mt-5 font-display text-lg font-medium">Computer Science Student<span className="ml-2 text-primary"> / </span> <span className="text-muted-foreground">Year 01</span></p>
          <p className="hero-intro mt-5">Beginning my B.Tech journey at JECRC University, Jaipur. Exploring the world of technology, one idea and one line of code at a time.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild><a href="#projects">View projects <ArrowUpRight /></a></Button>
            <Button variant="outline" size="lg" asChild><a href="#contact"><Mail /> Contact me</a></Button>
            <Button variant="ghost" size="lg" asChild><a href="/yuvraj-krishnani-resume.pdf" download><FileDown /> Resume</a></Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5"><SocialLinks /><span className="h-4 w-px bg-border" /><span className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin size={13} /> Jaipur, India</span></div>
          <a href="#about" className="mt-12 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"><ArrowDown size={14} className="text-primary" /> Get to know me</a>
        </div>
      </section>
      <section id="about" className="section site-width">
        <SectionHeading number="01">A little about me</SectionHeading>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div><h3 className="mb-4 text-xl">At the beginning. Ready for what's next.</h3><p className="body-copy">I'm Yuvraj Krishnani, a first-year Computer Science Engineering student at <span className="text-foreground">JECRC University, Jaipur</span>. This portfolio is a space for my learning journey and the work I'll create along the way.</p><p className="body-copy mt-4">I'm building my foundation in computer science and discovering where my curiosity takes me.</p><p className="placeholder-label mt-5">[Add your personal story and what inspires you here.]</p></div>
          <dl className="grid grid-cols-2 content-start gap-x-6 gap-y-7 border-l border-border pl-7"><div><dt className="info-label">Currently</dt><dd className="mt-2 text-sm">1st Year Student</dd></div><div><dt className="info-label">Degree</dt><dd className="mt-2 text-sm">B.Tech · CSE</dd></div><div><dt className="info-label">University</dt><dd className="mt-2 text-sm">JECRC University</dd></div><div><dt className="info-label">Based in</dt><dd className="mt-2 text-sm">Jaipur, Rajasthan</dd></div></dl>
        </div>
      </section>
      <section id="education" className="section site-width">
        <SectionHeading number="02">Education</SectionHeading>
        <div className="grid gap-5 md:grid-cols-[1fr_auto]"><div className="flex items-start gap-5"><span className="skill-icon shrink-0"><GraduationCap size={21} /></span><div><p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">The foundation</p><h3 className="text-xl">B.Tech in Computer Science Engineering</h3><p className="mt-2 text-sm text-muted-foreground">JECRC University <span className="mx-2 text-border">/</span> Jaipur, Rajasthan</p><p className="mt-4 font-mono text-sm text-primary">2026 — 2030</p><p className="placeholder-label mt-4">[Add relevant coursework here.]</p></div></div><span className="tag h-fit w-fit md:mt-2">1st year · In progress</span></div>
      </section>
      <section id="skills" className="section site-width">
        <SectionHeading number="03">Technical toolkit</SectionHeading>
        <p className="body-copy mb-7">A foundation in progress. My skills grow with every semester and project.</p>
        <div className="grid gap-8 md:grid-cols-3">{[{ name: 'Languages', icon: Code2, items: ['C', 'C++', 'C#', 'Python', 'Java'] }, { name: 'Web development', icon: Braces, items: ['HTML', 'CSS', 'JavaScript'] }, { name: 'Tools & platforms', icon: Terminal, items: ['GitHub', 'Claude'] }].map((group) => <div className="skill-group border-t border-border pt-6" key={group.name}><div className="flex items-center gap-3"><span className="skill-icon"><group.icon size={19} /></span><h3 className="text-base">{group.name}</h3></div><div className="my-5 flex flex-wrap gap-2">{group.items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>)}</div>
      </section>
      <section id="projects" className="section site-width">
        <div className="flex flex-wrap items-center justify-between gap-4"><SectionHeading number="04">Projects in the making</SectionHeading><a href={profile.github} target="_blank" rel="noopener noreferrer" className="mb-7 flex items-center gap-2 text-xs text-muted-foreground hover:text-primary">Explore my GitHub <ArrowUpRight size={14} /></a></div>
        <div className="grid gap-5 md:grid-cols-3">{[{ number: '01', title: 'Personal Portfolio', text: 'A dark-themed, responsive portfolio website to showcase my journey, skills, and projects.', tags: ['HTML', 'CSS', 'JavaScript'] }, { number: '02', title: 'Weather API App', text: 'An app that fetches live weather data from a public API and displays conditions for any city.', tags: ['JavaScript', 'API', 'CSS'] }, { number: '03', title: 'Fandom Web User Interface', text: 'A fan-community UI concept with themed pages, character cards, and interactive sections.', tags: ['HTML', 'CSS', 'UI Design'] }].map((project) => <article className="placeholder-card" key={project.number}><div className="flex items-center justify-between"><FolderCode size={27} className="text-primary" /><span className="font-mono text-xs text-muted-foreground">/{project.number}</span></div><h3 className="mt-9 text-lg">{project.title}</h3><p className="body-copy mt-3 text-xs">{project.text}</p><div className="mt-6 flex flex-wrap gap-2">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div></article>)}</div>
      </section>
      <section id="achievements" className="section site-width">
        <SectionHeading number="05">Milestones</SectionHeading>
        <div className="grid gap-8 md:grid-cols-2">{[{ name: 'Certifications', items: ['Python Programming Fundamentals — Coursera (2026)', 'Web Development Bootcamp — Udemy (2026)', 'Introduction to C Programming — NPTEL (2026)'] }, { name: 'Achievements', items: ['Built and deployed 3 personal web projects in my first semester', 'Solved 100+ coding problems across practice platforms', 'Top 10 finisher in a college-level coding contest (2026)'] }].map((group) => <div key={group.name} className="flex items-start gap-4 border-t border-border pt-6"><Award className="mt-1 shrink-0 text-violet" size={22} /><div><h3 className="text-lg">{group.name}</h3><ul className="body-copy mt-3 space-y-2">{group.items.map((item) => <li key={item} className="flex items-start gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{item}</li>)}</ul></div></div>)}</div>
      </section>
      <section id="interests" className="section site-width">
        <SectionHeading number="06">Curiosity & direction</SectionHeading>
        <div className="grid gap-10 md:grid-cols-2"><div><div className="mb-4 flex items-center gap-3"><Compass size={20} className="text-primary" /><h3 className="text-xl">What sparks my curiosity</h3></div><p className="body-copy">I'm fascinated by how software shapes everyday life — from the apps on our phones to the systems behind them. I enjoy exploring web development, experimenting with new programming languages, and understanding how APIs connect the digital world. Outside the classroom, I like gaming, following tech communities, and turning small ideas into working projects.</p></div><div><div className="mb-4 flex items-center gap-3"><ArrowUpRight size={20} className="text-violet" /><h3 className="text-xl">Where I want to go</h3></div><p className="body-copy">My goal is to grow into a well-rounded software developer. Over the next few years I want to master data structures and algorithms, contribute to open-source projects, and build full-stack applications that solve real problems. Long term, I see myself working on products that reach millions of users.</p></div></div>
      </section>
      <section id="contact" className="contact-section">
        <div className="site-width grid items-center gap-10 md:grid-cols-[1.2fr_1fr]"><div><p className="eyebrow mb-5">07 / Let's connect</p><h2>Good conversations.<br /><span className="gradient-text">New possibilities.</span></h2><p className="body-copy mt-5">A conversation, a shared idea, or a simple hello.<br />I'd love to hear from you.</p></div><div className="min-w-0"><p className="info-label mb-4">Email</p><div className="flex min-w-0 items-center gap-2"><a href={`mailto:${profile.email}`} className="min-w-0 break-all font-display text-lg hover:text-primary">{profile.email}</a><Button variant="ghost" size="icon" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email'} title={copied ? 'Copied' : 'Copy email'} className="shrink-0">{copied ? <Check /> : <Copy />}</Button></div><div className="mt-6 flex flex-wrap gap-3"><Button asChild><a href={`mailto:${profile.email}`}>Say hello <ArrowRight /></a></Button><Button variant="outline" asChild><a href="/yuvraj-krishnani-resume.pdf" download><FileDown /> Download resume</a></Button></div><div className="mt-7"><SocialLinks /></div></div></div>
      </section>
    </main>
    <footer className="site-width grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-7"><div className="min-w-0"><a href="#home" className="brand text-xl">yk<span>.</span></a><p className="mt-2 text-[10px] text-muted-foreground">© 2026 Yuvraj Krishnani</p></div><a href="#home" className="flex shrink-0 items-center gap-2 text-[10px] text-muted-foreground hover:text-primary">Back to top <ArrowUpRight size={13} /></a></footer>
  </>;
}

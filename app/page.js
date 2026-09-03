import BackgroundCanvas from "./components/BackgroundCanvas";
import HeroFlowCanvas from "./components/HeroFlowCanvas";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import ScrollReveal from "./components/ScrollReveal";
import MagneticButton from "./components/MagneticButton";
import HeroParallax from "./components/HeroParallax";
import SkillsNetwork from "./components/SkillsNetwork";
import ExperienceVisualizer from "./components/ExperienceVisualizer";
import GlobalSystemsMap from "./components/GlobalSystemsMap";
import ProjectSimulationDeck from "./components/ProjectSimulationDeck";
import MinimalContact from "./components/MinimalContact";
import HeroRoleRotator from "./components/HeroRoleRotator";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <BackgroundCanvas />
      <Navigation />
      <HeroParallax />

      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <HeroFlowCanvas />
        <div className="hero-content">
          <h1 className="hero-name">RAKESH PYSETTI</h1>
          <HeroRoleRotator />
          <p className="hero-quote">
            Building intelligence in domains where{" "}
            <em>accuracy isn&apos;t optional</em> — from financial risk to
            patient outcomes.
          </p>
          <div className="hero-meta">
            <span>6 Years Production Experience</span>
            <span className="dot"></span>
            <span>Finance · Healthcare · Enterprise</span>
            <span className="dot"></span>
            <span>Based in USA</span>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-grid">
            <ScrollReveal>
              <div className="about-text">
                <div className="section-label">Global Engineering</div>
                <h2 className="section-title">
                  ML systems engineered across continents and regulated frontiers.
                </h2>
                <p>
                  Over six years, I have architected mission-critical AI/ML pipelines across financial services, healthcare, and enterprise SaaS &mdash; navigating HIPAA constraints, overnight batch risk windows, and large-scale model governance from India to the United States.
                </p>
                
                <div className="about-domain-pills">
                  <span className="domain-chip amber">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3l9 5H3l9-5z" />
                    </svg>
                    <span>Financial Risk &amp; GenAI</span>
                  </span>
                  <span className="domain-chip green">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <line x1="12" y1="8" x2="12" y2="14" />
                      <line x1="9" y1="11" x2="15" y2="11" />
                    </svg>
                    <span>Clinical Healthcare &amp; HIPAA</span>
                  </span>
                  <span className="domain-chip cyan">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                      <line x1="6" y1="6" x2="6.01" y2="6" />
                      <line x1="6" y1="18" x2="6.01" y2="18" />
                    </svg>
                    <span>Enterprise SaaS &amp; Triage</span>
                  </span>
                </div>

                <ScrollReveal type="stagger" className="about-stats">
                  <div className="stat-card">
                    <div className="stat-number">6+</div>
                    <div className="stat-label">Years in Production ML</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">3</div>
                    <div className="stat-label">Regulated Industries</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">3</div>
                    <div className="stat-label">Cloud Platforms</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-number">E2E</div>
                    <div className="stat-label">Pipeline to Production</div>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>

            <ScrollReveal type="up" className="about-systems-col">
              <GlobalSystemsMap />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== JOURNEY / EXPERIENCE ===== */}
      <section className="journey-section" id="journey">
        <div className="container">
          <ScrollReveal>
            <div className="section-label">Experience</div>
            <h2 className="section-title">
              From structured ML to generative AI —<br />
              each role raised the stakes.
            </h2>
          </ScrollReveal>
          <ScrollReveal type="up">
            <ExperienceVisualizer />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section className="projects-section" id="projects">
        <div className="container">
          <ScrollReveal>
            <div className="section-label">Notable Work</div>
            <h2 className="section-title">Systems built for stakes that matter.</h2>
          </ScrollReveal>
          <ScrollReveal type="up">
            <ProjectSimulationDeck />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="skills-section" id="skills">
        <div className="container">
          <ScrollReveal>
            <div className="section-label">Technical Expertise</div>
            <h2 className="section-title">Full-stack ML — from data to deployment.</h2>
          </ScrollReveal>
          
          <ScrollReveal type="up">
             <SkillsNetwork />
          </ScrollReveal>
        </div>
      </section>

      {/* ===== EDUCATION ===== */}
      <section className="education-section" id="education">
        <div className="container">
          <ScrollReveal>
            <div className="section-label">Education</div>
            <h2 className="section-title">Academic foundation.</h2>
          </ScrollReveal>
          <ScrollReveal type="scale">
            <div className="edu-card">
              <div className="edu-degree">Master&apos;s in Management Information Systems</div>
              <div className="edu-school">University of Illinois Springfield</div>
              <div className="edu-meta">Springfield, Illinois · Aug 2023 – Dec 2024</div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="contact-section" id="contact">
        <div className="container">
          <ScrollReveal type="up">
            <MinimalContact />
          </ScrollReveal>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© 2024 Rakesh Pysetti. Designed with purpose.</p>
        </div>
      </footer>
    </>
  );
}

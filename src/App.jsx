import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==================== CONSTANTS ====================
const PHOSPHOR_GREEN = '#00FF41';
const MONITOR_BLACK = '#0a0f0a';
const COMPLIANCE_WHITE = '#FFFFFF';
const ALERT_RED = '#FF0000';
const CAT_II_AMBER = '#FFA500';

const BOOT_SEQUENCE = [
  { text: '> POWER_ON...', delay: 0 },
  { text: '> LOADING PROFILE: TheSTIGMan (Security Technical Implementation Guide)', delay: 600 },
  { text: '> CONNECTING TO GITHUB REPOSITORY... [ OK ]', delay: 1200 },
  { text: '> CHECKING COMPLIANCE STANDARDS... [ NIST-800-53: OK ]', delay: 1800 },
  { text: '> INITIATING SYSTEM HARDENING...', delay: 2400 },
  { text: '> SYSTEM READY.', delay: 3000 },
];

const SKILLS_DATA = [
  { name: 'LINUX', value: 92, category: 'software' },
  { name: 'PYTHON', value: 85, category: 'software' },
  { name: 'STIG COMPLIANCE', value: 95, category: 'software' },
  { name: 'NETWORK SEC', value: 88, category: 'software' },
  { name: 'AVIONICS', value: 90, category: 'hardware' },
  { name: 'AIRCRAFT SYS', value: 94, category: 'hardware' },
];

const PROJECTS_DATA = [
  { id: 1, name: 'RHEL-HARDENER', cat: 'I', angle: 45, distance: 60, desc: 'Automated RHEL 8/9 STIG compliance toolkit with 400+ controls', link: '#' },
  { id: 2, name: 'VULN-SCANNER', cat: 'I', angle: 120, distance: 75, desc: 'Network vulnerability assessment framework with CVE correlation', link: '#' },
  { id: 3, name: 'LOG-SENTINEL', cat: 'II', angle: 200, distance: 50, desc: 'Real-time log analysis daemon for anomaly detection', link: '#' },
  { id: 4, name: 'PATCH-PILOT', cat: 'II', angle: 280, distance: 85, desc: 'Automated patch management system with rollback capability', link: '#' },
  { id: 5, name: 'CONFIG-AUDITOR', cat: 'I', angle: 340, distance: 65, desc: 'Configuration drift detection and remediation engine', link: '#' },
];

const LOGS_DATA = [
  { id: 'IR-2024-001', title: 'Migrating Legacy Systems to STIG-Compliant Baselines', date: '2024.12.15', redacted: 'Discovered 47 CAT I findings in production environment', content: 'Successfully hardened 12 RHEL servers achieving 98% compliance score.' },
  { id: 'IR-2024-002', title: 'Zero-Day Response Protocol Implementation', date: '2024.11.22', redacted: 'CVE-2024-XXXX exploited in adjacent network segment', content: 'Implemented emergency patching workflow reducing MTTR by 60%.' },
  { id: 'IR-2024-003', title: 'From Flight Line to Firewall: Lessons in Systematic Troubleshooting', date: '2024.10.08', redacted: 'Applied F-16 maintenance methodology to incident response', content: 'Transitioned aircraft diagnostic protocols to cybersecurity operations.' },
];

// ==================== CRT LAYOUT WRAPPER ====================
const CRTLayout = ({ children, cleanMode }) => {
  if (cleanMode) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 font-mono p-8">
        {children}
      </div>
    );
  }

  return (
    <div className="crt-container">
      <div className="crt-bezel">
        <div className="crt-screen">
          <div className="crt-scanlines" />
          <div className="crt-glow" />
          <div className="crt-content">
            {children}
          </div>
        </div>
        <div className="bezel-screws">
          <div className="screw top-left" />
          <div className="screw top-right" />
          <div className="screw bottom-left" />
          <div className="screw bottom-right" />
        </div>
        <div className="bezel-label">MK-1 MAINTENANCE UNIT // DIAGNOSTIC TERMINAL v3.7.2</div>
      </div>
    </div>
  );
};

// ==================== BOOT SEQUENCE ====================
const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLine >= BOOT_SEQUENCE.length) {
      setTimeout(onComplete, 800);
      return;
    }

    const line = BOOT_SEQUENCE[currentLine].text;
    
    if (charIndex < line.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + line[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 25);
      return () => clearTimeout(timeout);
    } else {
      setLines(prev => [...prev, displayText]);
      setDisplayText('');
      setCharIndex(0);
      setCurrentLine(prev => prev + 1);
    }
  }, [currentLine, charIndex, displayText, onComplete]);

  return (
    <motion.div 
      className="boot-sequence"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="boot-header">
        <pre className="ascii-art">{`
   _____ _______ _____ _____ __  __          _   _ 
  / ____|__   __|_   _/ ____|  \\/  |   /\\   | \\ | |
 | (___    | |    | || |  __| \\  / |  /  \\  |  \\| |
  \\___ \\   | |    | || | |_ | |\\/| | / /\\ \\ | . \` |
  ____) |  | |   _| || |__| | |  | |/ ____ \\| |\\  |
 |_____/   |_|  |_____\\_____|_|  |_/_/    \\_\\_| \\_|
                                                    
        `}</pre>
        <div className="boot-subtitle">SECURITY TECHNICAL IMPLEMENTATION GUIDE SPECIALIST</div>
      </div>
      <div className="boot-lines">
        {lines.map((line, i) => (
          <motion.div 
            key={i} 
            className="boot-line"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {line}
          </motion.div>
        ))}
        {displayText && (
          <div className="boot-line typing">
            {displayText}
            <span className="cursor">█</span>
          </div>
        )}
      </div>
      <div className="boot-progress">
        <div 
          className="boot-progress-bar" 
          style={{ width: `${(currentLine / BOOT_SEQUENCE.length) * 100}%` }} 
        />
      </div>
    </motion.div>
  );
};

// ==================== SIDEBAR ====================
const Sidebar = ({ activeSection, setActiveSection, cleanMode }) => {
  const navItems = [
    { key: 'profile', label: 'PROFILE', fKey: 'F1' },
    { key: 'logs', label: 'LOGS', fKey: 'F2' },
    { key: 'audits', label: 'AUDITS', fKey: 'F3' },
    { key: 'diagnostics', label: 'SYS_DIAG', fKey: 'F4' },
  ];

  return (
    <motion.aside 
      className={`sidebar ${cleanMode ? 'clean' : ''}`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="sidebar-avatar">
        <svg viewBox="0 0 64 64" className="avatar-icon">
          <rect x="8" y="8" width="48" height="48" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M32 16 L44 28 L44 44 L32 52 L20 44 L20 28 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="32" cy="32" r="6" fill="currentColor"/>
          <path d="M32 26 L32 20" stroke="currentColor" strokeWidth="2"/>
          <path d="M38 29 L42 25" stroke="currentColor" strokeWidth="2"/>
          <path d="M38 35 L42 39" stroke="currentColor" strokeWidth="2"/>
          <path d="M32 38 L32 44" stroke="currentColor" strokeWidth="2"/>
          <path d="M26 35 L22 39" stroke="currentColor" strokeWidth="2"/>
          <path d="M26 29 L22 25" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>
      
      <div className="sidebar-status">
        <div className="status-line">
          <span className="status-label">OPERATOR:</span>
          <span className="status-value">TheSTIGMan</span>
        </div>
        <div className="status-line">
          <span className="status-label">ROLE:</span>
          <span className="status-value">HARDENING EXPERT</span>
        </div>
        <div className="status-line">
          <span className="status-label">CLEARANCE:</span>
          <span className="status-value secure">VERIFIED</span>
        </div>
        <div className="status-indicator">
          <span className="indicator-dot" />
          <span>SYSTEM ONLINE</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-button ${activeSection === item.key ? 'active' : ''}`}
            onClick={() => setActiveSection(item.key)}
          >
            <span className="nav-fkey">[{item.fKey}]</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="compliance-badge">
          <svg viewBox="0 0 24 24" className="badge-icon">
            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-1 14l-4-4 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 8z" fill="currentColor"/>
          </svg>
          <span>NIST COMPLIANT</span>
        </div>
      </div>
    </motion.aside>
  );
};

// ==================== PROFILE SECTION ====================
const ProfileSection = ({ cleanMode }) => {
  const checkItems = [
    'USAF Aircraft Maintenance Specialist (7+ years)',
    'F-16 Avionics Systems Certified',
    'CompTIA Security+ Certified',
    'RHEL System Administrator',
    'DISA STIG Implementation Expert',
    'Ansible Automation Specialist',
  ];

  return (
    <motion.div 
      className={`section profile-section ${cleanMode ? 'clean' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-bracket">[</span>
          SECURITY CLEARANCE DOSSIER
          <span className="title-bracket">]</span>
        </h2>
        <div className="classification-stamp">VERIFIED</div>
      </div>

      <div className="dossier-content">
        <div className="dossier-photo">
          <div className="photo-frame">
            <svg viewBox="0 0 100 100" className="silhouette">
              <circle cx="50" cy="35" r="20" fill="currentColor" opacity="0.3"/>
              <ellipse cx="50" cy="85" rx="35" ry="25" fill="currentColor" opacity="0.3"/>
            </svg>
          </div>
          <div className="photo-label">OPERATOR ID: TSM-2024</div>
        </div>

        <div className="dossier-text">
          <div className="dossier-section">
            <h3 className="dossier-heading">// MISSION STATEMENT</h3>
            <p>
              Transitioning from maintaining multi-million dollar aircraft systems to 
              securing digital infrastructure. Applying the same rigorous, methodical 
              approach used on the flight line to system hardening and compliance automation.
            </p>
          </div>

          <div className="dossier-section">
            <h3 className="dossier-heading">// OPERATIONAL BACKGROUND</h3>
            <p>
              Seven years maintaining F-16 Fighting Falcon avionics systems taught me 
              that every wire, every connection, every system interaction matters. 
              A single overlooked discrepancy can ground an aircraft—or worse.
            </p>
            <p>
              In cybersecurity, the stakes are similar. A misconfigured firewall rule, 
              an unpatched vulnerability, an overly permissive access control—these are 
              the "discrepancies" I now hunt and remediate.
            </p>
          </div>

          <div className="dossier-section">
            <h3 className="dossier-heading">// CERTIFIED QUALIFICATIONS</h3>
            <ul className="qualifications-list">
              {checkItems.map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="check-mark">[x]</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="dossier-section">
            <h3 className="dossier-heading">// CORE METHODOLOGY</h3>
            <div className="methodology-grid">
              <div className="method-card">
                <div className="method-number">01</div>
                <div className="method-title">ASSESS</div>
                <div className="method-desc">Identify vulnerabilities and compliance gaps</div>
              </div>
              <div className="method-card">
                <div className="method-number">02</div>
                <div className="method-title">DOCUMENT</div>
                <div className="method-desc">Technical Orders → Runbooks & Playbooks</div>
              </div>
              <div className="method-card">
                <div className="method-number">03</div>
                <div className="method-title">REMEDIATE</div>
                <div className="method-desc">Systematic hardening with verification</div>
              </div>
              <div className="method-card">
                <div className="method-number">04</div>
                <div className="method-title">AUTOMATE</div>
                <div className="method-desc">Ansible, Python, CI/CD pipelines</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==================== LOGS SECTION ====================
const LogsSection = ({ cleanMode, setAuditorMessage }) => {
  const [expandedLog, setExpandedLog] = useState(null);

  return (
    <motion.div 
      className={`section logs-section ${cleanMode ? 'clean' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-bracket">[</span>
          INCIDENT REPORT ARCHIVE
          <span className="title-bracket">]</span>
        </h2>
        <div className="log-count">{LOGS_DATA.length} ENTRIES</div>
      </div>

      <div className="directory-listing">
        <div className="directory-header">
          <span>drwxr-xr-x</span>
          <span>stigman</span>
          <span>security</span>
          <span>/var/log/incidents/</span>
        </div>
        
        {LOGS_DATA.map((log, index) => (
          <motion.div 
            key={log.id}
            className={`log-entry ${expandedLog === log.id ? 'expanded' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setAuditorMessage(`Retrieving incident details for ${log.id}...`)}
            onMouseLeave={() => setAuditorMessage(null)}
          >
            <div 
              className="log-header"
              onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
            >
              <div className="log-id">{log.id}</div>
              <div className="log-title">{log.title}</div>
              <div className="log-date">{log.date}</div>
              <div className="log-expand-icon">{expandedLog === log.id ? '[-]' : '[+]'}</div>
            </div>
            
            <AnimatePresence>
              {expandedLog === log.id && (
                <motion.div 
                  className="log-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="log-body">
                    <p>{log.content}</p>
                    <div className="redacted-section">
                      <span className="redacted-label">CLASSIFIED INTEL:</span>
                      <span 
                        className="redacted-text"
                        title="Hover to reveal"
                      >
                        {log.redacted}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="log-footer">
        <span className="blink">█</span> END OF FILE - More entries classified
      </div>
    </motion.div>
  );
};

// ==================== AUDITS/RADAR SECTION ====================
const AuditsSection = ({ cleanMode, setAuditorMessage }) => {
  const [activeProject, setActiveProject] = useState(null);
  const [radarAngle, setRadarAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarAngle(prev => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className={`section audits-section ${cleanMode ? 'clean' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-bracket">[</span>
          THREAT DETECTION & MITIGATION
          <span className="title-bracket">]</span>
        </h2>
        <div className="radar-status">SCANNING...</div>
      </div>

      <div className="radar-container">
        <div className="radar-scope">
          <div className="radar-rings">
            <div className="radar-ring ring-1" />
            <div className="radar-ring ring-2" />
            <div className="radar-ring ring-3" />
            <div className="radar-ring ring-4" />
          </div>
          <div className="radar-crosshairs">
            <div className="crosshair-h" />
            <div className="crosshair-v" />
          </div>
          <div 
            className="radar-sweep"
            style={{ transform: `rotate(${radarAngle}deg)` }}
          />
          
          {PROJECTS_DATA.map((project) => {
            const x = 50 + (project.distance / 2) * Math.cos((project.angle - 90) * Math.PI / 180);
            const y = 50 + (project.distance / 2) * Math.sin((project.angle - 90) * Math.PI / 180);
            const isInSweep = Math.abs(radarAngle - project.angle) < 30 || Math.abs(radarAngle - project.angle + 360) < 30;
            
            return (
              <div
                key={project.id}
                className={`radar-blip ${project.cat === 'I' ? 'cat-i' : 'cat-ii'} ${isInSweep ? 'pulse' : ''} ${activeProject === project.id ? 'active' : ''}`}
                style={{ left: `${x}%`, top: `${y}%` }}
                onMouseEnter={() => {
                  setActiveProject(project.id);
                  setAuditorMessage(`Retrieving CAT ${project.cat} Audit details for ${project.name}...`);
                }}
                onMouseLeave={() => {
                  setActiveProject(null);
                  setAuditorMessage(null);
                }}
              />
            );
          })}
        </div>

        <div className="radar-legend">
          <div className="legend-item">
            <span className="legend-dot cat-i" />
            <span>CAT I - MISSION CRITICAL</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot cat-ii" />
            <span>CAT II - OPERATIONAL</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div 
            className="project-details"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {(() => {
              const project = PROJECTS_DATA.find(p => p.id === activeProject);
              return project ? (
                <>
                  <div className="project-header">
                    <span className={`project-cat cat-${project.cat.toLowerCase()}`}>
                      CAT {project.cat}
                    </span>
                    <span className="project-name">{project.name}</span>
                  </div>
                  <div className="project-desc">{project.desc}</div>
                  <div className="project-link">
                    <span className="link-icon">→</span>
                    <a href={project.link}>VIEW REMEDIATION PLAN</a>
                  </div>
                </>
              ) : null;
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {!activeProject && (
        <div className="project-placeholder">
          <span className="blink">▶</span> Hover over radar contacts to view project details
        </div>
      )}
    </motion.div>
  );
};

// ==================== DIAGNOSTICS/SKILLS SECTION ====================
const DiagnosticsSection = ({ cleanMode }) => {
  const softwareSkills = SKILLS_DATA.filter(s => s.category === 'software');
  const hardwareSkills = SKILLS_DATA.filter(s => s.category === 'hardware');
  const avgSoftware = softwareSkills.reduce((a, b) => a + b.value, 0) / softwareSkills.length;
  const avgHardware = hardwareSkills.reduce((a, b) => a + b.value, 0) / hardwareSkills.length;
  const horizonAngle = ((avgSoftware - avgHardware) / 100) * 45;

  return (
    <motion.div 
      className={`section diagnostics-section ${cleanMode ? 'clean' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="title-bracket">[</span>
          SYSTEM DIAGNOSTICS
          <span className="title-bracket">]</span>
        </h2>
        <div className="diag-status">ALL SYSTEMS NOMINAL</div>
      </div>

      <div className="diagnostics-grid">
        <div className="gauges-panel">
          <h3 className="panel-title">// CAPABILITY METRICS</h3>
          <div className="gauges-container">
            {SKILLS_DATA.map((skill, index) => (
              <motion.div 
                key={skill.name}
                className="gauge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <svg viewBox="0 0 120 120" className="gauge-svg">
                  <defs>
                    <linearGradient id={`gauge-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={PHOSPHOR_GREEN} stopOpacity="0.3" />
                      <stop offset="100%" stopColor={PHOSPHOR_GREEN} />
                    </linearGradient>
                  </defs>
                  
                  {/* Gauge background arc */}
                  <path
                    d="M 20 90 A 40 40 0 1 1 100 90"
                    fill="none"
                    stroke={PHOSPHOR_GREEN}
                    strokeWidth="3"
                    strokeOpacity="0.2"
                  />
                  
                  {/* Gauge value arc */}
                  <motion.path
                    d="M 20 90 A 40 40 0 1 1 100 90"
                    fill="none"
                    stroke={`url(#gauge-grad-${index})`}
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: skill.value / 100 * 0.75 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                  
                  {/* Tick marks */}
                  {[...Array(11)].map((_, i) => {
                    const angle = -225 + (i * 27);
                    const rad = angle * Math.PI / 180;
                    const x1 = 60 + 48 * Math.cos(rad);
                    const y1 = 60 + 48 * Math.sin(rad);
                    const x2 = 60 + 42 * Math.cos(rad);
                    const y2 = 60 + 42 * Math.sin(rad);
                    return (
                      <line
                        key={i}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={PHOSPHOR_GREEN}
                        strokeWidth={i % 5 === 0 ? 2 : 1}
                        strokeOpacity={i % 5 === 0 ? 0.8 : 0.4}
                      />
                    );
                  })}
                  
                  {/* Needle */}
                  <motion.g
                    initial={{ rotate: -135 }}
                    animate={{ rotate: -135 + (skill.value / 100 * 270) }}
                    transition={{ duration: 1, delay: index * 0.1, type: 'spring' }}
                    style={{ transformOrigin: '60px 60px' }}
                  >
                    <polygon points="60,25 57,60 60,65 63,60" fill={skill.category === 'software' ? PHOSPHOR_GREEN : CAT_II_AMBER} />
                  </motion.g>
                  
                  {/* Center dot */}
                  <circle cx="60" cy="60" r="5" fill={PHOSPHOR_GREEN} />
                  
                  {/* Value text */}
                  <text x="60" y="105" textAnchor="middle" fill={PHOSPHOR_GREEN} fontSize="14" fontFamily="monospace">
                    {skill.value}%
                  </text>
                </svg>
                <div className="gauge-label">{skill.name}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="horizon-panel">
          <h3 className="panel-title">// EXPERIENCE HORIZON</h3>
          <div className="horizon-container">
            <svg viewBox="0 0 200 200" className="horizon-svg">
              {/* Outer ring */}
              <circle cx="100" cy="100" r="90" fill="none" stroke={PHOSPHOR_GREEN} strokeWidth="2" strokeOpacity="0.3" />
              <circle cx="100" cy="100" r="70" fill="none" stroke={PHOSPHOR_GREEN} strokeWidth="1" strokeOpacity="0.2" />
              <circle cx="100" cy="100" r="50" fill="none" stroke={PHOSPHOR_GREEN} strokeWidth="1" strokeOpacity="0.2" />
              
              {/* Ground (Hardware) */}
              <motion.g
                initial={{ rotate: 0 }}
                animate={{ rotate: horizonAngle }}
                transition={{ duration: 1.5, type: 'spring' }}
                style={{ transformOrigin: '100px 100px' }}
              >
                <clipPath id="ground-clip">
                  <rect x="0" y="100" width="200" height="100" />
                </clipPath>
                <circle cx="100" cy="100" r="85" fill={CAT_II_AMBER} fillOpacity="0.15" clipPath="url(#ground-clip)" />
                
                {/* Horizon line */}
                <line x1="10" y1="100" x2="190" y2="100" stroke={PHOSPHOR_GREEN} strokeWidth="2" />
                
                {/* Pitch lines */}
                {[-20, -10, 10, 20].map(offset => (
                  <g key={offset}>
                    <line 
                      x1="70" y1={100 - offset * 2} x2="130" y2={100 - offset * 2} 
                      stroke={PHOSPHOR_GREEN} 
                      strokeWidth="1"
                      strokeOpacity="0.5"
                    />
                    <text 
                      x="135" y={100 - offset * 2 + 4} 
                      fill={PHOSPHOR_GREEN} 
                      fontSize="8"
                      opacity="0.7"
                    >
                      {offset > 0 ? '+' : ''}{offset}°
                    </text>
                  </g>
                ))}
              </motion.g>
              
              {/* Aircraft symbol (fixed) */}
              <g>
                <line x1="60" y1="100" x2="85" y2="100" stroke={COMPLIANCE_WHITE} strokeWidth="3" />
                <line x1="115" y1="100" x2="140" y2="100" stroke={COMPLIANCE_WHITE} strokeWidth="3" />
                <circle cx="100" cy="100" r="4" fill="none" stroke={COMPLIANCE_WHITE} strokeWidth="2" />
                <line x1="100" y1="96" x2="100" y2="85" stroke={COMPLIANCE_WHITE} strokeWidth="2" />
              </g>
              
              {/* Tick marks */}
              {[...Array(36)].map((_, i) => {
                const angle = i * 10;
                const rad = angle * Math.PI / 180;
                const isMajor = i % 9 === 0;
                const x1 = 100 + 90 * Math.cos(rad);
                const y1 = 100 + 90 * Math.sin(rad);
                const x2 = 100 + (isMajor ? 80 : 85) * Math.cos(rad);
                const y2 = 100 + (isMajor ? 80 : 85) * Math.sin(rad);
                return (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={PHOSPHOR_GREEN}
                    strokeWidth={isMajor ? 2 : 1}
                    strokeOpacity={isMajor ? 0.8 : 0.3}
                  />
                );
              })}
            </svg>
            
            <div className="horizon-labels">
              <div className="horizon-label top">
                <span className="label-icon">☁</span>
                <span>SOFTWARE SECURITY</span>
                <span className="label-value">{avgSoftware.toFixed(0)}%</span>
              </div>
              <div className="horizon-label bottom">
                <span className="label-icon">⚙</span>
                <span>HARDWARE EXPERTISE</span>
                <span className="label-value">{avgHardware.toFixed(0)}%</span>
              </div>
            </div>
          </div>
          
          <div className="horizon-analysis">
            <div className="analysis-title">BALANCE ASSESSMENT:</div>
            <div className="analysis-text">
              {Math.abs(horizonAngle) < 5 
                ? 'Optimal balance between hardware and software domains.'
                : horizonAngle > 0 
                  ? 'Slight bias toward software security expertise.'
                  : 'Strong foundation in hardware systems.'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==================== AI AUDITOR ====================
const AIAuditor = ({ message, cleanMode }) => {
  const [idleText, setIdleText] = useState('Continuous monitoring active. System compliant.');
  
  useEffect(() => {
    if (!message) {
      const messages = [
        'Continuous monitoring active. System compliant.',
        'Scanning for configuration drift... None detected.',
        'Verifying STIG compliance status... PASS',
        'Checking certificate expiration... All valid.',
        'Monitoring network anomalies... Clear.',
      ];
      const interval = setInterval(() => {
        setIdleText(messages[Math.floor(Math.random() * messages.length)]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [message]);

  if (cleanMode) return null;

  return (
    <motion.div 
      className="ai-auditor"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="auditor-icon">
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
        </svg>
      </div>
      <div className="auditor-label">AI_AUDITOR:</div>
      <div className="auditor-message">
        {message || idleText}
        <span className="auditor-cursor">_</span>
      </div>
    </motion.div>
  );
};

// ==================== RECRUITER MODE ====================
const RecruiterOverride = ({ cleanMode, setCleanMode }) => {
  return (
    <button 
      className={`recruiter-override ${cleanMode ? 'active' : ''}`}
      onClick={() => setCleanMode(!cleanMode)}
      title={cleanMode ? 'Enable CRT Mode' : 'Recruiter Override: Clean Mode'}
    >
      <span className="override-icon">
        {cleanMode ? '⬤' : '◯'}
      </span>
      <span className="override-label">
        {cleanMode ? 'CRT MODE' : 'CLEAN VIEW'}
      </span>
    </button>
  );
};

// ==================== MAIN APP ====================
export default function App() {
  const [booted, setBooted] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [cleanMode, setCleanMode] = useState(false);
  const [auditorMessage, setAuditorMessage] = useState(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'F1') { e.preventDefault(); setActiveSection('profile'); }
      if (e.key === 'F2') { e.preventDefault(); setActiveSection('logs'); }
      if (e.key === 'F3') { e.preventDefault(); setActiveSection('audits'); }
      if (e.key === 'F4') { e.preventDefault(); setActiveSection('diagnostics'); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <ProfileSection cleanMode={cleanMode} />;
      case 'logs': return <LogsSection cleanMode={cleanMode} setAuditorMessage={setAuditorMessage} />;
      case 'audits': return <AuditsSection cleanMode={cleanMode} setAuditorMessage={setAuditorMessage} />;
      case 'diagnostics': return <DiagnosticsSection cleanMode={cleanMode} />;
      default: return <ProfileSection cleanMode={cleanMode} />;
    }
  };

  return (
    <CRTLayout cleanMode={cleanMode}>
      <RecruiterOverride cleanMode={cleanMode} setCleanMode={setCleanMode} />
      
      {!booted ? (
        <BootSequence onComplete={() => setBooted(true)} />
      ) : (
        <motion.div 
          className={`dashboard ${cleanMode ? 'clean' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Sidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
            cleanMode={cleanMode}
          />
          <main className="main-terminal">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </main>
        </motion.div>
      )}
      
      {booted && <AIAuditor message={auditorMessage} cleanMode={cleanMode} />}
    </CRTLayout>
  );
}

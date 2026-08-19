export const profile = {
  name: 'GAJENDRA RAJPUT',
  shortName: 'Gajendra Rajput',
  initials: 'GR',
  title: 'Senior Network Engineer',
  level: 'NOC Tier 2/3',
  tagline: 'I design, troubleshoot and operate enterprise networks where reliability matters.',
  summary:
    'Senior Network Engineer specializing in enterprise networking, infrastructure operations, and network security. Operating at the senior level of NOC operations — leading incident response, deep packet analysis, and platform lifecycle management.',
  email: 'gajendrarjpt@gmail.com',
  location: 'India',
  availability: 'Available for Senior Engineering Roles',
  focus: [
    'Enterprise Networking',
    'Network Troubleshooting',
    'Network Security',
    'Monitoring & Telemetry',
    'Infrastructure Reliability',
    'NOC Tier 2/3 Operations'
  ],
  resume: {
    available: true,
    url: '/resume/Gajendra_Rajput_Resume.pdf',
  }
};

export const highlights = [
  { value: '4+ YEARS', label: 'NOC & NETWORK OPERATIONS' },
  { value: 'TIER 2/3', label: 'SENIOR ENGINEERING LEVEL' },
  { value: 'ENTERPRISE', label: 'ROUTING, SWITCHING & WLAN' },
  { value: 'SECURITY', label: 'MULTI-VENDOR FIREWALLS & ACLs' }
];

export const careerStages = [
  {
    index: '01',
    label: 'L1 NOC',
    title: 'Network Support Engineer',
    company: 'Mannschaft IT Pvt Ltd',
    period: '2022 — 2023',
    status: 'completed',
    description: 'First-line triage, troubleshooting and SLA ticket lifecycle management.'
  },
  {
    index: '02',
    label: 'TIER 2',
    title: 'Network Administrator',
    company: 'Semantic Technologies Pvt Ltd',
    period: '2023 — 2025',
    status: 'completed',
    description: 'Day-to-day enterprise network operations across Cisco, Aruba, Palo Alto, Sophos & Fortinet.'
  },
  {
    index: '03',
    label: 'TIER 2/3',
    title: 'Senior Network Engineer',
    company: 'PHN Technology Pvt Ltd',
    period: '2025 — PRESENT',
    status: 'current',
    description: 'Senior NOC operations — L2/L3 escalation, P1/P2 bridges, firmware lifecycles & security audits.'
  }
];

export const experience = [
  {
    id: 'senior-network-engineer',
    role: 'Senior Network Engineer',
    level: 'NOC Tier 2/3',
    company: 'PHN Technology Pvt Ltd',
    period: '2025 — PRESENT',
    periodLabel: 'December 2025 — Present',
    current: true,
    summary:
      'Operating at the senior level of NOC operations — leading incident response, deep troubleshooting, and network reliability across the enterprise estate.',
    highlights: [
      {
        action: 'L2/L3 Incident Resolution',
        tech: 'Routing · Switching · VPN · WLAN',
        outcome: 'Escalated beyond Tier 1, resolved at senior NOC level'
      },
      {
        action: 'Deep Packet & Log Analysis',
        tech: 'Wireshark · Syslog · Telemetry',
        outcome: 'Evidence correlated to drive RCA/PIR and CAPA'
      },
      {
        action: 'Firmware & Config Lifecycle',
        tech: 'Cisco IOS · Gold Templates',
        outcome: 'Upgrade cycles with compatibility checks & rollback plans'
      }
    ],
    responsibilities: [
      'Tier 1 escalation support and L2/L3 incident resolution',
      'Routing, switching, VPN and WLAN troubleshooting',
      'P1/P2 incident bridges and stakeholder communication',
      'Wireshark and syslog analysis with telemetry correlation',
      'RCA/PIR and CAPA documentation',
      'IOS/firmware upgrade cycles, compatibility checks and rollback planning',
      'Configuration audits and gold-template compliance',
      'Device inventory and configuration backups',
      'Dell PowerVault administration',
      'Nessus vulnerability scanning and security investigations',
      'Mentoring junior engineers'
    ]
  },
  {
    id: 'network-administrator',
    role: 'Network Administrator',
    level: 'NOC Tier 2',
    company: 'Semantic Technologies Pvt Ltd',
    period: '2023 — 2025',
    periodLabel: 'March 2023 — December 2025',
    current: false,
    summary:
      'Owned day-to-day enterprise network operations — configuration, security controls, monitoring and documentation across multi-vendor platforms.',
    highlights: [
      {
        action: 'Enterprise Network Operations',
        tech: 'VLAN · DHCP · Routing · Switching',
        outcome: 'Multi-vendor administration across Cisco, Aruba, Palo Alto, Sophos & Fortinet'
      },
      {
        action: 'Security Operations',
        tech: 'ACL · IPS/IDS · VPN · Nessus',
        outcome: 'Access control and vulnerability scanning across the estate'
      },
      {
        action: 'Infrastructure Reliability',
        tech: 'Firmware Updates · Backups · Monitoring',
        outcome: 'Operations documented through runbooks and SOPs'
      }
    ],
    responsibilities: [
      'Enterprise network operations: VLAN, DHCP, routing and switching',
      'Cisco switch stacks: STP and EtherChannel configuration',
      'Cisco, Aruba, Palo Alto, Sophos and Fortinet platform administration',
      'VPN and firewall ACL management',
      'IPS/IDS and Nessus security controls',
      'Firmware updates, backup/restore and monitoring',
      'Wireshark analysis and VMware networking',
      'Documentation, runbooks and SOPs'
    ]
  },
  {
    id: 'network-support-engineer',
    role: 'Network Support Engineer',
    level: 'L1 NOC',
    company: 'Mannschaft IT Pvt Ltd',
    period: '2022 — 2023',
    periodLabel: 'February 2022 — March 2023',
    current: false,
    summary:
      'Started in NOC operations — first-line triage, troubleshooting and ticket management that built the foundation of a networking career.',
    highlights: [
      {
        action: 'First-Line Incident Triage',
        tech: 'Cisco Routers · Switches · APs',
        outcome: 'SLA-aware ticket lifecycle and escalation'
      },
      {
        action: 'L1/L2 Support',
        tech: 'Routing · Switching · VPN',
        outcome: 'Clear handover documentation for every engagement'
      }
    ],
    responsibilities: [
      'L1/L2 support across routing, switching and VPN',
      'Cisco routers, switches and access points',
      'Ticket lifecycle management and SLA escalation',
      'Incident triage and impact assessment',
      'Handover documentation'
    ]
  }
];

export const expertiseCategories = [
  {
    id: 'routing-switching',
    number: '01',
    title: 'ROUTING & SWITCHING',
    shortName: 'Routing & Switching',
    description: 'Enterprise switching topologies, loop prevention, VLAN design, and routing protocols across Cisco infrastructure.',
    items: ['VLAN', 'STP', 'VTP', 'EtherChannel', 'OSPF', 'EIGRP', 'BGP', 'DHCP', 'NAT', 'QoS'],
    metrics: 'Multi-site VLAN & OSPF/EIGRP topologies'
  },
  {
    id: 'wireless',
    number: '02',
    title: 'WIRELESS NETWORKING',
    shortName: 'Wireless',
    description: 'Cisco and Aruba WLAN operations, enterprise access point management, 802.1X authentication, and roaming troubleshooting.',
    items: ['Cisco WLAN', 'Aruba WLAN', 'AP Management', 'WPA2/WPA3', '802.1X', 'Roaming Triage'],
    metrics: 'Enterprise wireless & radius auth'
  },
  {
    id: 'network-security',
    number: '03',
    title: 'NETWORK SECURITY',
    shortName: 'Network Security',
    description: 'Multi-vendor firewall platform administration, access control lists, IPS/IDS controls, VPN tunnels, and vulnerability scanning.',
    items: ['Palo Alto', 'Fortinet', 'Sophos', 'ACL', 'IPS/IDS', 'VPN', 'Nessus'],
    metrics: 'Firewall rulesets & IPS/IDS enforcement'
  },
  {
    id: 'monitoring',
    number: '04',
    title: 'MONITORING & TELEMETRY',
    shortName: 'Monitoring',
    description: 'End-to-end network visibility through packet captures, syslog correlation, SNMP telemetry, and structured incident triage.',
    items: ['Wireshark', 'SolarWinds', 'Syslog', 'Telemetry', 'Packet Analysis', 'Incident Triage'],
    metrics: 'Sub-second capture analysis & syslog triage'
  },
  {
    id: 'infrastructure',
    number: '05',
    title: 'INFRASTRUCTURE & STORAGE',
    shortName: 'Infrastructure',
    description: 'Platform lifecycle, configuration backups, VMware virtual networking, Dell PowerVault administration, and operational SOPs.',
    items: ['VMware Networking', 'Dell PowerVault', 'Config Management', 'Firmware Lifecycle', 'Backup/Restore', 'Network SOPs'],
    metrics: 'Zero-data-loss backup & firmware lifecycle'
  },
  {
    id: 'automation-engineering',
    number: '06',
    title: 'AUTOMATION & ENGINEERING',
    shortName: 'Automation',
    description: 'Engineering discipline applied to operational workflows — gold-template compliance today, planned Python/Ansible lab automation.',
    items: ['IOS Upgrade Cycles', 'Compatibility Checks', 'Rollback Plans', 'Gold Templates', 'Config Audits', 'Planned Automation Labs'],
    metrics: 'Standardized gold-template deployment'
  }
];

export const networkLabDomains = [
  {
    id: 'routing',
    number: '01',
    label: 'ROUTING DOMAIN',
    title: 'Cisco Enterprise Core Routing Architecture',
    summary: 'Multi-site OSPF Area 0 backbone, BGP Autonomous System AS65000 edge peering, MPLS WAN clouds, and active-active failover routes.',
    items: ['OSPF Area 0', 'BGP AS65000', 'MPLS WAN', 'Cisco Catalyst 9600', 'ASR 1000s', 'NAT / QoS'],
    status: 'MNC SCHEMATIC ACTIVE',
    diagramImage: '/diagrams/routing.webp',
    nodes: [
      { id: 'r1', label: 'CORE-01 (Catalyst 9600)', x: 25, y: 25, type: 'router' },
      { id: 'r2', label: 'CORE-02 (Catalyst 9600)', x: 75, y: 25, type: 'gateway' },
      { id: 'r3', label: 'EDGE-01 (ASR 1000s)', x: 25, y: 70, type: 'router' },
      { id: 'r4', label: 'EDGE-02 (ASR 1000s)', x: 75, y: 70, type: 'node' }
    ],
    connections: [
      { from: 'r1', to: 'r2', signal: true },
      { from: 'r1', to: 'r3', signal: true },
      { from: 'r2', to: 'r4', signal: true },
      { from: 'r3', to: 'r4', signal: true }
    ]
  },
  {
    id: 'switching',
    number: '02',
    label: 'SWITCHING DOMAIN',
    title: 'Enterprise L2/L3 Multi-Tier Switch Stack Topology',
    summary: 'StackWise Virtual Core stacks, Spanning Tree RSTP Root Bridge, LACP EtherChannel trunks (802.3ad), and isolated VLAN trunking.',
    items: ['Catalyst Switch Stack', 'StackWise Virtual', 'RSTP Root Bridge', 'LACP (802.3ad)', 'VLAN 10/20/30'],
    status: 'MNC SCHEMATIC ACTIVE',
    diagramImage: '/diagrams/switching.webp',
    nodes: [
      { id: 's1', label: 'CORE-SW-STACK-01', x: 30, y: 25, type: 'switch' },
      { id: 's2', label: 'CORE-SW-STACK-02', x: 70, y: 25, type: 'switch' },
      { id: 's3', label: 'SW-ACC-01 (Access)', x: 20, y: 75, type: 'switch' },
      { id: 's4', label: 'SW-ACC-04 (Access)', x: 80, y: 75, type: 'node' }
    ],
    connections: [
      { from: 's1', to: 's2', signal: true },
      { from: 's1', to: 's3', signal: true },
      { from: 's2', to: 's4', signal: true },
      { from: 's3', to: 's4', signal: false }
    ]
  },
  {
    id: 'security',
    number: '03',
    label: 'SECURITY DOMAIN',
    title: 'MNC Multi-Vendor Firewall & Security Zone Architecture',
    summary: 'Palo Alto Networks PA-3420 HA Pair, Fortinet FG-600F Edge Gateway, Sophos VPN Concentrator, Isolated DMZ, and Nessus Scanner.',
    items: ['Palo Alto PA-3420', 'Fortinet FG-600F', 'Sophos VPN', 'Nessus Professional', 'IPsec Tunnels', 'DMZ Zone'],
    status: 'MNC SCHEMATIC ACTIVE',
    diagramImage: '/diagrams/security.webp',
    nodes: [
      { id: 'sec1', label: 'PALO ALTO PA-3420 HA', x: 50, y: 40, type: 'firewall' },
      { id: 'sec2', label: 'FORTINET EDGE FG-600F', x: 30, y: 20, type: 'firewall' },
      { id: 'sec3', label: 'DMZ ZONE SERVERS', x: 70, y: 20, type: 'vpn' },
      { id: 'sec4', label: 'NESSUS SCANNER', x: 70, y: 75, type: 'scanner' }
    ],
    connections: [
      { from: 'sec1', to: 'sec2', signal: true },
      { from: 'sec1', to: 'sec3', signal: true },
      { from: 'sec1', to: 'sec4', signal: true },
      { from: 'sec2', to: 'sec3', signal: false }
    ]
  },
  {
    id: 'wireless',
    number: '04',
    label: 'WIRELESS DOMAIN',
    title: 'MNC Enterprise WLAN Infrastructure & 802.1X Auth',
    summary: 'Cisco Catalyst 9800 WLC Active/Standby Cluster, Aruba Mobility Conductor, Cisco ISE RADIUS Auth, Wi-Fi 6E Access Points, and Client Roaming.',
    items: ['Cisco WLC 9800', 'Aruba Mobility Conductor', 'Cisco ISE RADIUS', 'Cisco AP 9120', 'Aruba AP 505', '802.1X WPA3'],
    status: 'MNC SCHEMATIC ACTIVE',
    diagramImage: '/diagrams/wireless.webp',
    nodes: [
      { id: 'w1', label: 'CISCO WLC 9800-40', x: 50, y: 20, type: 'controller' },
      { id: 'w2', label: 'ARUBA CONDUCTOR', x: 80, y: 35, type: 'ap' },
      { id: 'w3', label: 'CISCO ISE (802.1X)', x: 20, y: 35, type: 'ap' },
      { id: 'w4', label: 'WAP AP 9120 CLUSTER', x: 50, y: 75, type: 'auth' }
    ],
    connections: [
      { from: 'w1', to: 'w2', signal: true },
      { from: 'w1', to: 'w3', signal: true },
      { from: 'w1', to: 'w4', signal: true },
      { from: 'w3', to: 'w4', signal: false }
    ]
  },
  {
    id: 'infrastructure',
    number: '05',
    label: 'INFRASTRUCTURE DOMAIN',
    title: 'VMware Virtual Networking & Dell PowerVault SAN Architecture',
    summary: 'ESXi Host Clusters, VMware vDS Virtual Distributed Switch, 16Gb Fiber Channel Fabrics, Dell PowerVault SAN Array, and Immutable Backup Vaults.',
    items: ['ESXi Cluster', 'VMware vDS', 'Dell PowerVault SAN', '16Gb Fiber Channel', 'Veeam Backup', 'Firmware Lifecycle'],
    status: 'MNC SCHEMATIC ACTIVE',
    diagramImage: '/diagrams/infrastructure.webp',
    nodes: [
      { id: 'i1', label: 'ESXI HOST CLUSTER', x: 25, y: 35, type: 'hypervisor' },
      { id: 'i2', label: 'DELL POWERVAULT SAN', x: 75, y: 35, type: 'storage' },
      { id: 'i3', label: 'VMWARE vDS SWITCH', x: 25, y: 75, type: 'vswitch' },
      { id: 'i4', label: 'VEEAM BACKUP VAULT', x: 75, y: 75, type: 'backup' }
    ],
    connections: [
      { from: 'i1', to: 'i2', signal: true },
      { from: 'i1', to: 'i3', signal: true },
      { from: 'i2', to: 'i4', signal: true },
      { from: 'i3', to: 'i4', signal: false }
    ]
  },
  {
    id: 'monitoring',
    number: '06',
    label: 'TELEMETRY DOMAIN',
    title: 'SolarWinds NPM & Wireshark NOC Telemetry Dashboard',
    summary: 'SPAN/RSPAN Port Mirroring flows, Wireshark Deep Packet Capture, Syslog Log Ingestion, and SolarWinds Network Performance Monitor.',
    items: ['SolarWinds NPM', 'Wireshark Analyzer', 'Syslog Collector', 'SPAN Port Mirror', 'SNMP Telemetry', 'Packet Capture'],
    status: 'MNC SCHEMATIC ACTIVE',
    diagramImage: '/diagrams/monitoring.webp',
    nodes: [
      { id: 'm1', label: 'SPAN MIRROR PORT', x: 25, y: 25, type: 'capture' },
      { id: 'm2', label: 'WIRESHARK ANALYZER', x: 75, y: 25, type: 'analyzer' },
      { id: 'm3', label: 'SYSLOG SERVER', x: 25, y: 75, type: 'syslog' },
      { id: 'm4', label: 'SOLARWINDS NPM', x: 75, y: 75, type: 'npm' }
    ],
    connections: [
      { from: 'm1', to: 'm2', signal: true },
      { from: 'm1', to: 'm3', signal: true },
      { from: 'm2', to: 'm4', signal: true },
      { from: 'm3', to: 'm4', signal: true }
    ]
  }
];

export const engineeringNotes = [
  {
    id: 'incident-resolution',
    index: '01',
    title: 'Network Incident Resolution & RCA',
    category: 'NOC OPERATIONS',
    problem: 'P1/P2 enterprise incidents requiring L2/L3 escalation beyond Tier 1 triage.',
    approach: 'Bridge coordination, evidence correlation across syslog logs, telemetry captures, and packet analysis before executing configuration changes.',
    tools: ['Wireshark', 'Syslog', 'Telemetry', 'Cisco IOS'],
    outcome: 'Service rapidly restored with complete RCA/PIR documentation and CAPA follow-through to prevent recurrence.'
  },
  {
    id: 'firmware-lifecycle',
    index: '02',
    title: 'Firmware Lifecycle & Rollback',
    category: 'INFRASTRUCTURE',
    problem: 'IOS and firmware upgrades across heterogeneous multi-vendor switch and router estates.',
    approach: 'Pre-flight compatibility verification, gold-template compliance audits, staged rollout maintenance windows, and documented rollback plans.',
    tools: ['Cisco IOS', 'Gold Templates', 'Config Backups'],
    outcome: 'Seamless upgrade cycles executed with complete audit trail and zero unexpected downtime.'
  },
  {
    id: 'security-operations',
    index: '03',
    title: 'Security Operations & Firewall Audits',
    category: 'NETWORK SECURITY',
    problem: 'Multi-vendor firewall policies, IPsec VPN tunnel instability, and vulnerability exposure.',
    approach: 'ACL review and cleanup, scheduled Nessus scanning cycles, and coordinated remediation with security stakeholders.',
    tools: ['Palo Alto', 'Fortinet', 'Sophos', 'Nessus', 'IPsec VPN'],
    outcome: 'Hardened access control maintained with documented security investigation reports.'
  },
  {
    id: 'infrastructure-reliability',
    index: '04',
    title: 'Infrastructure Reliability & Storage',
    category: 'ENTERPRISE SYSTEMS',
    problem: 'Complex platform administration spanning VMware virtual networking, SAN storage, and device inventories.',
    approach: 'Automated configuration backup schedules, inventory audits, and operational runbook standardization.',
    tools: ['VMware vDS', 'Dell PowerVault', 'SolarWinds'],
    outcome: 'High-availability operations maintained with clear SOPs and asset control.'
  },
  {
    id: 'automation-lab',
    index: '05',
    title: 'Operational Discipline & Automation Lab',
    category: 'ENGINEERING PRACTICE',
    problem: 'Repetitive operational tasks that benefit from structured template engineering and scripting.',
    approach: 'Rigorous production standards today — gold templates, configuration backups — combined with planned Python/Ansible lab automation.',
    tools: ['Config Audits', 'Gold Templates', 'Python Labs'],
    outcome: 'Operational consistency established across all tier 2/3 engineering activities.'
  }
];

export const featuredProjects = [
  {
    id: 'plantrx',
    name: 'PlantRx',
    label: 'INDEPENDENT ENGINEERING PROJECT',
    category: 'AI-Powered Web Application',
    summary: 'Full-stack AI-powered plant diagnosis web application built with React, Vite, Tailwind CSS, and Google Gemini APIs.',
    description: 'An independent project demonstrating end-to-end product design and software engineering capability. Users capture or upload a plant photo, and the application identifies diagnoses, health metrics, and customized care guidelines using multimodal AI.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Google Gemini API', 'Vercel', 'Web APIs'],
    liveUrl: 'https://plantrx-gamma.vercel.app',
    repoUrl: 'https://github.com/gajendrarjpt/plantrx',
    note: 'Independent project — demonstrates full-stack product capability alongside network engineering.'
  }
];

export const certifications = [
  {
    id: 'ccna',
    name: 'CCNA',
    fullName: 'Cisco Certified Network Associate',
    issuer: 'Cisco Systems',
    status: 'VERIFIED CERTIFIED',
    badgeTone: 'blue'
  },
  {
    id: 'ceh',
    name: 'CEH v12',
    fullName: 'Certified Ethical Hacker v12',
    issuer: 'EC-Council',
    status: 'VERIFIED CERTIFIED',
    badgeTone: 'blue'
  },
  {
    id: 'fortinet-nse3',
    name: 'Fortinet NSE 3',
    fullName: 'Fortinet Network Security Expert 3',
    issuer: 'Fortinet',
    status: 'VERIFIED CERTIFIED',
    badgeTone: 'blue'
  },
  {
    id: 'ccnp',
    name: 'CCNP Enterprise',
    fullName: 'Cisco Certified Network Professional — Enterprise',
    issuer: 'Cisco Systems',
    status: 'IN PROGRESS',
    badgeTone: 'graphite'
  }
];

export const education = [
  {
    degree: 'B.E. Mechanical Engineering',
    institution: 'Amravati University',
    year: '2022'
  },
  {
    degree: 'Diploma in Mechanical Engineering',
    institution: 'MSBTE Mumbai',
    year: '2019'
  }
];

export const socials = {
  linkedin: {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/gajendra-rajput-19a87b261/',
    username: 'gajendra-rajput-19a87b261'
  },
  github: {
    label: 'GitHub',
    url: 'https://github.com/gajendrarjpt',
    username: 'gajendrarjpt'
  },
  email: {
    label: 'Email',
    url: 'mailto:gajendrarjpt@gmail.com',
    address: 'gajendrarjpt@gmail.com'
  },
  youtube: {
    label: 'YouTube',
    url: 'https://www.youtube.com/@Artwork.Productions'
  },
  instagram: {
    label: 'Instagram',
    url: 'https://www.instagram.com/_gajendra.______/'
  }
};

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
    tagline: 'LEARNING TO DETECT THE SIGNAL',
    title: 'Network Support Engineer',
    company: 'Mannschaft IT Pvt Ltd',
    period: '2022 — 2023',
    status: 'completed',
    scope: 'First-line alarm triage, ticket isolation, 24/7 solar telemetry, and strict SLA response.',
    tools: ['Ping / Traceroute', 'ServiceNow', 'Cisco CLI', 'Syslog Ingestion'],
    topologyState: 'perimeter-inbound'
  },
  {
    index: '02',
    label: 'TIER 2',
    tagline: 'LEARNING TO ISOLATE THE FAILURE',
    title: 'Network Administrator',
    company: 'Semantic Technologies Pvt Ltd',
    period: '2023 — 2025',
    status: 'completed',
    scope: 'Multi-vendor firewall policies (Palo Alto, Fortinet, Sophos), VLAN trunks, RSTP root bridge tuning, and Aruba WLAN.',
    tools: ['Palo Alto PA-3220', 'FortiGate', 'Sophos XG', 'Cisco Catalyst STP', 'Aruba WLAN', 'Nessus'],
    topologyState: 'core-distribution'
  },
  {
    index: '03',
    label: 'TIER 2/3',
    tagline: 'LEARNING TO OWN THE INCIDENT',
    title: 'Senior Network Engineer',
    company: 'PHN Technology Pvt Ltd',
    period: '2025 — PRESENT',
    status: 'current',
    scope: 'Directing P1/P2 technical incident bridges, deep Wireshark telemetry, firmware upgrade lifecycles, and formal CAPA/RCA post-mortems.',
    tools: ['Wireshark Deep PCAP', 'BGP Convergence', 'SolarWinds NPM', 'Dell PowerVault SAN', 'VMware vDS', 'CAPA RCA'],
    topologyState: 'enterprise-backbone'
  }
];

// The Signature Scroll Sequence: "Follow the Packet"
export const packetJourneyStages = [
  {
    id: 'wan-ingress',
    step: '01',
    nodeName: 'WAN INGRESS // THE UNTRUSTED BORDER',
    device: 'Edge BGP Provider (AS65001)',
    layer: 'Layer 3 — Routing & Transit',
    description: 'An inbound 1500-byte TLS 1.3 packet arrives over the 10 Gbps fiber WAN link. BGP routes the prefix toward edge interface GigabitEthernet0/0/1.',
    telemetry: 'IP: 203.0.113.44 → 10.0.10.50 | TTL: 64 | MSS: 1460 | RTT: 0.82ms',
    cliSnippet: 'R1# show ip bgp 10.0.10.0/24\nBGP routing table entry for 10.0.10.0/24, version 14\nPaths: (1 available, best #1, table default)\n  65001 64512\n    203.0.113.1 from 203.0.113.1 (192.168.1.1)\n      Origin IGP, metric 0, localpref 100, valid, external, best',
    status: 'TRANSITING',
    statusTone: 'blue'
  },
  {
    id: 'edge-router',
    step: '02',
    nodeName: 'EDGE ROUTER // ROUTE LOOKUP & NAT',
    device: 'Cisco ISR 4451-X',
    layer: 'Layer 3 — Forwarding Information Base (FIB)',
    description: 'Hardware CEF lookup determines the egress next-hop. OSPF Cost metric 1 evaluates link health; packet is forwarded over internal transit VLAN.',
    telemetry: 'CEF FIB Lookup: FAST-SWITCHED | Next-Hop: 192.168.1.2 via Gi0/0/1',
    cliSnippet: 'R1# show ip cef 10.0.10.50 detail\n10.0.10.50/32, epoch 2, flags [rib defined val], refcount 5, per-destination sharing\n  attached to GigabitEthernet0/0/1, next hop 192.168.1.2\n  valid adjacency, rewrite: 001A2B3C4D5E001A2B3C4D5F0800',
    status: 'FORWARDED',
    statusTone: 'blue'
  },
  {
    id: 'firewall-inspection',
    step: '03',
    nodeName: 'SECURITY PERIMETER // DEEP PACKET INSPECTION',
    device: 'Palo Alto PA-3220 (PAN-OS)',
    layer: 'Layer 7 — Next-Gen Security & App-ID',
    description: 'Stateful session evaluation: Zone UNTRUST to TRUST. App-ID verifies legitimate TLS payload; IPS/Antivirus engine verifies zero malicious signatures before policy approval.',
    telemetry: 'Zone: UNTRUST_WAN → TRUST_CORP | App: ssl/https | Rule: ALLOW_CORP_SERVICES | Action: ALLOW',
    cliSnippet: 'admin@PA-3220> show session id 49102\nSession 49102: 203.0.113.44[54102] -> 10.0.10.50[443]\n  proto: 6, state: ACTIVE, type: FLOW, flags: 0x80004000\n  application: ssl, rule: ALLOW_CORP_SERVICES\n  ingress: ethernet1/1, egress: ethernet1/2',
    status: 'VERIFIED SECURE',
    statusTone: 'emerald'
  },
  {
    id: 'core-switch',
    step: '04',
    nodeName: 'CORE SWITCHING // 802.1Q VLAN & RSTP',
    device: 'Cisco Catalyst 9300 Stack',
    layer: 'Layer 2/3 — Multi-Chassis Stacking Fabric',
    description: 'Frame encapsulated with 802.1Q tag VLAN 10. Hardware TCAM executes line-rate switching across the 480 Gbps StackWise ring with zero micro-burst discards.',
    telemetry: 'VLAN: 10 (SERVERS) | Port: Te1/1/1 SFP+ | Priority: RSTP ROOT 4096 | Cost: 4',
    cliSnippet: 'SW1# show mac address-table address 001a.a12b.4450\n          Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----\n  10    001a.a12b.4450    DYNAMIC     Te1/1/1\nTotal Mac Addresses for this criterion: 1',
    status: 'SWITCHED',
    statusTone: 'emerald'
  },
  {
    id: 'endpoint-server',
    step: '05',
    nodeName: 'DESTINATION REACHED // APPLICATION RECORD',
    device: 'Enterprise Data Center SAN / VMware vDS',
    layer: 'Layer 4-7 — Socket Handshake & Transmission',
    description: 'TCP ACK received. TLS session completes handshake; verified packet payload commits to database storage array over 16Gb Fiber Channel fabric.',
    telemetry: 'Socket: ESTABLISHED | TCP Window: 65535 | RTT: 0.84ms | Jitter: 0.02ms',
    cliSnippet: 'SRV1:~$ sudo ss -t -i -a dst 203.0.113.44\nState      Recv-Q Send-Q   Local Address:Port   Peer Address:Port\nESTAB      0      0        10.0.10.50:443       203.0.113.44:54102\n     rtt:0.84/0.02 rto:200 cwnd:10 ssthresh:7 bytes_acked:1460',
    status: 'DELIVERED',
    statusTone: 'emerald'
  },
  {
    id: 'the-incident',
    step: '06',
    nodeName: 'THE INCIDENT // UNEXPECTED FIBER CUT & LOOP',
    device: 'Primary Trunk Te1/1/1 Link State DOWN',
    layer: 'Incident Escalation — High-Priority Outage',
    description: 'Physical fiber severance triggers link flapping. Secondary switch misconfiguration creates momentary BPDU flood; NOC telemetry triggers P1 bridge alarm.',
    telemetry: 'ALARM: CRITICAL P1 | Primary Link: DOWN | Packet Loss Spike: DETECTED',
    cliSnippet: '%LINK-3-UPDOWN: Interface TenGigabitEthernet1/1/1, changed state to down\n%LINEPROTO-5-UPDOWN: Line protocol on Interface TenGigabitEthernet1/1/1, changed state to down\n%SPANTREE-2-BLOCK_BPDUGUARD: Received BPDU on port Gi1/0/2 with BPDU Guard enabled. Disabling port.',
    status: 'P1 ESCALATION',
    statusTone: 'rose'
  },
  {
    id: 'the-resolution',
    step: '07',
    nodeName: 'THE RESOLUTION // ROOT-CAUSE ISOLATION & RESTORATION',
    device: 'Senior NOC Incident Command (Gajendra Rajput)',
    layer: 'Engineering Leadership — Systematic Triage & CAPA',
    description: 'Correlated syslog and Wireshark traces to identify the root cause within minutes. Executed deterministic failover to secondary SFP+ trunk, resolved BPDU priority, and stabilized 100% network transit.',
    telemetry: 'Incident State: RESOLVED | Root-Cause Isolated: TRUE | Backbone: NOMINAL',
    cliSnippet: 'SW1# show spanning-tree vlan 10 | include Root\n  Root ID    Priority    4096\n             Address     001a.a12b.4400\n             This bridge is the root\nSTATUS: TOPOLOGY 100% STABILIZED — SERVICE RESTORED',
    status: 'SYSTEM RESTORED',
    statusTone: 'emerald'
  }
];

// Structured Incident Case Studies (Real Engineering Post-Mortems)
export const incidentCaseStudies = [
  {
    id: 'core-loop-stp',
    index: '01',
    severity: 'P1 CRITICAL',
    title: 'Enterprise Core Switching Loop & Broadcast Storm Resolution',
    category: 'SWITCHING & HIGH AVAILABILITY',
    environment: 'Cisco Catalyst 9300 Stack · Rapid-PVST+ · Multi-Floor Campus',
    problem: 'Sudden campus-wide connectivity blackout across VLAN 10 and 20. Switch CPU utilization spiked to 99% with millions of input broadcast packets per second.',
    impact: 'Corporate workstations and VoIP telephony lost gateway connectivity due to severe TCAM buffer exhaustion.',
    detection: 'SolarWinds NPM generated high-CPU alert; Syslog flooded with duplicate MAC address flap notifications across uplink interfaces.',
    investigation: 'Connected out-of-band via console; observed continuous spanning-tree topology change notifications (TCN) generated every 2 seconds.',
    diagnosis: 'An unmanaged edge switch was looped back into an access port where BPDU Guard was absent, overriding root bridge priority and creating an infinite frame circulation.',
    resolution: 'Immediately shut down the errant access port; globally enforced Spanning-Tree BPDU Guard and Root Guard across all access edge ports; re-verified SW1 root priority at 4096.',
    verification: 'Monitored CPU return to 4% baseline; confirmed MAC flap counters halted; verified zero packet drops across all voice and data VLANs.',
    outcome: 'Eliminated broadcast storm vulnerability permanently by standardizing gold-template PortFast + BPDU Guard across 120+ access switches.'
  },
  {
    id: 'bgp-wan-failover',
    index: '02',
    severity: 'P2 HIGH',
    title: 'BGP WAN Flapping & Sub-Second Fast-Reroute Optimization',
    category: 'ROUTING & WAN INFRASTRUCTURE',
    environment: 'Cisco ISR 4451 · Dual ISP eBGP (AS65001 / AS65002) · IPsec Backup',
    problem: 'Intermittent application disconnects caused by ISP A experiencing micro-flapping (10-second link drop intervals), causing continuous BGP table recalculation.',
    impact: 'Users experienced dropped VPN sessions and frozen remote desktop connections during route convergence cycles.',
    detection: 'Syslog alerts showing frequent BGP-5-ADJCHANGE neighbor down/up events on interface Gi0/0/1.',
    investigation: 'Analyzed BGP flap dampening logs; verified ISP A was not completely dropping carrier signal, preventing standard hold-timer (180s) from timely tearing down the peering.',
    diagnosis: 'Lack of Bidirectional Forwarding Detection (BFD) allowed degraded fiber links to remain in the routing table for up to 3 minutes before timing out.',
    resolution: 'Configured hardware BFD on both eBGP peers with 300ms intervals; configured BGP conditional default routing with route-maps for deterministic failover to ISP B.',
    verification: 'Conducted maintenance window cable-pull test; verified BGP neighbor tear-down and convergence completed in under 900ms with zero lost TCP connections.',
    outcome: 'Sub-second WAN failover capability established across enterprise headquarters, preventing future brownout outages.'
  },
  {
    id: 'firewall-ipsec-rekey',
    index: '03',
    severity: 'P2 HIGH',
    title: 'Multi-Vendor IPsec VPN Phase 2 Rekeying Stabilization',
    category: 'NETWORK SECURITY & FIREWALLS',
    environment: 'Palo Alto PA-3220 (Headquarters) ↔ FortiGate 100F (Branch Office)',
    problem: 'Branch office lost access to centralized SAP and file storage every 8 hours at predictable intervals for exactly 2 minutes.',
    impact: 'Production logistics and warehouse scanning units lost server synchronization during shift changes.',
    detection: 'Syslog event correlation identified Phase 2 Security Association (SA) deletion events at 8-hour intervals.',
    investigation: 'Captured IKE Phase 1 and Phase 2 debug logs on both Palo Alto and Fortinet firewalls during the rekey window.',
    diagnosis: 'Palo Alto Phase 2 Lifetime was configured for 28800s (8h) while FortiGate had PFS (Perfect Forward Secrecy) DH Group mismatch, causing rekey negotiation to fail until hard expiration.',
    resolution: 'Aligned Phase 2 proposal parameters (AES-256-GCM, SHA-256, DH Group 14) and configured dead-peer-detection (DPD) with aggressive keepalives on both firewalls.',
    verification: 'Triggered manual Phase 2 rekeying; verified zero packet drops on continuous ICMP ping during crypto key transition.',
    outcome: '100% tunnel stability achieved across branch site-to-site connectivity with documented multi-vendor VPN standard operating procedure.'
  },
  {
    id: 'wireshark-tcp-window',
    index: '04',
    severity: 'P3 MEDIUM',
    title: 'Deep Packet Inspection: TCP Window Exhaustion & Latency Spikes',
    category: 'TELEMETRY & PACKET ANALYSIS',
    environment: 'Wireshark SPAN Capture · Core Catalyst 9300 · ERP Application Server',
    problem: 'Users reported severe slowness when downloading large accounting reports, despite 10 Gbps fiber links showing under 15% aggregate bandwidth utilization.',
    impact: 'Finance team report generation times degraded from 10 seconds to over 6 minutes.',
    detection: 'Initial interface metrics showed zero errors; escalated to Tier 2/3 for packet-level investigation.',
    investigation: 'Enabled SPAN port mirroring on server uplink Gi1/0/24 and captured 50,000 frames in Wireshark during active report generation.',
    diagnosis: 'Wireshark expert analysis revealed repeated TCP ZeroWindow and Window Full alerts from the destination client, caused by endpoint TCP receive buffer exhaustion rather than network congestion.',
    resolution: 'Identified an outdated NIC driver on the client OS limiting TCP Window Scaling; updated driver and optimized TCP receive window auto-tuning parameters.',
    verification: 'Recaptured Wireshark trace; verified TCP window scale factor expanded to 256; report transfer time restored to 8 seconds.',
    outcome: 'Provided concrete empirical packet capture proof clearing network infrastructure and isolating endpoint OS configuration.'
  }
];

// The Human Dimension: Mechanical Engineering to Network Infrastructure
export const mechanicalToNetworkStory = {
  title: 'FROM PHYSICAL MECHANICS TO NETWORK INFRASTRUCTURE',
  subtitle: 'How an analytical engineering mindset translates into high-availability network operations.',
  narrative: [
    'Holding a degree in Mechanical Engineering, I was trained to analyze complex physical systems under stress — evaluating fluid flow through valves, pressure differentials across piping, thermodynamic constraints, and material failure modes.',
    'When I made a deliberate pivot into Network Engineering, I recognized that enterprise networks are governed by identical empirical principles: packets are the fluid, bandwidth is pipe capacity, buffers are pressure vessels, and latency is friction.',
    'This engineering foundation shapes how I operate in the NOC: rather than guessing at symptoms, I isolate root causes through empirical evidence — examining packet captures, checking interface error counters, tracing topology signal paths, and verifying state machines.',
    'Today, whether diagnosing an OSPF routing anomaly, stabilizing a multi-vendor firewall perimeter, or leading a P1 incident bridge, I approach network operations with methodical engineering rigor: resilient by design, validated with telemetry, and documented for permanence.'
  ],
  comparisons: [
    { physical: 'Fluid Pressure & Pipe Flow', network: 'Packet Throughput & Queue Buffers' },
    { physical: 'System Stress & Material Fatigue', network: 'TCAM Exhaustion & CPU Load Spikes' },
    { physical: 'Failsafe Valves & Redundancy', network: 'BGP Fast-Reroute & RSTP Root Bridges' },
    { physical: 'Empirical Sensor Telemetry', network: 'Wireshark Deep Packet Dissection & Syslog' }
  ]
};


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

// Hero Live Network Interactive Simulations
export const heroSimulations = {
  normal: {
    id: 'normal',
    label: 'NORMAL L2/L3 FORWARDING',
    badge: 'STEADY STATE',
    badgeTone: 'emerald',
    description: 'BGP AS65001 WAN peering active. Palo Alto Layer 7 App-ID inspection nominal. Cisco Cat 9300 core stack forwarding VLAN 10/20 at 10Gbps line rate.',
    packetSpeed: 0.012,
    packetType: 'clean',
    metrics: { latency: '0.84 ms', loss: '0.00%', throughput: '9.82 Gbps', linkStatus: 'OPTIMAL' }
  },
  failover: {
    id: 'failover',
    label: '⚡ SIMULATE FIBER CUT (BGP / OSPF FAILOVER)',
    badge: 'HA ACTIVE',
    badgeTone: 'amber',
    description: 'Primary WAN Gi0/0/1 severed. BFD triggers sub-second fast-reroute; OSPF neighbor convergence instantly redirects enterprise traffic via backup secondary gateway.',
    packetSpeed: 0.018,
    packetType: 'failover',
    metrics: { latency: '2.14 ms', loss: '0.01%', throughput: '8.40 Gbps', linkStatus: 'FAILOVER REROUTED' }
  },
  threat: {
    id: 'threat',
    label: '🛡️ SIMULATE DDoS / THREAT MITIGATION',
    badge: 'SECURITY SCRUBBING',
    badgeTone: 'rose',
    description: 'Malicious SYN flood detected at boundary. Palo Alto PA-3220 enforces Zone-Protection profile: scrubbing rogue red packets while green enterprise payloads pass untouched.',
    packetSpeed: 0.015,
    packetType: 'threat',
    metrics: { latency: '1.02 ms', loss: '0.00% (Legitimate)', throughput: 'Clean 9.1 Gbps', linkStatus: 'ATTACK MITIGATED' }
  },
  wireshark: {
    id: 'wireshark',
    label: '🔍 DEEP PACKET INSPECTION (SPAN MIRROR)',
    badge: 'PCAP ACTIVE',
    badgeTone: 'blue',
    description: 'Capturing live Ethernet Frame on Core Switch Port Gi1/0/24 SPAN mirror. Decoding 802.1Q tag, IP Header TTL, and TCP 3-Way Handshake flags.',
    packetSpeed: 0.008,
    packetType: 'wireshark',
    metrics: { latency: '0.78 ms', loss: '0.00%', throughput: '10.0 Gbps SPAN', linkStatus: 'TELEMETRY STREAMING' }
  }
};

// Protocol Step-Through State Machine Engine
export const protocolStateMachines = [
  {
    id: 'ospf-convergence',
    title: 'OSPFv2 Multi-Area Adjacency & Link-State Convergence',
    protocol: 'OSPF (RFC 2328)',
    category: 'Routing Protocol',
    steps: [
      { step: 1, state: 'DOWN', desc: 'No Hello packets received on interface Gi0/0/1.', cli: 'R1# show ip ospf neighbor\nNeighbor ID  Pri  State  Dead Time  Address  Interface\n(No active adjacencies found)' },
      { step: 2, state: 'INIT', desc: 'Received Hello packet from Neighbor R2, but R1 Router-ID is not yet listed in neighbor active list.', cli: 'R1# debug ip ospf events\n*Mar 1 09:12:01.104: OSPF-1 EVENT: Received Hello from 192.168.1.2 on Gi0/0/1 (INIT state)' },
      { step: 3, state: '2-WAY', desc: 'Bidirectional communication established. DR/BDR election begins on broadcast multi-access segment.', cli: 'R1# show ip ospf neighbor\nNeighbor ID: 192.168.1.2  Pri: 1  State: 2WAY/DROTHER  Address: 192.168.1.2' },
      { step: 4, state: 'EXSTART / EXCHANGE', desc: 'Master/Slave negotiation using Database Description (DBD) packets with Initial Sequence Number (ISN).', cli: 'R1# debug ip ospf packet\n*Mar 1 09:12:01.320: OSPF-1 PACKET: Send DBD to 192.168.1.2 seq 0x1A40 (Exchange State)' },
      { step: 5, state: 'LOADING', desc: 'Link State Requests (LSR) sent for missing LSAs; Link State Updates (LSU) flooding link-state database.', cli: 'R1# show ip ospf database\n            OSPF Router with ID (192.168.1.1) (Process ID 1)\n                Router Link States (Area 0)\nLink ID         ADV Router      Age         Seq#       Checksum\n192.168.1.1     192.168.1.1     42          0x80000003 0x00A1F2' },
      { step: 6, state: 'FULL (CONVERGED)', desc: 'Shortest Path First (Dijkstra SPF) recalculation completed. All OSPF LSDBs identical across Area 0.', cli: 'R1# show ip route ospf\nO    10.0.10.0/24 [110/2] via 192.168.1.2, 00:14:22, GigabitEthernet0/0/1\nO    10.0.20.0/24 [110/2] via 192.168.1.2, 00:14:22, GigabitEthernet0/0/1\nSTATUS: TOPOLOGY 100% CONVERGED' }
    ]
  },
  {
    id: 'tcp-handshake',
    title: 'Wireshark TCP 3-Way Handshake & Deep Packet Flow',
    protocol: 'TCP/IP (RFC 793)',
    category: 'Deep Packet Inspection',
    steps: [
      { step: 1, state: '[SYN] CLIENT REQUEST', desc: 'Client sends SYN packet with Initial Sequence Number (Seq=0) and MSS negotiation (MSS=1460).', cli: 'Frame 1: 74 bytes on wire (592 bits)\nTransmission Control Protocol, Src Port: 54102, Dst Port: 443 (HTTPS)\nFlags: 0x002 (SYN)\nSequence Number: 0    (relative sequence number)\nAcknowledgment Number: 0' },
      { step: 2, state: '[SYN, ACK] SERVER ACKNOWLEDGMENT', desc: 'Server responds with SYN-ACK, acknowledging Client Seq+1 and proposing its own Server Seq=0.', cli: 'Frame 2: 74 bytes on wire (592 bits)\nTransmission Control Protocol, Src Port: 443, Dst Port: 54102\nFlags: 0x012 (SYN, ACK)\nSequence Number: 0\nAcknowledgment Number: 1    (relative ack number)\nWindow Size: 65535 (scale factor 8)' },
      { step: 3, state: '[ACK] CONNECTION ESTABLISHED', desc: 'Client sends final ACK packet. Socket transitions to ESTABLISHED; TLS 1.3 ClientHello payload begins transmission.', cli: 'Frame 3: 66 bytes on wire (528 bits)\nTransmission Control Protocol, Src Port: 54102, Dst Port: 443\nFlags: 0x010 (ACK)\nSequence Number: 1\nAcknowledgment Number: 1\nSTATUS: TCP SOCKET ESTABLISHED (RTT: 0.84ms)' }
    ]
  },
  {
    id: 'rstp-loop-prevention',
    title: 'Rapid Spanning Tree (802.1w) Root Bridge Election & Port States',
    protocol: 'IEEE 802.1w RSTP',
    category: 'Switching Protocol',
    steps: [
      { step: 1, state: 'BPDU PROPOSAL', desc: 'Core Switches exchange Bridge Protocol Data Units (BPDUs) comparing Priority + MAC Address.', cli: 'SW1# show spanning-tree vlan 10\nVLAN0010\n  Spanning tree enabled protocol rstp\n  Root ID    Priority    4096\n             Address     001a.a12b.4400\n             This bridge is the root\n             Hello Time   2 sec  Max Age 20 sec  Forward Delay 15 sec' },
      { step: 2, state: 'ROOT PORT / DESIGNATED PORT', desc: 'Switch Cat 9300 elects Gi1/0/1 as Root Port (Cost: 4, 10Gbps). Access ports placed into Designated Forwarding.', cli: 'SW2# show spanning-tree interface gi1/0/1\nPort 1 (GigabitEthernet1/0/1) of VLAN0010 is Root Forwarding\n   Port path cost 4, Designated root has priority 4096\n   Designated bridge has priority 4096, address 001a.a12b.4400' },
      { step: 3, state: 'BLOCKING (ALTERNATE PORT)', desc: 'Redundant interconnect Gi1/0/2 placed in Discarding/Alternate state, physically preventing switching loops and broadcast storms.', cli: 'SW2# show spanning-tree summary\nSwitch is in rapid-pvst mode\nRoot bridge for: none\nPort Gi1/0/2 is Alternate Discarding (Loop Free Prevention)\nSTATUS: ZERO BROADCAST STORMS DETECTED' }
    ]
  }
];


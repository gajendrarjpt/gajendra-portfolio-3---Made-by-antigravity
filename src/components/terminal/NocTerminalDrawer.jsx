import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { profile, socials } from '../../data/portfolioData';

export default function NocTerminalDrawer({ externalOpen, onClose }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', content: 'GAJENDRA RAJPUT // NOC INCIDENT TERMINAL v3.0 ONLINE' },
    { type: 'sys', content: 'Type "help" or click a command below to navigate or execute diagnostic routines.' }
  ]);

  const { theme, toggleTheme } = useTheme();
  const bottomRef = useRef(null);

  const isOpen = externalOpen || internalOpen;

  const handleClose = () => {
    setInternalOpen(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          handleClose();
        } else {
          setInternalOpen(true);
        }
      }
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      handleClose();
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  const handleCommand = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...history, { type: 'user', content: `$ ${cmdStr}` }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'res',
          content: `AVAILABLE COMMANDS:
  journey     - Launch the signature "Follow the Packet" sequence
  story       - Route to career progression (L1 -> Tier 2 -> Tier 2/3)
  incident    - Open engineering post-mortems & RCA investigations
  network     - Inspect protocol state machines & MNC architecture
  philosophy  - View Mechanical-to-Network Engineering thinking
  skills      - Lists routing, switching & firewall capabilities
  ping        - Simulates live ICMP ping to core gateway nodes
  traceroute  - Traces route through career milestones
  whoami      - Displays Senior Network Engineer credentials
  resume      - Triggers download of Gajendra's official resume
  contact     - Displays direct email and LinkedIn connection bridges
  clear       - Clears terminal screen`
        });
        break;

      case 'journey':
        newHistory.push({ type: 'sys', content: '→ Routing to Signature Sequence: Follow the Packet...' });
        scrollToSection('journey');
        break;

      case 'story':
      case 'experience':
        newHistory.push({ type: 'sys', content: '→ Routing to Career Progression Timeline...' });
        scrollToSection('story');
        break;

      case 'incident':
      case 'incidents':
        newHistory.push({ type: 'sys', content: '→ Routing to Incident Post-Mortems & RCA Dossiers...' });
        scrollToSection('incidents');
        break;

      case 'network':
      case 'lab':
        newHistory.push({ type: 'sys', content: '→ Routing to Protocol State Machine Explorer...' });
        scrollToSection('engine');
        break;

      case 'philosophy':
        newHistory.push({ type: 'sys', content: '→ Routing to Mechanical-to-Network Engineering...' });
        scrollToSection('philosophy');
        break;

      case 'resume':
        newHistory.push({ type: 'res', content: '→ Initiating resume download: /resume/Gajendra_Rajput_Resume.pdf' });
        window.open(profile.resume.url, '_blank', 'noopener,noreferrer');
        break;

      case 'ping':
        newHistory.push({
          type: 'res',
          content: `PING core-rtr-01.phntech.internal (192.168.10.1): 56 data bytes
64 bytes from 192.168.10.1: icmp_seq=1 ttl=64 time=0.82 ms
64 bytes from 192.168.10.1: icmp_seq=2 ttl=64 time=0.84 ms
64 bytes from 192.168.10.1: icmp_seq=3 ttl=64 time=0.79 ms
--- 192.168.10.1 ping statistics ---
3 packets transmitted, 3 received, 0.00% packet loss, rtt avg = 0.82 ms
STATUS: ALL CORE GATEWAYS NOMINAL`
        });
        break;

      case 'traceroute':
        newHistory.push({
          type: 'res',
          content: `traceroute to senior-engineer.gajendra.network (10.0.0.1), 30 hops max
 1  mannschaft-it-l1 (10.0.1.1) [2022 - 2023]  2.1 ms  (Learning to detect the signal)
 2  semantic-tier-2 (10.0.2.1) [2023 - 2025]  1.4 ms  (Learning to isolate the failure)
 3  phn-tech-senior (10.0.3.1) [2025 - PRESENT]  0.8 ms  (Learning to own the incident)
DESTINATION REACHED: SENIOR NETWORK ENGINEER (NOC TIER 2/3)`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'res',
          content: `${profile.name} — ${profile.title} (${profile.level})
ORGANIZATION: PHN Technology Pvt Ltd
CERTIFICATIONS: CCNA · CEH v12 · Fortinet NSE 3
FOCUS: Enterprise Routing/Switching, Multi-Vendor Firewalls, Deep Packet Diagnostics, NOC Incident Leadership`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'res',
          content: `ROUTING & SWITCHING: OSPFv2/v3, BGP, VLANs, 802.1Q, RSTP, EtherChannel, NAT, QoS
SECURITY: Palo Alto (PAN-OS), Fortinet (FortiOS), Sophos XG, IPsec VPN, ACLs, Nessus
WIRELESS: Cisco Catalyst 9800 WLC, Aruba WLAN, 802.1X WPA3 Enterprise
TELEMETRY: Wireshark Deep PCAP, SolarWinds NPM, Syslog Ingestion, SNMP`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'res',
          content: `DIRECT CONNECT BRIDGES:
  Email:    ${profile.email}
  LinkedIn: ${socials.linkedin.url}
  GitHub:   ${socials.github.url}`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'err',
          content: `Command not recognized: "${cleanCmd}". Type "help" for valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-[#000000] text-white border-l border-[#1F1F1F] shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 font-mono text-xs ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="font-bold text-sm tracking-wider uppercase text-white">
                NOC INCIDENT TERMINAL // CLI NAVIGATION
              </span>
            </div>
            <button
              onClick={handleClose}
              className="text-[#888888] hover:text-white px-2 py-1 border border-[#222222] hover:border-white transition-colors cursor-pointer"
            >
              ESC ✕
            </button>
          </div>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap gap-1.5 py-3 border-b border-[#1F1F1F]">
            {['journey', 'story', 'incident', 'network', 'skills', 'ping', 'resume', 'contact', 'help'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-1 bg-[#111111] hover:bg-[#0052FF] text-[#AAAAAA] hover:text-white border border-[#222222] uppercase text-[10px] font-semibold transition-colors cursor-pointer"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Output Terminal Stream */}
          <div className="my-auto flex-1 overflow-y-auto py-4 flex flex-col gap-2 font-mono text-xs leading-relaxed">
            {history.map((item, idx) => (
              <div
                key={idx}
                className={
                  item.type === 'user'
                    ? 'text-[#00FF66] font-semibold'
                    : item.type === 'err'
                    ? 'text-[#FF3344]'
                    : item.type === 'sys'
                    ? 'text-[#0052FF]'
                    : 'text-[#E0E0E0] whitespace-pre-line'
                }
              >
                {item.content}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* CLI Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center gap-2 pt-4 border-t border-[#1F1F1F]"
          >
            <span className="text-[#00FF66] font-bold">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type a command (e.g. journey, incident, ping, resume, help)..."
              className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-xs"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#0052FF] text-white uppercase text-[10px] font-bold hover:bg-[#0042D0] transition-colors cursor-pointer"
            >
              EXECUTE ↵
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

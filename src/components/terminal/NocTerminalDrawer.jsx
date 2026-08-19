import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { profile, socials } from '../../data/portfolioData';

export default function NocTerminalDrawer({ externalOpen, onClose }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', content: 'GAJENDRA RAJPUT // SLY NETWORK TERMINAL v2.4 ONLINE' },
    { type: 'sys', content: 'Type "help" or click a command below to execute diagnostic routines.' }
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

  const handleCommand = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...history, { type: 'user', content: `$ ${cmdStr}` }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'res',
          content: `AVAILABLE COMMANDS:
  ping        - Simulates live ICMP ping to core gateway nodes
  traceroute  - Traces route through Gajendra's career milestones
  whoami      - Displays Senior Network Engineer credentials
  skills      - Lists routing, switching & firewall capabilities
  contact     - Displays direct email and LinkedIn connection bridges
  clear       - Clears terminal screen`
        });
        break;

      case 'ping':
        newHistory.push({
          type: 'res',
          content: `PING core-rtr-01.phntech.internal (192.168.10.1): 56 data bytes
64 bytes from 192.168.10.1: icmp_seq=1 ttl=64 time=1.12 ms
64 bytes from 192.168.10.1: icmp_seq=2 ttl=64 time=0.98 ms
64 bytes from 192.168.10.1: icmp_seq=3 ttl=64 time=1.04 ms
--- 192.168.10.1 ping statistics ---
3 packets transmitted, 3 received, 0.00% packet loss, rtt min/avg/max = 0.98/1.04/1.12 ms
STATUS: ALL CORE GATEWAYS OPERATIONAL`
        });
        break;

      case 'traceroute':
        newHistory.push({
          type: 'res',
          content: `traceroute to career.gajendra.network (10.0.0.1), 30 hops max
 1  mannschaft-noc-l1 (10.0.1.1) [2022 - 2023]  2.1 ms  (First-line SLA triage)
 2  semantic-tier-2 (10.0.2.1) [2023 - 2025]  1.4 ms  (Multi-vendor firewall admin)
 3  phn-tech-tier-2-3 (10.0.3.1) [2025 - PRESENT]  0.8 ms  (Senior NOC Incident Bridge)
DESTINATION REACHED: SENIOR NETWORK ENGINEER`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'res',
          content: `${profile.name} — ${profile.title} (${profile.level})
COMPANY: PHN Technology Pvt Ltd
CERTIFICATION: CCNA (Cisco Certified Network Associate)
FOCUS: Enterprise Routing/Switching, Palo Alto/Fortinet/Sophos Firewalls, NOC Escalation`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'res',
          content: `ROUTING & SWITCHING: OSPF, EIGRP, BGP, VLAN, STP, EtherChannel, NAT, QoS
SECURITY: Palo Alto, Fortinet, Sophos, IPsec VPN, ACLs, Nessus
WIRELESS: Cisco WLC, Aruba WLAN, 802.1X, WPA3
MONITORING: Wireshark, Syslog, Telemetry, SolarWinds`
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
      <button
        onClick={() => setInternalOpen(true)}
        className="fixed bottom-6 right-6 z-40 font-mono text-xs font-bold px-4 py-3 bg-[#111111] text-white border border-[#0052FF] shadow-2xl flex items-center gap-2.5 hover:scale-105 transition-all cursor-pointer no-theme-transition"
      >
        <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
        <span>[+] NOC TERMINAL</span>
        <span className="text-[10px] text-[#888888] hidden sm:inline">(CTRL+K)</span>
      </button>

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
                SLY NETWORK TERMINAL
              </span>
            </div>
            <button
              onClick={handleClose}
              className="text-[#888888] hover:text-white px-2 py-1 border border-[#222222] hover:border-white transition-colors"
            >
              ESC ✕
            </button>
          </div>

          <div className="flex flex-wrap gap-2 py-3 border-b border-[#1F1F1F]">
            {['ping', 'traceroute', 'whoami', 'skills', 'contact', 'help'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-1 bg-[#111111] hover:bg-[#0052FF] text-[#AAAAAA] hover:text-white border border-[#222222] uppercase text-[10px] font-semibold transition-colors"
              >
                ${cmd}
              </button>
            ))}
          </div>

          <div className="my-auto flex-1 overflow-y-auto py-4 flex flex-col gap-2 font-mono text-xs leading-relaxed">
            {history.map((item, idx) => (
              <div
                key={idx}
                className={
                  item.type === 'user'
                    ? 'text-[#00FF66] font-semibold'
                    : item.type === 'err'
                    ? 'text-[#FF4500]'
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center gap-2 border-t border-[#1F1F1F] pt-4"
          >
            <span className="text-[#00FF66] font-bold text-sm">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command ('help', 'ping', 'traceroute')..."
              className="w-full bg-transparent text-white focus:outline-none font-mono text-xs"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#0052FF] text-white font-bold uppercase text-[10px]"
            >
              RUN
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

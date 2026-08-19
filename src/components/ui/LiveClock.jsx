import React, { useState, useEffect } from 'react';

export default function LiveClock({ showStatus = true, className = '' }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as IST / UTC HH:MM:SS
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs text-[#5A5A57] dark:text-[#888888] tracking-wider uppercase select-none ${className}`}>
      {showStatus && (
        <span className="flex items-center gap-1.5 text-[#0052FF] dark:text-[#00FF66] font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#0052FF] dark:bg-[#00FF66] animate-pulse" />
          <span>SYS: NOMINAL</span>
        </span>
      )}
      {showStatus && <span>·</span>}
      <span className="text-[#121212] dark:text-[#DDDDDD] font-medium">
        IST {timeStr}
      </span>
    </div>
  );
}

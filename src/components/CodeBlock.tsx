import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2 } from 'lucide-react';
import { sound } from '../utils/sound';

interface CodeLine {
  id?: string;
  text: string;
  type?: 'command' | 'output' | 'comment' | 'code' | 'highlighted';
}

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: string;
  lines?: (string | CodeLine)[];
  allowLineHighlight?: boolean;
  highlightedLineIds?: Set<string>;
  onToggleLineHighlight?: (lineId: string) => void;
  className?: string;
}

/**
 * Fallback clipboard write to work reliably across browser iframe security restrictions
 */
const copyTextToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Navigator clipboard API failed, attempting textarea fallback:', err);
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (e) {
    console.error('Textarea copy fallback failed:', e);
    return false;
  }
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  title,
  language = 'bash',
  lines,
  allowLineHighlight = true,
  highlightedLineIds = new Set(),
  onToggleLineHighlight,
  className = ''
}) => {
  const [isCopied, setIsCopied] = useState(false);

  // Clean code for copying (strip leading "$ " prompts if user wants pure runnable command)
  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    // For single-line or multi-line commands, clean if convenient, but copy exact script
    const success = await copyTextToClipboard(code);
    if (success) {
      setIsCopied(true);
      try {
        sound.playClick();
      } catch {
        // ignore audio failure
      }
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  // Prepare display lines if not provided explicitly
  const parsedLines: CodeLine[] = lines 
    ? lines.map((l, idx) => typeof l === 'string' ? { id: `line-${idx}`, text: l } : { id: l.id || `line-${idx}`, ...l })
    : code.split('\n').map((line, idx) => {
        const trimmed = line.trim();
        let type: CodeLine['type'] = 'code';
        if (trimmed.startsWith('$')) type = 'command';
        else if (trimmed.startsWith('//') || trimmed.startsWith('#')) type = 'comment';
        else if (trimmed.startsWith('>') || trimmed.startsWith('[') || trimmed.startsWith('modified:')) type = 'output';
        return {
          id: `line-${idx}`,
          text: line,
          type
        };
      });

  return (
    <div className={`rounded-xl border border-[#30363d] bg-[#010409] overflow-hidden shadow-lg group transition-all duration-200 ${className}`}>
      {/* Header bar with title, language badge & Copy button */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#161b22] border-b border-[#30363d] text-xs">
        <div className="flex items-center gap-2 text-[#7d8590] font-mono text-[11px]">
          {language === 'bash' || language === 'sh' ? (
            <Terminal className="w-3.5 h-3.5 text-[#2ea043]" />
          ) : (
            <Code2 className="w-3.5 h-3.5 text-[#58a6ff]" />
          )}
          <span className="font-semibold text-[#c9d1d9] truncate">
            {title || (language === 'bash' ? 'Terminal' : 'Code Snippet')}
          </span>
          <span className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] uppercase">
            {language}
          </span>
          {allowLineHighlight && (
            <span className="hidden md:inline text-[10px] text-[#484f58]">
              • Click any line to highlight
            </span>
          )}
        </div>

        {/* Copy to Clipboard Button */}
        <button
          onClick={handleCopy}
          type="button"
          aria-label={isCopied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all duration-150 cursor-pointer min-h-[30px] ${
            isCopied
              ? 'bg-[#23863622] text-[#2ea043] border border-[#23863666]'
              : 'bg-[#21262d] text-[#c9d1d9] border border-[#30363d] hover:bg-[#30363d] hover:text-white active:scale-95'
          }`}
          title="Copy code to clipboard for testing locally"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#2ea043]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#7d8590] group-hover:text-white" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code / Command Lines Container */}
      <div className="p-3 sm:p-4 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto space-y-1">
        {parsedLines.map((line, idx) => {
          const isLineHighlighted = line.id && highlightedLineIds.has(line.id);

          return (
            <div
              key={line.id || idx}
              onClick={() => {
                if (allowLineHighlight && line.id && onToggleLineHighlight) {
                  sound.playClick();
                  onToggleLineHighlight(line.id);
                }
              }}
              className={`flex items-center justify-between gap-2 px-2 py-1 rounded-md transition-all select-text ${
                allowLineHighlight ? 'cursor-pointer' : ''
              } ${
                isLineHighlighted
                  ? 'bg-[#58a6ff]/20 border border-[#58a6ff]/60 text-white font-semibold shadow-[0_0_10px_rgba(88,166,255,0.25)] ring-1 ring-[#58a6ff]/50'
                  : 'hover:bg-[#161b22]/80 text-[#c9d1d9]'
              }`}
              title={allowLineHighlight ? 'Click to highlight this line for the audience' : undefined}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Line number */}
                <span className="text-[10px] font-mono text-[#484f58] select-none w-5 text-right shrink-0">
                  {idx + 1}
                </span>

                {/* Line Text with simple syntax styling */}
                <span className={`break-words ${
                  line.text.startsWith('$') 
                    ? 'text-[#58a6ff] font-semibold' 
                    : line.text.startsWith('//') || line.text.startsWith('#')
                    ? 'text-[#7d8590] italic'
                    : line.text.includes('modified:') || line.text.includes('❌')
                    ? 'text-[#f85149]'
                    : line.text.includes('Changes to be committed') || line.text.includes('✅') || line.text.includes('OK')
                    ? 'text-[#2ea043]'
                    : line.text.startsWith('const ') || line.text.startsWith('let ') || line.text.startsWith('import ')
                    ? 'text-[#ff7b72]'
                    : line.text.includes('process.env')
                    ? 'text-[#d2a8ff]'
                    : 'text-[#c9d1d9]'
                }`}>
                  {line.text}
                </span>
              </div>

              {/* Spotlight badge if highlighted */}
              {isLineHighlighted && (
                <span className="text-[9px] uppercase tracking-wider font-mono font-bold px-1.5 py-0.5 rounded bg-[#58a6ff]/30 text-[#58a6ff] shrink-0 border border-[#58a6ff]/50 animate-pulse">
                  Spotlight
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

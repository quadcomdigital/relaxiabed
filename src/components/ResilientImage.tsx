import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle = 'Relaxia'
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F1F0EC] via-[#E8E6E0] to-[#DCD9D0] text-[#595753] p-6 text-center ${className}`}
      >
        <Layers className="w-8 h-8 mb-3 text-[#111111] opacity-70" strokeWidth={1.3} />
        <span className="font-serif text-xl text-[#111111]">{fallbackTitle}</span>
        <span className="text-xs text-[#595753] mt-1">Relaxia · Sistemi del Buon Riposo</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}

export function GlowingDot() {
  return (
    <div className="w-2 h-2 rounded-full bg-primary relative animate-glowing-dot-pulse z-10">
      <div className="absolute -inset-1 rounded-full shadow-[0_0_6px] shadow-primary/70 animate-glowing-dot-pulse z-10" />
    </div>
  );
}

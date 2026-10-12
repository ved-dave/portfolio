interface PromptProps {
  command: string;
  id?: string;
  right?: React.ReactNode;
  className?: string;
}

export default function Prompt({ command, id, right, className = "" }: PromptProps) {
  return (
    <div id={id} className={`mb-5 flex scroll-mt-20 items-center justify-between gap-4 text-[13px] ${className}`}>
      <h2 className="text-fg-muted">
        <span className="text-term">$</span> {command}
      </h2>
      {right}
    </div>
  );
}

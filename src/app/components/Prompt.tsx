interface PromptProps {
  children?: React.ReactNode;
}

export default function Prompt({ children }: PromptProps) {
  return (
    <p>
      <span className="font-semibold text-lime-500">kyle@DESKTOP-PUD1VAS</span>:
      <span className="text-blue-600">~</span>$ {children}
    </p>
  );
}

type Country = "es" | "be" | "it" | "nl";

export function Flag({ country }: { country: Country }) {
  const base = "h-5 w-7 rounded-sm overflow-hidden flex shrink-0 shadow";
  if (country === "es")
    return (
      <span className={`${base} flex-col`} role="img" aria-label="Spain">
        <span className="h-1/4 w-full bg-[#c60b1e]" />
        <span className="h-1/2 w-full bg-[#ffc400]" />
        <span className="h-1/4 w-full bg-[#c60b1e]" />
      </span>
    );
  if (country === "be")
    return (
      <span className={base} role="img" aria-label="Belgium">
        <span className="h-full w-1/3 bg-black" />
        <span className="h-full w-1/3 bg-[#fdda24]" />
        <span className="h-full w-1/3 bg-[#ef3340]" />
      </span>
    );
  if (country === "it")
    return (
      <span className={base} role="img" aria-label="Italy">
        <span className="h-full w-1/3 bg-[#008c45]" />
        <span className="h-full w-1/3 bg-white" />
        <span className="h-full w-1/3 bg-[#cd212a]" />
      </span>
    );
  return (
    <span className={`${base} flex-col`} role="img" aria-label="Netherlands">
      <span className="h-1/3 w-full bg-[#ae1c28]" />
      <span className="h-1/3 w-full bg-white" />
      <span className="h-1/3 w-full bg-[#21468b]" />
    </span>
  );
}

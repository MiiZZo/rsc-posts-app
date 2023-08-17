import dynamic from "next/dynamic"
import { PropsWithChildren } from "react"

function Component({ children }: PropsWithChildren) {
  return children;
}

export const ClientOnly = dynamic(() => Promise.resolve(Component), {
  ssr: false,
});

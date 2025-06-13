import { createGenericStore } from "./S0GenericStore";

interface I {
  token?: string;
}

const useStore = createGenericStore<I>({
  initialState: { token: "" },
  storageKey: "S0Auth"
})
export default function useS0Auth() {
  const store = useStore()
  return {
    ...store
  }
}

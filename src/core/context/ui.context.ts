// React dependencies
import { createContext } from "react";

// Models
import { UIContextState } from "../model";

export const UIContext = createContext<UIContextState | undefined>(undefined);

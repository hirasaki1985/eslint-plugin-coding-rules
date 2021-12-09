import { combineReducers, createStore, Store } from "redux";
import { HealthCheckReducer } from "./state/health_check/HealthCheckState";

const rootReducer = combineReducers({
  healthCheck: HealthCheckReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function configureStore(): Store<RootState> {
  return createStore(rootReducer);
}

const store: Store<RootState> = configureStore();
export default store;

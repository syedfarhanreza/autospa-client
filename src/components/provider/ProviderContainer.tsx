import ReduxProvider from "./ReduxProvider";
const ProviderContainer = ({ children }: { children: React.ReactNode }) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};
export default ProviderContainer;

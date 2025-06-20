import withSuspense from "@/functions/withSuspense";
import { useStore } from "@/stores/store";
import { Loader } from "lucide-react";
import { observer } from "mobx-react-lite";
import { lazy } from "react";
import { ConnectionFailed } from "./ConnectionFailed/ConnectionFailed";

const AccountCreateImport = withSuspense(
  lazy(
    () =>
      import(
        "@/components/ZondWallet/Body/Home/AccountCreateImport/AccountCreateImport"
      ),
  ),
);
const BackgroundVideo = withSuspense(
  lazy(
    () =>
      import(
        "@/components/ZondWallet/Body/Home/BackgroundVideo/BackgroundVideo"
      ),
  ),
);
const ConnectionBadge = withSuspense(
  lazy(
    () =>
      import(
        "@/components/ZondWallet/Body/Home/ConnectionBadge/ConnectionBadge"
      ),
  ),
);

const Home = observer(() => {
  const { zondStore } = useStore();
  const { zondConnection } = zondStore;
  const { isLoading, isConnected } = zondConnection;

  return (
    <>
      <BackgroundVideo />
      <div className="relative z-10 flex w-full flex-col items-center gap-8 p-8">
        <img className="h-16 w-16" src="icons/qrl/default.png" />
        {isLoading ? (
          <Loader className="animate-spin text-foreground" size="32" />
        ) : (
          <>
            <ConnectionBadge />
            {isConnected ? <AccountCreateImport /> : <ConnectionFailed />}
          </>
        )}
      </div>
    </>
  );
});

export default Home;

import { updateUrlWithObjectQueries } from "@/utils/helper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [first, setFirst] = useState(() => {
    const firstParam = searchParams.get("first");
    if (firstParam) return firstParam;
    return "";
  });
  const [second, setSecond] = useState(() => {
    const secondParam = searchParams.get("second");
    if (secondParam) return secondParam;
    return "";
  });

  useEffect(() => {
    if (first || second) {
      const url = updateUrlWithObjectQueries({ first, second }, router.asPath);
      window.history.replaceState(window.history.state, "", url);
    }
    if (!first && !second)
      window.history.replaceState(window.history.state, "", router.pathname);
  }, [first, second]);

  const currentPath = () => {
    if (!first && !second) return "";
    const url = updateUrlWithObjectQueries({ first, second }, router.asPath);
    return url;
  };
  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col space-y-4 w-full max-w-xl bg-slate-500 p-8 rounded-md">
          <div>
            <span className="text-2xl font-bold"> Current Path : </span>
            <span className="text-2xl"> {currentPath()}</span>
          </div>
          <input
            className="input"
            value={first}
            onInput={(e) => setFirst(e.currentTarget.value)}
            placeholder="First Query"
            type="text"
          />
          <input
            className="input"
            value={second}
            onInput={(e) => setSecond(e.currentTarget.value)}
            placeholder="Second Query"
            type="text"
          />
        </div>
      </div>
    </>
  );
};

export default Page;

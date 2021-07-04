import { useRecoilTransactionObserver_UNSTABLE } from "recoil";
import { setCookie } from "nookies";
import React from "react";

export function PersistenceObserver(prop) {
  useRecoilTransactionObserver_UNSTABLE(({ snapshot }) => {
    for (const modifiedAtom of snapshot.getNodes_UNSTABLE({
      isModified: true,
    })) {
      const atomLoadable = snapshot.getLoadable(modifiedAtom);
      console.log(atomLoadable);
      if (atomLoadable.state === "hasValue") {
        setCookie(prop.ctx, "count", JSON.stringify(atomLoadable.contents), {
          path: "/",
        });
      }
    }
  });
  return <></>;
}

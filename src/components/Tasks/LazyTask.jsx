import React, { Suspense, lazy } from "react";

const Task = lazy(() => import("./../Tasks/Task"));

const LazyTask = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Task {...props} />
  </Suspense>
);

export default LazyTask;
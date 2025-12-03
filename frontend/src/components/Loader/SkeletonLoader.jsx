import React from "react";

const SkeletonLoader = () => {
  return (
    <div role="status" className="animate-pulse space-y-6 max-w-3xl">
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-1/2"></div>

      {/* Paragraph Skeleton */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div>
        <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div>
      </div>

      {/* Box Section */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 space-y-2">
        <div className="h-2.5 bg-gray-300 rounded w-3/4"></div>
        <div className="h-2.5 bg-gray-300 rounded w-2/3"></div>
        <div className="h-2.5 bg-gray-300 rounded w-1/2"></div>
      </div>

      {/* Second Section */}
      <div className="space-y-6 mt-10">
        <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-1/2"></div>

        {/* Paragraph 1 */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div>
        </div>

        {/* Paragraph 2 */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div>
        </div>

        {/* Small Box */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 space-y-2">
          <div className="h-2.5 bg-gray-300 rounded w-3/4"></div>
          <div className="h-2.5 bg-gray-300 rounded w-2/3"></div>
        </div>

        {/* Section Title */}
        <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-1/2 mt-8"></div>

        {/* Paragraph 3 */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div>
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;

import React from "react";
import { BriefcaseIcon, MapPinIcon, BanknotesIcon, BuildingOfficeIcon, ClockIcon } from "@heroicons/react/24/outline";

const JobCard = ({ job }) => {
  return (
    <div className="w-11/12 sm:w-5/12 flex flex-col gap-4 p-5 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3">
        {job.employer_logo ? (
          <img src={job.employer_logo} alt="Company Logo" className="w-12 h-12 object-contain rounded" />
        ) : (
          <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-400">N/A</div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-primary">{job.job_title}</h2>
          <p className="text-sm text-gray-600">{job.employer_name}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <p className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-secondary" />
          {job.job_city}, {job.job_state}, {job.job_country}
        </p>
        {job.job_employment_type && (
          <p className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-secondary" />
            {job.job_employment_type}
          </p>
        )}
        {job.job_salary && (
          <p className="flex items-center gap-2">
            <BanknotesIcon className="w-5 h-5 text-secondary" />
            {job.job_salary}
          </p>
        )}
      </div>

      <div className="mt-2">
        <a
          href={job.job_apply_link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobCard;

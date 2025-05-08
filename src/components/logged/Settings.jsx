import React, { useContext, useState } from 'react';
import Context from '../../Context';

const Settings = () => {
  const { userData } = useContext(Context);
  const [form, setForm] = useState({ ...userData });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send `form` to your backend API as FormData or JSON
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full min-h-screen flex flex-col gap-5 p-4 lg:px-8">
      <h2 className="text-xl font-semibold text-primary">Edit Personal Information</h2>
      <input name="fullName" value={form.fullName} onChange={handleChange} className="p-2 border rounded" placeholder="Full Name" />
      <input name="email" value={form.email} onChange={handleChange} className="p-2 border rounded" placeholder="Email" />
      <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="p-2 border rounded" placeholder="Phone Number" />
      <select name="gender" value={form.gender} onChange={handleChange} className="p-2 border rounded">
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input type="date" name="dateOfBirth" value={form.dateOfBirth.split('T')[0]} onChange={handleChange} className="p-2 border rounded" />
      <input name="country" value={form.country} onChange={handleChange} className="p-2 border rounded" placeholder="Country" />
      <input name="city" value={form.city} onChange={handleChange} className="p-2 border rounded" placeholder="City" />
      
      <h2 className="text-xl font-semibold text-secondary">Experience</h2>
      <input name="jobTitle" value={form.jobTitle} onChange={handleChange} className="p-2 border rounded" placeholder="Job Title" />
      <input name="company" value={form.company} onChange={handleChange} className="p-2 border rounded" placeholder="Company" />
      <input type="number" name="experienceYears" value={form.experienceYears} onChange={handleChange} className="p-2 border rounded" placeholder="Years of Experience" />
      <input name="salaryExpectations" value={form.salaryExpectations} onChange={handleChange} className="p-2 border rounded" placeholder="Expected Salary" />
      
      <h2 className="text-xl font-semibold text-primary">Education</h2>
      <input name="degree" value={form.degree} onChange={handleChange} className="p-2 border rounded" placeholder="Degree" />
      <input name="university" value={form.university} onChange={handleChange} className="p-2 border rounded" placeholder="University" />
      <input type="number" name="graduationYear" value={form.graduationYear} onChange={handleChange} className="p-2 border rounded" placeholder="Graduation Year" />
      
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded mt-4">Save Changes</button>
    </form>
  );
};

export default Settings;
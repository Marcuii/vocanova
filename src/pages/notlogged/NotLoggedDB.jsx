import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotLoggedDB = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-vnwhite text-vnblack2 flex flex-col items-center px-4 py-6">
      {/* Navbar */}
      <div className="w-full max-w-7xl flex justify-between items-center py-4 mb-10 border-b border-gray-300">
        <h1 className="text-2xl font-bold text-primary">Vocanova</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/login')} className="text-primary font-medium hover:bg-vngrey3 px-4 py-2 rounded transition ease-in-out delay-70">Login</button>
          <button onClick={() => navigate('/register')} className="bg-primary text-white px-4 py-2 rounded hover:bg-vngrey3 transition ease-in-out delay-70">Register</button>
        </div>
      </div>

      {/* About Section */}
      <div className="w-full max-w-5xl flex flex-col items-start gap-8">
        <h2 className="text-3xl font-semibold text-secondary">Empowering Your Career with Vocanova</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Vocanova is your personalized career companion — designed to help job seekers discover
          better opportunities, enhance their application materials, and grow their skills.
          Whether you're a fresh graduate or a seasoned professional, Vocanova provides AI-driven
          job recommendations, resume insights, and a platform to track and prepare for job applications.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-primary mb-2">🎯 Job Matching</h3>
            <p className="text-gray-700">Get tailored job recommendations based on your profile, skills, and preferences.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-primary mb-2">📄 Resume Analysis</h3>
            <p className="text-gray-700">Upload your resume and receive feedback on how to make it stand out to employers.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-primary mb-2">🎤 Mock Interviews</h3>
            <p className="text-gray-700">Practice with AI-driven mock interviews to boost your confidence and performance.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold text-primary mb-2">📊 Track Applications</h3>
            <p className="text-gray-700">Manage and monitor all your job applications in one organized place.</p>
          </div>
        </div>

        <div className="mt-10">
          <button onClick={() => navigate('/register')} className="bg-secondary text-white px-6 py-3 rounded-lg text-lg hover:bg-vngrey3 transition ease-in-out delay-70">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedDB;
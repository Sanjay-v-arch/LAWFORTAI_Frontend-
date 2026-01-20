import React, { useEffect, useState } from 'react';
import { Shield, AlertTriangle, FileText, Phone, Lock, Scale, Search, Users, Eye, HelpCircle, Activity, Globe, Database, FileCheck, PhoneCall, ExternalLink, BookOpen, CheckCircle, Gavel, Link as LinkIcon, Edit3, Download, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { get } from '../utils/api';

const CyberPortal = () => {
  const [role, setRole] = useState('guest');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        // Normalize role to lowercase for easier comparison
        setRole(user?.role?.toLowerCase() || 'guest');
        setUserName(user?.name || 'Guest');
      }
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      setRole('guest');
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const navigate = useNavigate();

  const handleAction = (endpoint) => {
    // New Logic: Navigate to dedicated pages
    if (endpoint === "emergency-helpline") {
      navigate("/cyber-portal/emergency-support");
      return;
    }
    if (endpoint === "recovery-steps") {
      navigate("/cyber-portal/recovery-guide");
      return;
    }
    if (endpoint === "cyber-awareness") {
      navigate("/cyber-portal/cyber-awareness");
      return;
    }

    // Fallback for other actions (like FIR, still external)
    // For now, FIR is handled by checking "endpoint" logic if we were to unify it, 
    // but in UniversalSection it's currently hardcoded to windows.open or passed as "fir-portal"
    // Let's keep existing logic for "external" if any, but clean up the API call part.
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-20 pt-24 px-4 sm:px-6 lg:px-8 portal-wrapper">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
          >
            Cyber Response Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Welcome, {userName}. Access specialized tools, resources, and emergency assistance for cyber safety and legal response.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Universal Section - Visible to ALL */}
          <UniversalSection onAction={handleAction} />

          {/* Role Specific Sections */}
          {role === 'citizen' && <CitizenTools />}
          {role === 'lawyer' && <LawyerTools />}
          {role === 'police' && <PoliceTools />}
        </motion.div>

      </div>
    </div>
  );
};

// Reusable Components

const SectionHeader = ({ title, icon: Icon, colorClass, textColorClass, description }) => (
  <div className="flex items-center gap-3 mb-6 border-b pb-4 dark:border-slate-700">
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon size={24} className={textColorClass} />
    </div>
    <div>
      <h2 className={`text-2xl font-bold ${textColorClass}`}>{title}</h2>
      {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
    </div>
  </div>
);

const ToolCard = ({ icon: Icon, title, description, badge, onClick }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="card bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 flex flex-col h-full hover:shadow-xl transition-all cursor-pointer"
    onClick={onClick}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-gray-50 dark:bg-slate-700 rounded-xl text-gray-700 dark:text-gray-300">
        <Icon size={24} />
      </div>
      {badge && (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {badge}
        </span>
      )}
    </div>
    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 flex-grow">{description}</p>
    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-end">
      <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
        <ExternalLink size={16} className="text-gray-400" />
      </div>
    </div>
  </motion.div>
);

// 1. Universal Section (Blue Theme)
const UniversalSection = ({ onAction }) => {
  return (
    <section className="bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
      <SectionHeader
        title="Universal Action Center"
        icon={Globe}
        colorClass="bg-blue-100 dark:bg-blue-900"
        textColorClass="text-blue-700 dark:text-blue-300"
        description="Essential resources available to everyone."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ToolCard
          icon={FileText}
          title="File Verification"
          description="Official portal to file cybercrime complaints directly with the authorities."
          badge="External"
          onClick={() => window.open('https://cybercrime.gov.in', '_blank')}
        />
        <ToolCard
          icon={PhoneCall}
          title="Emergency Hotline"
          description="Direct access to 1930 National Cyber Crime Helpline directory."
          onClick={() => onAction("emergency-helpline")}
        />
        <ToolCard
          icon={Activity}
          title="Recovery Steps"
          description="Step-by-step guide to freeze accounts and secure digital assets."
          onClick={() => onAction("recovery-steps")}
        />
        <ToolCard
          icon={Shield}
          title="Safety Awareness"
          description="Latest alerts on scams, frauds, and digital hygiene practices."
          onClick={() => onAction("cyber-awareness")}
        />
      </div>
    </section>
  );
};

// 2. Citizen Tools (Green Theme)
const CitizenTools = () => {
  return (
    <section className="bg-green-50/50 dark:bg-green-900/10 p-8 rounded-3xl border border-green-100 dark:border-green-800">
      <SectionHeader
        title="Citizen Tools"
        icon={Users}
        colorClass="bg-green-100 dark:bg-green-900"
        textColorClass="text-green-700 dark:text-green-300"
        description="Specialized tools for personal safety and incident reporting."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ToolCard
          icon={FileCheck}
          title="AI Complaint Draft"
          description="Generate a structured complaint draft using AI assistance."
          badge="Beta"
        />
        <ToolCard
          icon={AlertTriangle}
          title="Phishing Detector"
          description="Analyze suspicious emails and links for potential threats."
          badge="Coming Soon"
        />
        <ToolCard
          icon={Lock}
          title="Evidence Helper"
          description="Guide on how to collect and preserve digital evidence primarily."
        />
        <ToolCard
          icon={HelpCircle}
          title="Scam Awareness Hub"
          description="Interactive modules to learn about common cyber scams."
        />
      </div>
    </section>
  );
};

// 3. Lawyer Tools (Yellow Theme)
const LawyerTools = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Category: Investigation Records */}
      <section className="bg-yellow-50/50 dark:bg-yellow-900/10 p-8 rounded-3xl border border-yellow-100 dark:border-yellow-800">
        <SectionHeader
          title="Investigation Records"
          icon={Scale}
          colorClass="bg-yellow-100 dark:bg-yellow-900"
          textColorClass="text-yellow-700 dark:text-yellow-300"
          description="Manage case files, notes, and investigation timelines."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ToolCard
            icon={FileText}
            title="Investigation Records"
            description="Central hub for all investigation data."
            onClick={() => navigate('/lawyer/investigation-records')}
          />
          <ToolCard
            icon={BookOpen}
            title="Case Notebook"
            description="Digital notebook for case scribbles and quick notes."
            onClick={() => navigate('/lawyer/case-notebook')}
          />
          <ToolCard
            icon={Activity}
            title="Investigation Timeline"
            description="Visual timeline of events and evidence."
            onClick={() => navigate('/lawyer/timeline')}
          />
          <ToolCard
            icon={Database}
            title="Case Workspace"
            description="Dedicated workspace for active case management."
            onClick={() => navigate('/lawyer/investigation-records')}
          />
        </div>
      </section>

      {/* Category: Digital Evidence Vault */}
      <section className="bg-slate-50/50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-700">
        <SectionHeader
          title="Digital Evidence Vault"
          icon={Lock}
          colorClass="bg-slate-200 dark:bg-slate-700"
          textColorClass="text-slate-700 dark:text-slate-300"
          description="Secure storage, chain of custody, and forensic tools."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ToolCard
            icon={FileCheck}
            title="Evidence Upload"
            description="Securely upload and hash digital evidence."
            onClick={() => navigate('/lawyer/evidence-vault')}
          />
          <ToolCard
            icon={Search}
            title="Metadata Form"
            description="Extract and analyze file metadata."
            onClick={() => navigate('/lawyer/evidence-vault')}
          />
          <ToolCard
            icon={Shield}
            title="Chain of Custody"
            description="Track evidence handling and transfer history."
            onClick={() => navigate('/lawyer/evidence-vault')}
          />
          <ToolCard
            icon={CheckCircle} // Using CheckCircle or similar
            title="Integrity Checker"
            description="Verify file integrity against stored hashes."
            onClick={() => navigate('/lawyer/evidence-vault')}
          />
        </div>
      </section>

      {/* Category: Legal Prep Tools */}
      <section className="bg-purple-50/50 dark:bg-purple-900/10 p-8 rounded-3xl border border-purple-100 dark:border-purple-800">
        <SectionHeader
          title="Legal Prep Tools"
          icon={Gavel}
          colorClass="bg-purple-100 dark:bg-purple-900"
          textColorClass="text-purple-700 dark:text-purple-300"
          description="Generate summaries, link evidence, and draft documents."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ToolCard
            icon={FileText}
            title="Case Summary Generator"
            description="AI-assisted case summaries."
            onClick={() => navigate('/lawyer/legal-prep')}
          />
          <ToolCard
            icon={LinkIcon}
            title="Evidence Linking"
            description="Link evidence to specific case facts."
            onClick={() => navigate('/lawyer/legal-prep')}
          />
          <ToolCard
            icon={Edit3}
            title="Draft Generator"
            description="Automated legal document drafting."
            onClick={() => navigate('/lawyer/legal-prep')}
          />
          <ToolCard
            icon={Download}
            title="Export Center"
            description="Export case files in standard formats."
            onClick={() => navigate('/lawyer/legal-prep')}
          />
        </div>
      </section>

      {/* Category: Case Roadmap & Management */}
      <section className="bg-teal-50/50 dark:bg-teal-900/10 p-8 rounded-3xl border border-teal-100 dark:border-teal-800">
        <SectionHeader
          title="Case Management"
          icon={Map}
          colorClass="bg-teal-100 dark:bg-teal-900"
          textColorClass="text-teal-700 dark:text-teal-300"
          description="Roadmaps, client management, and intelligence."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ToolCard
            icon={Map}
            title="Case Roadmap"
            description="Stage-based progress tracking and milestones."
            onClick={() => navigate('/lawyer/case-roadmap')}
          />
          <ToolCard
            icon={Users}
            title="Client Manager"
            description="Manage client details and communications."
            onClick={() => navigate('/lawyer/client-manager')}
          />
          <ToolCard
            icon={Globe}
            title="Cyber Law Intel"
            description="Real-time legal intelligence and research."
            onClick={() => navigate('/lawyer/cyber-law-intel')}
          />
        </div>
      </section>
    </div>
  );
};

// Helper icon component for Lawyer tools
// Helper icon component for Lawyer tools


// 4. Police Tools (Royal Blue Theme)
const PoliceTools = () => {
  return (
    <section className="bg-indigo-50/50 dark:bg-indigo-900/10 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800">
      <SectionHeader
        title="Law Enforcement Toolkit"
        icon={Shield}
        colorClass="bg-indigo-100 dark:bg-indigo-900"
        textColorClass="text-indigo-700 dark:text-indigo-300"
        description="Advanced tools for investigation and intelligence."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ToolCard
          icon={Database}
          title="FIR Intelligence"
          description="Dashboard for analyzing FIR trends and patterns."
        />
        <ToolCard
          icon={FileCheck}
          title="Incident Classifier"
          description="AI-powered tool to classify incidents based on severity and type."
        />
        <ToolCard
          icon={Eye}
          title="OSINT Toolkit"
          description="Open Source Intelligence tools for digital footprint analysis."
        />
        <ToolCard
          icon={Search}
          title="AI Investigator"
          description="Assistant for correlating data points in complex cases."
        />
      </div>
    </section>
  );
};

export default CyberPortal;

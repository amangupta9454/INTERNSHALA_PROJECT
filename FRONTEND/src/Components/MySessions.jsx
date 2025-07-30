import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus, Calendar, Tag, Edit3, BookOpen, Clock, Users, TrendingUp } from 'lucide-react';

const MySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMySessions = async () => {
      try {
        console.log('Fetching my sessions from:', `${import.meta.env.VITE_APP_URL}/sessions/my-sessions`);
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/sessions/my-sessions`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setSessions(response.data);
      } catch (err) {
        console.error('Error fetching sessions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMySessions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading your sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-b border-gray-700/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                My Sessions
              </h1>
              <p className="text-gray-300 text-lg">
                Manage and create your wellness sessions
              </p>
            </div>
            
            <Link
              to="/session"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center lg:justify-start max-w-fit"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
              Create New Session
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Sessions</p>
                <p className="text-3xl font-bold text-white">{sessions.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Active Sessions</p>
                <p className="text-3xl font-bold text-white">{sessions.filter(s => s.status === 'active').length}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Draft Sessions</p>
                <p className="text-3xl font-bold text-white">{sessions.filter(s => s.status === 'draft').length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Engagement</p>
                <p className="text-3xl font-bold text-white">92%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <Calendar className="w-8 h-8 mr-3 text-blue-500" />
              Your Wellness Sessions
            </h2>
          </div>

          {sessions.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-gray-800/30 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-gray-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-2">No Sessions Yet</h3>
              <p className="text-gray-500 mb-8">Create your first wellness session to get started</p>
              <Link
                to="/session"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create First Session
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {sessions.map((session) => (
                <div
                  key={session._id}
                  className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 rounded-xl">
                      <BookOpen className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : session.status === 'draft'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {session.status}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {session.title}
                  </h3>
                  
                  <div className="flex items-center text-gray-400 mb-4">
                    <Tag className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {session.tags && session.tags.length > 0 
                        ? session.tags.join(', ') 
                        : 'No tags'
                      }
                    </span>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to={`/session/${session._id}`}
                      className="inline-flex items-center w-full justify-center bg-gradient-to-r from-gray-700 to-gray-600 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 group/edit"
                    >
                      <Edit3 className="w-4 h-4 mr-2 group-hover/edit:rotate-12 transition-transform" />
                      Edit Session
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySessions;
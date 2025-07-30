import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const SessionEditor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    _id: id || "",
    title: "",
    tags: "",
    json_file_url: "",
    status: "draft",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (id) {
      const fetchSession = async () => {
        setIsLoading(true)
        try {
          console.log("Fetching session from:", `${import.meta.env.VITE_APP_URL}/sessions/my-sessions/${id}`)
          const response = await axios.get(`${import.meta.env.VITE_APP_URL}/sessions/my-sessions/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          setFormData({
            _id: response.data._id,
            title: response.data.title,
            tags: response.data.tags.join(", "),
            json_file_url: response.data.json_file_url,
            status: response.data.status,
          })
        } catch (err) {
          console.error("Error fetching session:", err)
          toast.error("Failed to load session")
        } finally {
          setIsLoading(false)
        }
      }
      fetchSession()
    }
  }, [id])

  useEffect(() => {
    const autoSave = setTimeout(async () => {
      if (formData.title && formData.json_file_url && !isSaving) {
        setIsSaving(true)
        try {
          console.log("Auto-saving to:", `${import.meta.env.VITE_APP_URL}/sessions/my-sessions/save-draft`)
          await axios.post(`${import.meta.env.VITE_APP_URL}/sessions/my-sessions/save-draft`, formData, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          })
          toast.success("Draft auto-saved!", { autoClose: 2000 })
        } catch (err) {
          console.error("Auto-save error:", err)
          toast.error("Auto-save failed")
        } finally {
          setIsSaving(false)
        }
      }
    }, 5000)
    return () => clearTimeout(autoSave)
  }, [formData, isSaving])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e, action) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const endpoint = action === "publish" ? "publish" : "save-draft"
      console.log("Sending request to:", `${import.meta.env.VITE_APP_URL}/sessions/my-sessions/${endpoint}`)
      await axios.post(`${import.meta.env.VITE_APP_URL}/sessions/my-sessions/${endpoint}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      toast.success(action === "publish" ? "Session published!" : "Draft saved!")
      navigate("/my-sessions")
    } catch (err) {
      console.error(`Error ${action} session:`, err)
      toast.error("Action failed")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading && id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="text-gray-300 text-lg">Loading session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{id ? "Edit Session" : "Create New Session"}</h1>
          <p className="text-gray-400 text-lg">
            {id ? "Update your session details" : "Fill in the details to create your session"}
          </p>
          {isSaving && (
            <div className="inline-flex items-center mt-4 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-500/30">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400 mr-2"></div>
              <span className="text-blue-300 text-sm">Auto-saving...</span>
            </div>
          )}
        </div>

        {/* Form Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl p-8">
          <form className="space-y-8">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Session Title
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a compelling title for your session"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            {/* Tags Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200 mb-2">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="e.g., react, javascript, tutorial (comma-separated)"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-xs text-gray-400 mt-1">Separate multiple tags with commas</p>
            </div>

            {/* JSON File URL Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                JSON File URL
                <span className="text-red-400 ml-1">*</span>
              </label>
              <input
                type="url"
                name="json_file_url"
                value={formData.json_file_url}
                onChange={handleChange}
                placeholder="https://example.com/session-data.json"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
              <p className="text-xs text-gray-400 mt-1">Provide a valid URL to your session JSON file</p>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-3 p-4 bg-gray-700/30 rounded-xl border border-gray-600/50">
              <div
                className={`w-3 h-3 rounded-full ${formData.status === "published" ? "bg-green-500" : "bg-yellow-500"}`}
              ></div>
              <span className="text-gray-300 font-medium">
                Status: <span className="capitalize text-white">{formData.status}</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, "save-draft")}
                disabled={isLoading}
                className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  "Save as Draft"
                )}
              </button>

              <button
                type="button"
                onClick={(e) => handleSubmit(e, "publish")}
                disabled={isLoading || !formData.title || !formData.json_file_url}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Publishing...
                  </div>
                ) : (
                  "Publish Session"
                )}
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm">Your changes are automatically saved every 5 seconds</p>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="bg-gray-800 text-white"
      />
    </div>
  )
}

export default SessionEditor

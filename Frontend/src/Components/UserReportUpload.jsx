import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FileUp,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  FileText,
  X,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mlAPI } from "../utils/api";

export default function UserReportUpload() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // null | 'success' | 'error'
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Get user ID from auth state - try multiple paths
  const userId = user?._id || user?.id || user?.userId;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setError(null);
    setUploadStatus(null);
    setUploadResult(null);

    if (!selectedFile) return;

    // Check file type
    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
      return;
    }

    // Check file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadStatus(null);
    setUploadResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file || isUploading) return;

    if (!userId) {
      setError("User not authenticated. Please log in again.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      console.log("Uploading file for userId:", userId);
      const result = await mlAPI.uploadMedicalRecord(userId, file);
      console.log("Upload result:", result);
      setUploadStatus("success");
      setUploadResult(result);
    } catch (err) {
      console.error("Upload error details:", err);
      setUploadStatus("error");
      setError(err.message || "Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate("/main")}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft size={20} className="text-slate-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center shadow-sm">
              <FileUp size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-slate-800 font-semibold text-sm">
                Upload Medical Report
              </h1>
              <p className="text-slate-500 text-xs">
                Upload your reports for AI-powered analysis
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <Sparkles size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-800 text-sm font-medium">
              AI-Powered Report Analysis
            </p>
            <p className="text-blue-600 text-xs mt-1">
              Upload your medical reports (lab results, scans, prescriptions) and our AI will analyze them to provide personalized health insights through the chatbot.
            </p>
          </div>
        </div>

        {/* Upload Area */}
        <div
          onClick={() => !file && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative bg-white rounded-2xl border-2 border-dashed transition-all duration-200 ${
            isDragging
              ? "border-violet-400 bg-violet-50"
              : file
              ? "border-slate-200 cursor-default"
              : "border-slate-200 hover:border-violet-300 hover:bg-violet-50/50 cursor-pointer"
          } p-8`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="upload-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-violet-100 flex items-center justify-center mb-4">
                  <Upload size={28} className="text-violet-500" />
                </div>
                <p className="text-slate-700 font-medium text-sm mb-1">
                  Drop your PDF file here
                </p>
                <p className="text-slate-500 text-xs mb-4">
                  or click to browse from your device
                </p>
                <p className="text-slate-400 text-xs">
                  Maximum file size: 10MB • PDF format only
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="file-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-700 font-medium text-sm truncate">
                    {file.name}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                {!isUploading && uploadStatus !== "success" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile();
                    }}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <X size={18} className="text-slate-400" />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-red-50 border border-red-100 rounded-xl p-3 flex items-center gap-2"
          >
            <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
            <p className="text-red-600 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Success Message */}
        {uploadStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-green-50 border border-green-100 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-green-500" />
              <p className="text-green-700 font-medium text-sm">
                Upload Successful!
              </p>
            </div>
            <p className="text-green-600 text-xs">
              Your medical report has been processed. {uploadResult?.total_chunks_created} sections were analyzed and indexed.
            </p>
          </motion.div>
        )}

        {/* Upload Button */}
        {file && uploadStatus !== "success" && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleUpload}
            disabled={isUploading}
            className={`w-full mt-6 py-3 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
              isUploading
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-sm hover:shadow-md"
            }`}
          >
            {isUploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Processing your report...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload & Analyze Report
              </>
            )}
          </motion.button>
        )}

        {/* Chat CTA after success */}
        {uploadStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-3"
          >
            <button
              onClick={() => navigate("/chat")}
              className="w-full py-3 px-4 rounded-xl font-medium text-sm bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              Ask AI About Your Report
            </button>
            <button
              onClick={handleRemoveFile}
              className="w-full py-3 px-4 rounded-xl font-medium text-sm bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
            >
              Upload Another Report
            </button>
          </motion.div>
        )}

        {/* Guidelines */}
        <div className="mt-8 bg-white rounded-2xl border border-slate-100 p-5">
          <p className="text-slate-700 font-medium text-sm mb-3">
            Supported Report Types
          </p>
          <ul className="space-y-2">
            {[
              "Blood test results (CBC, metabolic panels)",
              "Imaging reports (X-rays, MRI, CT scans)",
              "Lab reports and diagnostic tests",
              "Prescription and medication records",
              "Discharge summaries",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2 text-slate-500 text-xs">
                <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

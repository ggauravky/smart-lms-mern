import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";


function ForgetPassword() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // for Step 1
  const sendOtp = async (e) => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true },
      );
      console.log(result.data);
      setLoading(false);
      setStep(2);
      toast.success("OTP sent successfully. Please check your email.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP. Please try again.");
      setLoading(false);
    }
  };

  //   for Step 2
  const verifyOtp = async (e) => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/verifyotp",
        { email, otp },
        { withCredentials: true },
      );
      console.log(result.data);
      setLoading(false);
      setStep(3);
      toast.success("OTP verified successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify OTP. Please try again.");
      setLoading(false);
    }
  };

  // for Step 3
    const resetPassword = async (e) => {
        setLoading(true);
        try {
            if (newPassword !== confirmPassword) {
                toast.error("Passwords do not match. Please try again.");
                setLoading(false);
                return;
            }
            const result = await axios.post(
                serverUrl + "/api/auth/reset-password",
                { email, newPassword },
                { withCredentials: true },
            );
            console.log(result.data);
            setLoading(false);
            toast.success("Password reset successfully. Please login with your new password.");
            navigate("/login");
        } catch (error) {
            console.error(error);
            toast.error("Failed to reset password. Please try again.");
            setLoading(false);
        }
    }




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* step 1 */}
      {step === 1 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forget Password
          </h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              sendOtp();
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your email address
              </label>
              <input
                id="email"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus: outline-none focus:ring-2 focus:ring-[black]"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <button
              className="w-full ☐ bg-[black] [#4b4b4b] text-white py-2 px-4 rounded-md hover:bg-gray-700 font-medium cursor-pointer"
              disabled={loading}
              onClick={sendOtp}
            >
              {loading ? <ClipLoader color="white" size={30} /> : "Send OTP"}
            </button>
          </form>

          <div
            className="mt-2 text-center cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}

      {/* step 2 */}
      {step === 2 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Please enter the OTP sent to your email address
              </label>
              <input
                id="otp"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus: outline-none focus:ring-2 focus:ring-[black]"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>

            <button
              className="w-full ☐ bg-[black] [#4b4b4b] text-white py-2 px-4 rounded-md hover:bg-gray-700 font-medium cursor-pointer"
              disabled={loading}
              onClick={verifyOtp}
            >
              {loading ? <ClipLoader color="white" size={30} /> : "Verify OTP"}
            </button>
          </form>

          <div
            className="mt-2 text-center cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}

      {/* step 3 */}
      {step === 3 && (
        <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Password
          </h2>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            resetPassword();
          }}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your new password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus: outline-none focus:ring-2 focus:ring-[black]"
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm your new password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus: outline-none focus:ring-2 focus:ring-[black]"
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>

            <button
              className="w-full ☐ bg-[black] [#4b4b4b] text-white py-2 px-4 rounded-md hover:bg-gray-700 font-medium cursor-pointer"
              disabled={loading}
              onClick={resetPassword}
            >
              {loading ? <ClipLoader color="white" size={30} /> : "Reset Password"}
            </button>
          </form>

          <div
            className="mt-2 text-center cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword
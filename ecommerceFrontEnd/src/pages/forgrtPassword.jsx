import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-hot-toast";

export default function ForgotPassword() {

    const [isEmailSent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();


    function sendEmail() {

        api.post("/users/sendOTP", {
            email: email
        }).then(() => {

            toast.success("OTP sent to your email!");

            setIsEmailSent(true);

        }).catch((error) => {

            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to send OTP"
            );

        });

    }


    async function resetPassword() {

        if (newPassword !== confirmPassword) {

            toast.error("Passwords do not match!");

            return;
        }

        try {

            await api.post("/users/verifyotp", {

                email: email,
                otp: otp,
                newPassword: newPassword

            });

            toast.success("Password reset successful!");

            navigate("/login");

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || "Failed to reset password"
            );

        }
    }


    return(
        <>
            <div className="w-full h-screen flex justify-center items-center">

                {!isEmailSent && (

                    <div className="w-[500px] h-[500px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center">

                        <h2 className="text-2xl font-bold mb-4">
                            Forgot Password
                        </h2>

                        <p className="text-lg mb-6">
                            Enter your email to reset your password.
                        </p>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/4"
                        />

                        <button
                            onClick={sendEmail}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Send Reset Link
                        </button>

                    </div>

                )}


                {isEmailSent && (

                    <div className="w-[500px] h-[500px] backdrop-blur-lg rounded-xl shadow-2xl flex flex-col justify-center items-center">

                        <h2 className="text-2xl font-bold mb-4">
                            Forgot Password
                        </h2>

                        <p className="text-lg mb-6">
                            Enter the OTP sent to your email and set a new password.
                        </p>

                        <input
                            type="text"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="bg-transparent border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/4"
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-4 bg-transparent border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/4"
                        />

                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-4 bg-transparent border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/4"
                        />

                        <button
                            onClick={resetPassword}
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Reset Password
                        </button>

                    </div>

                )}

            </div>
        </>
    );
}
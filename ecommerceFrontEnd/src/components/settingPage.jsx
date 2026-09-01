import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

export default function SettingPage() {

    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            api.get("/users/me", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((response) => {
                setUser(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
            }).catch(error => {
                console.log(error);
            });
        }
    }, []);

    async function updateProfile() {
        const token = localStorage.getItem("token");

        try {
            await api.put("/users/", {
                firstName: firstName,
                lastName: lastName
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            toast.success("Profile updated successfully");

        } catch (error) {
            console.log(error);
            toast.error("Failed to update");
        }
    }

    async function updatePassword() {
        const token = localStorage.getItem("token");

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await api.put("/users/password", {
                password: password
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });

            toast.success("Password updated successfully");

            setPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.log(error);
            toast.error("Failed to update password");
        }
    }

    return (
        <div className="min-h-screen bg-primary p-8">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-3xl font-bold text-secondary mb-8">
                    Settings
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Profile */}
                    <div className="bg-white p-6 rounded-lg shadow">

                        <h2 className="text-2xl font-bold text-secondary mb-6">
                            Basic Information
                        </h2>

                        <div className="mb-5">
                            <label className="block text-secondary mb-2">
                                First Name
                            </label>

                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-accent"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-secondary mb-2">
                                Last Name
                            </label>

                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-accent"
                            />
                        </div>

                        <button
                            onClick={updateProfile}
                            className="bg-accent text-primary px-6 py-3 rounded-md hover:opacity-90"
                        >
                            Update Profile
                        </button>

                    </div>

                    {/* Password */}
                    <div className="bg-white p-6 rounded-lg shadow">

                        <h2 className="text-2xl font-bold text-secondary mb-6">
                            Change Password
                        </h2>

                        <div className="mb-5">
                            <label className="block text-secondary mb-2">
                                New Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-accent"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-secondary mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-accent"
                            />
                        </div>

                        <button
                            onClick={updatePassword}
                            className="bg-accent text-primary px-6 py-3 rounded-md hover:opacity-90"
                        >
                            Update Password
                        </button>

                    </div>

                </div>
            </div>

        </div>
    );
}
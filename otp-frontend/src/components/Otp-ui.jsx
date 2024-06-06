// client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../style/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();



	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [otp, setOtp] = useState('');
	const [showOtpField, setShowOtpField] = useState(false);

	const handleLogin = async (e) => {
        e.preventDefault()
        


		try {
			const response =
				await axios.post(`
					 			${import.meta.env.VITE_BACKEND_LOCALHOST}/Login`,
					{
						email,
						password
					}
				);

			if (response.data.message) {
				alert('OTP sent to your email. Check your inbox.');
				setShowOtpField(true);
                
			} else {
				alert(response.data.message);
			}
		// setEmail("")
        // setPassword("")
		} catch (error) {
			console.error('Error during login:', error.message);
			alert('An error occurred during login');
		}
	};

	const handleOtpVerification = async () => {
		try {
			const otpResponse =
				await
					axios.post(`
								${import.meta.env.VITE_BACKEND_LOCALHOST}/verify-otp`,
						{
							otp
						}
					);
				// Redirect to your dashboard or perform any pak! 
				// additional actions for successful login
			if (otpResponse.data.success) {
                navigate("/welcome")
                alert(otpResponse.data.message)
				setOtp("")


				
			} else {
				alert('Invalid OTP. Please try again.');
			}
		} catch (error) {
			console.error('Error during OTP verification:', error.message);
			alert('An error occurred during OTP verification');
		}
	};

	return (
		<div className="login-container">
            {!showOtpField ? (
                <div>
                    <h3>Login use Otp </h3>
                    <input type="email"
                        placeholder="Email"
                        onChange={
                            (e) =>
                                setEmail(e.target.value)} />
                    <input type="password"
                        placeholder="Password"
                        onChange={
                            (e) =>
                                setPassword(e.target.value)} />
             <button className="login-button"
				     onClick={handleLogin}>
				Login
			</button>

                </div>

            ) : (
				<>
					<input type="text"
						placeholder="OTP"
						onChange={
							(e) =>
								setOtp(e.target.value)} />
					<button className="login-button"
						onClick={handleOtpVerification}>
						Verify OTP
					</button>
				</>

            )}		
		</div>
	);
};

export default Login;

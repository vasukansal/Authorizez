import { Meteors } from "../components/meteors";  // Import the Meteors component
import { motion } from "framer-motion"
import Input from "../components/input"
import PasswordStrengthMeter from "../components/passwordStrengthMeter";
import { Lock, Mail, User } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignUp = (e) => {
        e.preventDefault()
    }
    return (



        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
            <Meteors number={25} />
            <div className=" p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                    Create Account
                </h2>
                <form onSubmit={handleSignUp}>
                    <Input icon={User} type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}></Input>
                    <Input icon={Mail} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                    <Input icon={Lock} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                    <PasswordStrengthMeter password={password}></PasswordStrengthMeter>
                    <motion.button className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-fuchsia-800
                     hover:from-blue-600 hover:to-fuchsia-600 text-white font-bold rounded-lg transition duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-gray-900"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit">Sign Up</motion.button>


                </form>
            </div>
            <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
                <p className="text-sm text-gray-400">Already have an account?{" "}
                    <Link to={"/Login"} className="  text-blue-400 font-bold hover:underline"> Login</Link>
                </p>
            </div>

        </motion.div >
    )
}


export default SignUpPage
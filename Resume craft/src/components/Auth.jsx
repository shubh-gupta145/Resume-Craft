// import { useState } from "react";

//  function AuthForm() {
//   const [isLogin, setIsLogin] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isLogin) {
//       alert("Login Successful!");
//     } else {
//       alert("Account Created Successfully!");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
//         <h2 className="text-2xl font-bold text-center mb-6">
//           {isLogin ? "Login" : "Sign Up"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter full name"
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               placeholder="Enter email"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           {!isLogin && (
//             <div>
//               <label className="block text-sm font-medium">
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="Confirm password"
//                 className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-center text-sm mt-4">
//           {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-blue-600 font-medium hover:underline"
//           >
//             {isLogin ? "Sign Up" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }
// export default AuthForm;
import React, { useState } from "react";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 p-4">
      <div className="relative w-full max-w-4xl h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden flex">

        {/* Forms Container */}
        <div
          className={`absolute top-0 left-0 w-[200%] h-full flex transition-transform duration-700 ${
            isSignUp ? "-translate-x-1/2" : "translate-x-0"
          }`}
        >
          {/* Sign In Form (untouched except circles removed) */}
          <div className="w-1/2 flex-shrink-0 flex flex-col justify-center items-start p-6 pl-12">
            <h2 className="text-3xl font-bold mb-4">Sign In</h2>
            {/* Social buttons removed */}
          
            <input type="email" placeholder="Email" className="w-[40%] p-2 mb-3 border rounded-md"/>
            <input type="password" placeholder="Password" className="w-[40%] p-2 mb-3 border rounded-md"/>
            <a href="#" className="text-sm text-purple-600 mb-3">Forgot your password?</a>
            <button className="bg-purple-600 text-white py-2 px-6 rounded-full shadow-md">SIGN IN</button>
          </div>

          {/* Sign Up Form (right-aligned, placeholder left-aligned) */}
          <div className="w-1/2 flex-shrink-0 flex flex-col justify-center items-end p-6 pr-12">
            <h2 className="text-3xl font-bold mb-4 text-center">Create Account</h2>
            {/* Social buttons removed */}
            <input type="text" placeholder="Name" className="w-[40%] p-2 mb-3 border rounded-md text-left"/>
            <input type="email" placeholder="Email" className="w-[40%] p-2 mb-3 border rounded-md text-left"/>
            <input type="password" placeholder="Password" className="w-[40%] p-2 mb-3 border rounded-md text-left"/>
            <button className="bg-purple-600 text-white py-2 px-6 rounded-full shadow-md self-end">SIGN UP</button>
          </div>
        </div>

        {/* Overlay Panels */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-purple-500 to-purple-700 text-white flex flex-col justify-center items-center p-8 transition-transform duration-700 z-10 ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          {isSignUp ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="mb-6 text-center">
                Enter your personal details to use all of site features
              </p>
              <button
                className="bg-white text-purple-700 py-2 px-6 rounded-full shadow-md"
                onClick={() => setIsSignUp(false)}
              >
                SIGN IN
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
              <p className="mb-6 text-center">
                Register with your personal details to use all site features
              </p>
              <button
                className="bg-white text-purple-700 py-2 px-6 rounded-full shadow-md"
                onClick={() => setIsSignUp(true)}
              >
                SIGN UP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;


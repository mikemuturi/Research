// // "use client";
// // import { useRouter, usePathname } from "next/navigation";
// // import { useState } from "react";
// // import { authAPI } from "@/lib/api";

// // export default function RegisterPage() {
// //   const router = useRouter();
// //   const pathname = usePathname();

// //   // auto-detect role from URL
// //   const pathRole = pathname.includes("isp")
// //     ? "isp"
// //     : pathname.includes("admin")
// //     ? "admin"
// //     : "enduser";

// //   const [formData, setFormData] = useState({
// //     username: "",
// //     email: "",
// //     password: "",
// //     role: pathRole,
// //   });

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const res = await authAPI.register(
// //         formData.username,
// //         formData.email,
// //         formData.password,
// //         formData.role
// //       );
// //       const role = res.data.role;

// //       if (role === "admin") router.push("/admin/dashboard");
// //       else if (role === "isp") router.push("/isp/dashboard");
// //       else router.push("/user/dashboard");
// //     } catch (err) {
// //       console.error("Registration failed", err);
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-md mx-auto">
// //       <h1 className="text-xl font-bold mb-4">Register as {pathRole}</h1>
// //       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
// //         <input
// //           type="text"
// //           placeholder="Username"
// //           value={formData.username}
// //           onChange={(e) => setFormData({ ...formData, username: e.target.value })}
// //           className="border p-2 rounded"
// //         />
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={formData.email}
// //           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //           className="border p-2 rounded"
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={formData.password}
// //           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// //           className="border p-2 rounded"
// //         />
// //         <button type="submit" className="bg-blue-600 text-white p-2 rounded">
// //           Register
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// "use client";
// import { useRouter, usePathname } from "next/navigation";
// import { useState } from "react";
// import { authAPI } from "@/lib/api";

// export default function LoginPage() {
//   const router = useRouter();
//   const pathname = usePathname();

//   // auto-detect role from URL
//   const pathRole = pathname.includes("isp")
//     ? "isp"
//     : pathname.includes("admin")
//     ? "admin"
//     : "enduser";

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await authAPI.login(formData.username, formData.password);
//       const role = res.data.role || pathRole;

//       // store tokens if your API returns them
//       if (res.data.access) {
//         localStorage.setItem("access_token", res.data.access);
//         localStorage.setItem("refresh_token", res.data.refresh);
//       }

//       // redirect based on role
//       if (role === "admin") router.push("/admin/dashboard");
//       else if (role === "isp") router.push("/isp/dashboard");
//       else router.push("/user/dashboard");
//     } catch (err) {
//       console.error("Login failed", err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h1 className="text-xl font-bold mb-4">Login as {pathRole}</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//         <input
//           type="text"
//           placeholder="Username"
//           value={formData.username}
//           onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//           className="border p-2 rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//           className="border p-2 rounded"
//         />
//         <button type="submit" className="bg-blue-600 text-white p-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

//import Dashboard from '@/components/admin/Dashboard';

//export default function AdminDashboardPage() {
  //return <Dashboard />;
//}
//
"use client";

import { Suspense } from "react";
import Dashboard from "@/components/admin/Dashboard";

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <Dashboard />
    </Suspense>
  );
}


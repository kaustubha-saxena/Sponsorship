// "use client";

// import { useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "@/lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import { useContext } from "react";
// export default function ProtectedRoute({ children, allowedRole }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (!user) {
//         router.replace("/login");
//         return;
//       }

//       try {
//         const userRef = doc(db, "users", user.uid);
//         const snap = await getDoc(userRef);

//         if (!snap.exists()) {
//           router.replace("/login");
//           return;
//         }

//         const { role } = snap.data();

//         if (role !== allowedRole) {
//           router.replace("/unauthorized");
//           return;
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error("AUTH GUARD ERROR:", err);
//         router.replace("/login");
//       }
//     });

//     return () => unsubscribe();
//   }, [router, allowedRole]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Checking access...</p>
//       </div>
//     );
//   }


//    return children;
 
// }



// "use client";

// import { useEffect, useState } from "react";
// import { getAuth } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { useRouter } from "next/navigation";
// import { useUser } from "@/app/context/UserContext";

// export default function ProtectedRoute({ children, allowedRole }) {
//   const auth = getAuth();
//   const router = useRouter();
//   const { user, setUser } = useUser();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkUser = async () => {
//       const currentUser = auth.currentUser;

//       if (!currentUser) {
//         router.push("/login");
//         return;
//       }

//       // If user already exists in context → skip refetch
//       if (user) {
//         setLoading(false);
//         return;
//       }

//       const userRef = doc(db, "users", currentUser.uid);
//       const userSnap = await getDoc(userRef);

//       if (!userSnap.exists()) {
//         router.push("/login");
//         return;
//       }

//       const userData = userSnap.data();

//       if (allowedRole && userData.role !== allowedRole) {
//         router.push("/unauthorized");
//         return;
//       }

//       setUser({
//         uid: currentUser.uid,
//         name: userData.name,
//         role: userData.role,
//         email: currentUser.email,
//       });

//       setLoading(false);
//     };

//     checkUser();
//   }, []);

//   if (loading) return <p className="p-6">Loading...</p>;

//   return children;
// }






// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@/app/context/UserContext";

// export default function ProtectedRoute({ children, allowedRole }) {
//   const { user, loading } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (loading) return; // ⛔ wait for Firebase

//     if (!user) {
//       router.replace("/login");
//       return;
//     }

//     if (allowedRole && user.role !== allowedRole) {
//       router.replace("/unauthorized");
//     }
//   }, [user, loading, allowedRole, router]);

//   if (loading) {
//     return <p className="p-6">Loading...</p>;
//   }

//   return children;
// }



// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@/app/context/UserContext";

// export default function ProtectedRoute({ children, allowedRole }) {
//   const { user, loading } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (loading) return;

//     if (!user) {
//       router.replace("/login");
//       return;
//     }

//     if (allowedRole && user.role !== allowedRole) {
//       router.replace("/unauthorized");
//     }
//   }, [user, loading, allowedRole, router]);

//   // Don't render children until auth is confirmed
//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
//   }

//   if (!user) {
//     return null; // Redirecting to login
//   }

//   if (allowedRole && user.role !== allowedRole) {
//     return null; // Redirecting to unauthorized
//   }

//   return children;
// }


"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export default function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (allowedRole && user.role !== allowedRole) {
      router.replace("/unauthorized");
    }
  }, [user, loading, allowedRole, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking access...</p>
      </div>
    );
  }

  return children;
}

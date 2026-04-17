import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import GuestRoute from "./pages/GuestRoute";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from './pages/users/Dashboard'
import Profile from './pages/users/Profile'
import PropertyPost from './pages/users/PropertyPost'
import WhyUpgradePlan from './pages/users/WhyUpgradePlan'
import ShowMyPost from './pages/users/ShowMyPost'
import UpgradePostWrapper from './pages/users/UpgradePostWrapper'
import AdminUsersInfo from './pages/admin/AdminUsersInfo'
import UserDetails from './pages/admin/UserDetails'
import AdminProperties from './pages/admin/AdminProperties'
import AdminDashboard from './pages/admin/AdminDashboard'
import PromotionPlan from './pages/admin/PromotionPlan'
import ManageCategory from './pages/admin/ManageCategory'
import ManageAttribute from './pages/admin/ManageAttribute'
import ManageSubCategory from './pages/admin/ManageSubCategory'
import ManageSubCategoryAttribute from './pages/admin/ManageSubCategoryAttribute'
import PostPromotionApproval from './pages/admin/PostPromotionApproval'
import AdminMessages from './pages/admin/AdminMessages'
import Admin from "./pages/Admin";
import User from "./pages/User";
import ContactForm from "./pages/ContactForm";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";

import ProtectedRoute from "./ProtectedRoute";

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Home />} />
<Route path="/search-result" element={<SearchResult />} />
<Route path="/terms" element={<Terms />} />
<Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/post/:id" element={<PostDetails />} />

<Route path="/register" element={<Register />} />

 <Route 
    path="/login" 
    element={
      <GuestRoute>
        <Login />
      </GuestRoute>
    } 
  />

<Route path="/forgot-password" element={<ForgotPassword/>} />
<Route path="/reset-password" element={<ResetPassword/>} />

<Route path="/admin/dashboard" element={
<ProtectedRoute role="admin">
<AdminDashboard/>
</ProtectedRoute>
} />

<Route path="/admin/users" element={
<ProtectedRoute role="admin">
<AdminUsersInfo/>
</ProtectedRoute>
} />

<Route path="/admin/users/:id/details" element={
<ProtectedRoute role="admin">
<UserDetails/>
</ProtectedRoute>
} />

<Route path="/admin/properties" element={
<ProtectedRoute role="admin">
<AdminProperties/>
</ProtectedRoute>
} />

<Route path="/create/promotion-plan" element={
<ProtectedRoute role="admin">
<PromotionPlan/>
</ProtectedRoute>
} />

<Route path="/promotion/list" element={
<ProtectedRoute role="admin">
<PostPromotionApproval/>
</ProtectedRoute>
} />

<Route path="/manage/category" element={
<ProtectedRoute role="admin">
<ManageCategory/>
</ProtectedRoute>
} />

<Route path="/manage/attribute" element={
<ProtectedRoute role="admin">
<ManageAttribute/>
</ProtectedRoute>
} />

<Route path="/manage/sub-category" element={
<ProtectedRoute role="admin">
<ManageSubCategory/>
</ProtectedRoute>
} />

<Route path="/manage/sub-category/attribute" element={
<ProtectedRoute role="admin">
<ManageSubCategoryAttribute/>
</ProtectedRoute>
} />

<Route path="/admin/messages" element={
<ProtectedRoute role="admin">
<AdminMessages/>
</ProtectedRoute>
} />

<Route path="/user/dashboard" element={
<ProtectedRoute role="user">
<Dashboard/>
</ProtectedRoute>
} />


<Route path="/user/profile" element={
<ProtectedRoute role="user">
<Profile/>
</ProtectedRoute>
} />

<Route path="/user/contact" element={
<ProtectedRoute role="user">
<ContactForm/>
</ProtectedRoute>
} />

<Route path="/why/upgrade-plan" element={
<ProtectedRoute role="user">
<WhyUpgradePlan/>
</ProtectedRoute>
} />


<Route path="/create/post" element={
<ProtectedRoute role="user">
<PropertyPost/>
</ProtectedRoute>
} />

<Route path="/show/my-posts" element={
<ProtectedRoute role="user">
<ShowMyPost/>
</ProtectedRoute>
} />


<Route path="/upgrade/:postId" element={
<ProtectedRoute role="user">
<UpgradePostWrapper />
</ProtectedRoute>
} />

</Routes>

</BrowserRouter>

)

}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
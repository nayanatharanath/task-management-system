import { SignOutButton, useUser } from "@clerk/clerk-react";
import React from "react";

function Dashboard() {
  const { user } = useUser();
  return (
    <div>
      Welcome, {user?.firstName}!<SignOutButton>SignOut</SignOutButton>
    </div>
  );
}

export default Dashboard;

import Dashboard from "@/components/Dashboard/Dashboard";
import SideNavbar from "@/components/Dashboard/SideNavbar";

export default function DashboardPage() {
    return (
        <div>
            <SideNavbar text="All Content" />

            <Dashboard/>
        </div>
    )
}
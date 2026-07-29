import Sidebar from "@/Components/Common/Sidebar";
import Navbar from "@/Components/Common/Navbar";
import Footer from "@/Components/Common/Footer";
import FlashMessage from "@/Components/FlashMessage";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100">
            <FlashMessage />

            <Sidebar />

            <div className="min-h-screen pl-64">
                <Navbar />

                <main className="p-6">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
}
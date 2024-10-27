import Navbar from "./components/shared/Navbar";
import Sidebar from "./components/shared/Sidebar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Navbar />
          <Home />
        </main>
      </div>
    </>
  );
}

export default App;

import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-white text-gray-900">
      <Header />
      <main className="flex-grow w-full">
        <Landing />
      </main>
      <Footer />
    </div>
  );
}

export default App;

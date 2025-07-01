import "./App.css";
import { Navbar } from "@/components/Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

function App({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default App;

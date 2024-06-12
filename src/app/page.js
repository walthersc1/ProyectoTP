import Navegation from "@/components/Navegation";
//import Landing from '@/app/Landing/page';
import ChatbotInfo from "@/components/ChatbotInfo";
import Benefits from "@/components/Benefits";

export default function Home({ children }) {
  return (
    <>      
      <ChatbotInfo/>
      <Benefits/>
    </>
    )
}
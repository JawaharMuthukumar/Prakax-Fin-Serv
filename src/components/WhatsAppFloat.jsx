import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { site } from "../data/site";

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={site.whatsappCTA} target="_blank" rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-7 right-7 z-50 w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.35)]"
      style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
    >
      {/* ping ring */}
      <span className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-30" />
      <FaWhatsapp size={26} className="text-white relative z-10" />
    </motion.a>
  );
}

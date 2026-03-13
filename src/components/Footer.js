"use client";

import { Mail, Linkedin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-[#0B1324] text-gray-300 border-t border-[#1F2A44] mt-1">
            <div className="max-w-7xl mx-auto px-6 py-8 text-center">

                <p className="text-sm font-semibold text-white">
                    © 2026 Sponsorship & Marketing Portal 
                </p>

                <p className="mt-3 text-sm">
                    This platform was developed under the guidance of the
                    <span className="font-semibold text-white"> Core Committee (CC)</span>:
                </p>

                {/* CC Names with Links */}
                <p className="text-sm font-medium mt-2 text-gray-200 flex flex-wrap justify-center gap-3">

                    <a
                        href="https://www.linkedin.com/in/arnaav-singh/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        Arnaav Singh
                    </a>

                    •

                    <a
                        href="https://www.linkedin.com/in/shashank-chaudhary-a45664372/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        Shashank Chaudhary
                    </a>

                    •

                    <a
                        href="https://www.linkedin.com/in/manan-sethi-3b237a1b1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        Manan Sethi
                    </a>

                    •

                    <a
                        href="https://www.linkedin.com/in/bhoomi-thakwani-8552111b2/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        Bhoomi Thakwani
                    </a>
                    •

                    <a
                        href="https://www.linkedin.com/in/niyathi-pai-497719309/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        Niyathi Pai

                    </a>
                    •
                    <a
                        href="https://www.linkedin.com/in/dhruveel-shah-b05430294/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                       Dhruveel Shah

                    </a>
                    •

                    <a
                        href="https://www.linkedin.com/in/akanshya-chakraborty/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        Akanshya C
                    </a>
                    •

                    <a
                        href="https://www.linkedin.com/in/yash-bhasin-897536338/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        Yash Bhasin
                    </a>
                    •

                    <a
                        href="https://www.linkedin.com/in/mudit-adideva-3804841b0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        Mudit A
                    </a>
                    •

                    <a
                        href="https://linkedin.com/in/cc4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition"
                    >
                        Aditi
                    </a>

                </p>

                <p className="mt-2 text-sm">
                    With the support and contributions of the
                    <span className="font-semibold text-white"> Sponsorship Team 2025–26</span>.
                </p>

                <p className="mt-4 text-sm">
                    Developed by <span className="font-semibold text-white">Kaustubha Saxena</span>
                </p>

                <p className="text-sm mt-1 text-gray-400">
                    For any future updates, support, or queries regarding this platform,
                    feel free to contact me.
                </p>

                {/* Contact Links */}
                <div className="flex justify-center gap-6 mt-4">

                     <a
            href="mailto:kaustubha@example.com"
            className="flex items-center gap-2 hover:text-blue-400 transition"
          >
            <Mail size={18} />
            kaustubhasaxena@gmail.com
          </a>

          <a
            href="tel:+91XXXXXXXXXX"
            className="flex items-center gap-2 hover:text-blue-400 transition"
          >
            <Phone size={18} />
            +91 9555331875
          </a>

                    <a
                        href="https://www.linkedin.com/in/kaustubha-saxena/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-blue-400 transition"
                    >
                        <Linkedin size={18} />
                        LinkedIn
                    </a>


                </div>

            </div>
        </footer>
    );
}
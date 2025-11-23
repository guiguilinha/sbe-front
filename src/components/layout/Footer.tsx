import * as React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, Linkedin } from "lucide-react";
import LogoSebrae from "@/components/brand/LogoSebrae";
import { QuizExitDialog } from "@/components/brand/QuizExitDialog";
import { useQuizExitConfirmation } from "@/lib";

// Dados para os links do rodapé
const footerNavLinks = [
  { title: "Sebrae Minas Gerais", url: "#" },
  { title: "Quem Somos", url: "#" },
  { title: "Resultados", url: "#" },
  { title: "Notícias", url: "#" },
  { title: "Transparência", url: "#" },
];

const socialLinks = [
  { href: "#", icon: (props: React.SVGProps<SVGSVGElement>) => <Instagram {...props} /> },
  { href: "#", icon: (props: React.SVGProps<SVGSVGElement>) => <Facebook {...props} /> },
  { href: "#", icon: (props: React.SVGProps<SVGSVGElement>) => <Twitter {...props} /> },
  { href: "#", icon: (props: React.SVGProps<SVGSVGElement>) => <Youtube {...props} /> },
  { href: "#", icon: (props: React.SVGProps<SVGSVGElement>) => <Linkedin {...props} /> },
];

function Footer() {
  const {
    isQuiz,
    modalOpen,
    setModalOpen,
    handleMenuClick,
    handleConfirm,
    handleCancel,
  } = useQuizExitConfirmation();

  return (
    <footer className="bg-gray-900 text-white font-poppins px-8">
      <div className="container mx-auto px-4 py-8">
        {/* Navegação Superior do Rodapé */}
        <nav className="flex sm:flex-col lg:flex-row md:flex-row flex-wrap justify-center md:justify-between items-center mb-8">
          {footerNavLinks.map((link) => (
            isQuiz ? (
              <a
                key={link.title}
                href={link.url}
                className="px-3 py-1 text-sm hover:underline"
                onClick={(e) => handleMenuClick(e, link.url)}
                tabIndex={0}
              >
                {link.title}
              </a>
            ) : (
              <Link key={link.title} to={link.url} className="px-3 py-1 text-sm hover:underline">
                {link.title}
              </Link>
            )
          ))}
        </nav>

        {/* Seção Principal do Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Coluna do Telefone */}
          <div className="flex justify-center md:justify-start">
            <a href="tel:08005700800" className="text-xl font-normal tracking-wider hover:text-gray-300">
              0800 570 0800
            </a>
          </div>

          {/* Coluna Central (Ícones Sociais e Copyright) */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                isQuiz ? (
                  <a
                    key={index}
                    href={social.href}
                    className="hover:opacity-80 transition-opacity"
                    onClick={(e) => handleMenuClick(e, social.href)}
                    tabIndex={0}
                    aria-label={`Abrir ${social.href}`}
                  >
                    {social.icon({ className: "h-6 w-6" })}
                  </a>
                ) : (
                  <a
                    key={index}
                    href={social.href}
                    className="hover:opacity-80 transition-opacity"
                    aria-label={`Abrir ${social.href}`}
                  >
                    {social.icon({ className: "h-6 w-6" })}
                  </a>
                )
              ))}
            </div>
            <p className="text-sm text-gray-400">Sebrae Minas © 2024</p>
          </div>

          {/* Coluna do Logo */}
          <div className="flex justify-center md:justify-end">
            <LogoSebrae className="h-12 text-white" />
          </div>
        </div>
      </div>
      {/* Modal de confirmação ao sair do quiz */}
      <QuizExitDialog
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </footer>
  );
}

export default Footer; 
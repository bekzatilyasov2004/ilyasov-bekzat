import Asme from "@/components/Asme";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import GetFeedback from "@/components/GetFeedback";
import Header from "@/components/Header";
import { SparklesPreview } from "@/components/TextBig";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import WorcingProg from "@/components/WorcingProg";
import { people } from "@/constant/People";
import { cn } from "@/lib/utils";
import { FaTelegramPlane, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Home() {


  const words = "With 2+ years of experience building intuitive user interfaces and seamless frontend solutions, I help ideas come to life. Let’s create digital experiences that inspire and engage!"

  return (
    <div className="relative  min-h-screen p-2 pb-10  bg-black overflow-hidden antialiased">

      {/* Background grid */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
        )}
      />
      <div className="w-full max-w-[1200px] mx-auto">




        {/* Spotlight effect */}
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

        {/* Header */}
        <Header />

        {/* Hello Text Top-Center */}
        <div className="absolute w-full mt-15 md:mt-[-70px]  left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <TextHoverEffect text="Hello" />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto p-4 pt-40 md:pt-48 gap-10 md:gap-20">

          {/* Left Text Content */}
          <div className="flex flex-col items-start text-left max-w-xl">
            <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-neutral-500">
              This is Bekzat Ilyasov
            </p>
            <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              UI/UX Designer & Frontend Developer
            </h1>
            <div className="mt-4 text-xs sm:text-sm md:text-base lg:text-lg text-white">
              <TextGenerateEffect className="" words={words} />
            </div>
            <div className="mt-5 w-full   gap-5 flex justify-center md:justify-start text-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="a"
                href="/contact"
                className="bg-none text-white px-5 w-[106px] flex items-center space-x-2 text-sm sm:text-base"
              >
                <span>Say Hello</span>
              </HoverBorderGradient>
            </div>
          </div>


          {/* Right Pixelated Canvas + Social Icons */}
          <div className="relative flex items-center">
            {/* Canvas (hidden on mobile) */}
            <div className="hidden md:block">
              <PixelatedCanvas
                src="santiz.jpg"
                width={400}
                height={500}
                cellSize={3}
                dotScale={0.9}
                shape="square"
                backgroundColor="#000000"
                dropoutStrength={0.4}
                interactive
                distortionStrength={3}
                distortionRadius={80}
                distortionMode="swirl"
                followSpeed={0.2}
                jitterStrength={4}
                jitterSpeed={4}
                sampleAverage
                tintColor="#FFFFFF"
                tintStrength={0.2}
                className="rounded-xl border border-neutral-800 shadow-2xl"
              />
            </div>

            {/* Vertical social icons (desktop only) */}
            <div className="hidden md:flex flex-col absolute -right-12 top-1/2 -translate-y-1/2 gap-6 text-white">
              <a href="https://t.me/https://t.me/bekzat_ilyasov" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
                <FaTelegramPlane size={24} />
              </a>
              <a href="https://instagram.com/bekzat_ilyasov" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
                <FaInstagram size={24} />
              </a>
              <a href="https://github.com/https://github.com/bekzatilyasov2004/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com/in/bekzatilyasov" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal social icons (mobile only) */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex md:hidden gap-6 z-20 text-white">
          <a href="https://t.me/username" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
            <FaTelegramPlane size={20} />
          </a>
          <a href="https://instagram.com/username" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition">
            <FaInstagram size={20} />
          </a>
          <a href="https://github.com/username" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <FaLinkedin size={20} />
          </a>
        </div>

        <Asme />
        {/* <RecentWork /> */}
        <WorcingProg />
        <Education />
        <div className="w-full flex flex-1/2 items-center justify-around md:flex-row flex-col">
        <GetFeedback />
        </div>
        <Footer />
        <SparklesPreview />
      </div>
    </div>
  );
}

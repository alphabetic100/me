import { ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { initParticlesEngine, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Github, Layers2, Linkedin, Mail, Moon, Sun, Twitter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import profileImg from "./assets/my.png";

const PROFILE_IMG = profileImg; // Placeholder, replace with your own if needed

const LINKS = [
  { href: "https://x.com/OmarFaruk0x01", icon: <Twitter size={22} />, label: "X" },
  {
    href: "https://github.com/OmarFaruk-0x01",
    icon: <Github size={22} />,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/omarfaruk-0x01/",
    icon: <Linkedin size={22} />,
    label: "LinkedIn",
  },
  {
    href: "mailto:programmer.omar.dev@gmail.com",
    icon: <Mail size={22} />,
    label: "Email",
  },
  {
    href: "https://corelab.info",
    icon: <Layers2 size={22} className="font-bold text-lg" />,
    label: "CoreLab",
  },
];

function useDarkMode() {
  const [isDark, setIsDark] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return [isDark, setIsDark] as const;
}

export default function App() {
  const [isDark, setIsDark] = useDarkMode();
  const [init, setInit] = useState(false);


  // this should be run only once per application lifetime
  useEffect(() => {
    setIsDark(true);
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: isDark ? "#ffffff" : "#000000",
        },
        links: {
          color: isDark ? "#ffffff" : "#000000",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 50,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [isDark],
  );


  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black duration-200 relative overflow-hidden">
      {/* Particle Background */}
      { init && <Particles
        id="tsparticles"
        className="absolute inset-0 w-full h-full z-0"
        options={options}
      />}
      {/* Main Content */}
      <div className="flex flex-col items-center z-10">
        <div className="flex flex-row items-center gap-6 mb-6">
          <img
            src={PROFILE_IMG}
            alt="Omar Faruk"
            className="rounded-full w-20 h-20 object-cover border border-gray-400 dark:border-white shadow-lg duration-200"
          />
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-semibold text-black dark:text-white mb-1 duration-200">
              Hi, I'm Omar Faruk
            </h1>
            <p className="text-base text-gray-500 dark:text-gray-300 duration-200">
              Product Engineer at <a href="https://klasio.com" className="hover:underline text-blue-400">Klasio</a>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 mb-8">
          <span></span>
          <span className="mr-5"></span>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-gray-400 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <button
          onClick={() => setIsDark((v) => !v)}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="rounded-full p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors focus:outline-none duration-0"
        >
          {isDark ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
}

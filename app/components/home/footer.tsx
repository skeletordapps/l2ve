import Link from "next/link";

export default function Footer() {
  const socials = [
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-twitter-x"
          viewBox="0 0 16 16"
        >
          <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
        </svg>
      ),
      href: "https://twitter.com/L2veofficial",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          fill="currentColor"
          className="bi bi-telegram"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
        </svg>
      ),
      href: "// https://t.me/L2veportal",
    },
    {
      svg: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 1260 1260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1_2)">
            <path
              d="M947.747 1259.61H311.861C139.901 1259.61 0 1119.72 0 947.752V311.871C0 139.907 139.901 0.00541362 311.861 0.00541362H947.747C1119.71 0.00541362 1259.61 139.907 1259.61 311.871V947.752C1259.61 1119.72 1119.71 1259.61 947.747 1259.61Z"
              fill="#472A91"
            ></path>
            <path
              d="M826.513 398.633L764.404 631.889L702.093 398.633H558.697L495.789 633.607L433.087 398.633H269.764L421.528 914.36H562.431L629.807 674.876L697.181 914.36H838.388L989.819 398.633H826.513Z"
              fill="white"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_1_2">
              <rect width="1259.61" height="1259.61" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      ),
      href: "https://warpcast.com/l2ve",
    },
    {
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          fill="currentColor"
          className="bi bi-medium"
          viewBox="0 0 16 16"
        >
          <path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8m4.95 0c0 2.34-1.01 4.236-2.256 4.236S9.463 10.339 9.463 8c0-2.34 1.01-4.236 2.256-4.236S13.975 5.661 13.975 8M16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795" />
        </svg>
      ),
      href: "https://medium.com/@L2veofficial",
    },
  ];
  return (
    <div className="font-medium flex flex-col text-white dark:text-dark-love border-t-2 py-16 sm:py-24 sm:pb-[200px] mt-24 w-full px-6 sm:px-[80px] md:px-12 xl:px-[160px] gap-10 dark:bg-black/50">
      <p className="text-[24px] xl:text-[40px] sm:leading-[40px]">
        Receive Updates about where Cupid Inu is heading next!
      </p>
      <p className="text-[15px] tracking-[-2%] text-white dark:text-dark-love/70">
        Just join our Community and never get left behind!
      </p>
      <p className="flex items-center gap-6 mt-[-20px] scale-[0.8] ml-[-40px] md:ml-0 md:scale-100">
        {socials.map((social, index) => (
          <Link
            key={index}
            target="blank"
            href={social.href}
            className="transition-all hover:scale-[1.05]"
          >
            {social.svg}
          </Link>
        ))}
      </p>
    </div>
  );
}

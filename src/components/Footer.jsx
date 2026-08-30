import { site } from "../constants/site";

const YEAR = new Date().getFullYear();

const Footer = () => (
  <footer className="mx-auto w-full max-w-[96rem] px-6 pb-10 sm:px-10 lg:px-16">
    <div className="flex flex-col gap-4 border-t border-[color:var(--hairline)] pt-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[13px] font-normal text-grey">
        © {YEAR} {site.name} — {site.role}
      </p>
      <a
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="link-underline text-[13px] font-normal text-grey"
      >
        Back to top
      </a>
    </div>
  </footer>
);

export default Footer;

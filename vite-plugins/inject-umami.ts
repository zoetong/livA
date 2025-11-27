import type { Plugin } from "vite";
import { loadEnv } from "vite";

export function injectUmami({ mode }: { mode: string }): Plugin {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    name: "vite-plugin-inject-umami",
    apply: "build",
    transformIndexHtml(html) {
      if (mode === "production") {
        console.log("Injecting Umami script...", env.VITE_UMAMI_WEBSITE_ID);
        return {
          html,
          tags: [
            {
              tag: "script",
              attrs: {
                defer: true,
                src: "https://mr-stage.sensetime.com/umami/script.js",
                "data-website-id": env.VITE_UMAMI_WEBSITE_ID,
              },
              injectTo: "head", // 也可以是 "body"
            },
          ],
        };
      }
      return html;
    },
  };
}

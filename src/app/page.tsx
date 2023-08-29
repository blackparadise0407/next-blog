import os from "os";

import PostLine from "./components/PostLine";
import Prompt from "./components/Prompt";
import { getAllPosts } from "./lib/api";

export default async function Home() {
  const { type, platform, memUsage, cpus, version, release, machine } =
    getSystemInfo();
  const posts = await getAllPosts({
    select: ["title", "slug", "date", "content", "author", "archive"],
    filters: {
      archive: false,
    },
  });
  return (
    <main>
      <p>
        Welcome to{" "}
        <a className="link font-bold" href="/">
          Elykp dev blog
        </a>{" "}
        {version} ({type} {release}-{platform} {machine})
        {/* 20.04 LTS (GNU/Linux 5.10.60.1-microsoft-standard-WSL2 x86_64) */}
      </p>
      <div className="p-3">
        <table>
          <tbody>
            <tr>
              <td className="whitespace-pre">* Linkedin:</td>
              <td>
                <a
                  className="link"
                  href="https://www.linkedin.com/in/khoa-pham-a61a471a5"
                >
                  https://www.linkedin.com/in/khoa-pham-a61a471a5
                </a>
              </td>
            </tr>
            <tr>
              <td className="whitespace-pre">* Github:</td>
              <td>
                <a className="link" href="https://github.com/blackparadise0407">
                  https://github.com/blackparadise0407
                </a>
              </td>
            </tr>
            <tr>
              <td className="whitespace-pre">* Contact:</td>
              <td>
                <a className="link" href="mailto:phamddangkhoa@gmail.com">
                  phamddangkhoa@gmail.com
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="my-2">
          System information as of {new Date().toUTCString()}
        </p>
        <div className="flex gap-5 items-start">
          <table>
            <tbody>
              <tr>
                <td>System load:</td>
                <td>0.0</td>
              </tr>
              <tr>
                <td>Usage of /:</td>
                <td>0.4% of 250.98GB</td>
              </tr>
              <tr>
                <td>Memory usage:</td>
                <td>{(memUsage * 100).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Swap usage:</td>
                <td>0%</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <td>Processes:</td>
                <td>{cpus}</td>
              </tr>
              <tr>
                <td>Users logged in:</td>
                <td>1</td>
              </tr>
              <tr>
                <td>IPv4 address for eth0:</td>
                <td>172.24.219.129</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p>0 updates can be installed immediately.</p>
      <p>0 of these updates are security updates.</p>
      <div className="my-7">
        <p>The list of available updates is more than a week old.</p>
        <p>To check for new updates run: sudo apt update</p>
      </div>
      <Prompt>ls -al</Prompt>
      <p>total {posts.length}</p>
      {posts.map((post) => (
        <PostLine key={post.slug} post={post} />
      ))}
      <Prompt>
        <span className="animate-blink">|</span>
      </Prompt>
    </main>
  );
}

function getSystemInfo() {
  return {
    memUsage: 1 - os.freemem() / os.totalmem(),
    cpus: os.cpus().length,
    platform: os.platform(),
    release: os.release(),
    version: os.version(),
    machine: os.machine?.(),
    type: os.type(),
  };
}

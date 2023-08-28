import { getAllPosts } from "./lib/api";

export default async function Home() {
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
        <a className="underline" href="">
          Elykp dev blog
        </a>{" "}
        20.04 LTS (GNU/Linux 5.10.60.1-microsoft-standard-WSL2 x86_64)
      </p>
      <div className="p-3">
        <table>
          <tbody>
            <tr>
              <td>* Linkedin:</td>
              <td>
                <a href="https://www.linkedin.com/in/khoa-pham-a61a471a5">
                  https://www.linkedin.com/in/khoa-pham-a61a471a5
                </a>
              </td>
            </tr>
            <tr>
              <td>* Github:</td>
              <td>
                <a href="https://github.com/blackparadise0407">
                  https://github.com/blackparadise0407
                </a>
              </td>
            </tr>
            <tr>
              <td>* Contact:</td>
              <td>
                <a href="mailto:phamddangkhoa@gmail.com">
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
                <td>6%</td>
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
                <td>8</td>
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
      <p>
        <span className="text-lime-500">kyle@DESKTOP-PUD1VAS</span>:
        <span className="text-blue-600">~</span>$ ls -al
      </p>
      <p>total {posts.length}</p>
      <table>
        <tbody>
          {posts.map((post) => {
            const date = new Date((post.date ?? 0) * 1000);
            return (
              <>
                <tr key={post.slug}>
                  <td>-rw-r--r--</td>
                  <td>{post.author}</td>
                  <td>{post.content?.replaceAll(" ", "").length}</td>
                  <td>{date.toLocaleString("en-US", { month: "short" })}</td>
                  <td>{date.getDate()}</td>
                  <td>{date.getFullYear()}</td>
                  <td>
                    <a className="hover:text-blue-500" href={post.slug}>
                      {post.title}
                    </a>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <p>
        <span className="text-lime-500">kyle@DESKTOP-PUD1VAS</span>:
        <span className="text-blue-600">~</span>${" "}
        <span className="animate-blink">|</span>
      </p>
    </main>
  );
}

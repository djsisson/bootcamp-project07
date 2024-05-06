import "./Tags.css";
import { useFetcher,NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Tags() {
    const [search, setSearch] = useState("")
  const fetcher = useFetcher();
  useEffect(() => {
    if (fetcher.state === "idle" && !fetcher.data) {
      fetcher.load(`tags`);
    }
  }, [fetcher]);

  const searching = fetcher.state=="idle" ? true : false

  const onChange = (e) => {
    setSearch(e.target.value)
    fetcher.submit({tag: e.target.value},{method: "get", action: `tags/${e.target.value}`})
  }
  return (
    <fetcher.Form id="tags" method="get" action={`tags/${search}`}>
      <h1>Search</h1>
      <div id="tag-search">
        <input
          id="q"
          aria-label="Search"
          placeholder="Search"
          type="search"
          name="tag"
          onChange={onChange}
        />
        <div id="search-spinner" aria-hidden hidden={searching} />
      </div>
      <nav>
        <ul>
          {fetcher.data? fetcher.data.map((tag) => {
            return (
              <li key={tag.id}>
                <NavLink to={`/Posts/tag/${tag.tag.slice(1)}`}>{tag.tag}</NavLink>
              </li>
            );
          }): <div>{fetcher.state}</div>}
        </ul>
      </nav>
    </fetcher.Form>
  );
}

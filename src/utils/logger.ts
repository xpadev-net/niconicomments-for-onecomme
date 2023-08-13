const info = (all: unknown) => {
  const dom = document.createElement("div");
  dom.innerHTML = JSON.stringify(all);
  dom.classList.add("info");
  document.getElementById("app")?.append(dom);
  setTimeout(() => dom.remove(), 10000);
};

export { info };

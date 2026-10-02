// @ts-ignore: foliate-js has no type definitions
import "./foliate-js/view.js";

const viewer = document.getElementById("viewer")!;
const fileInput = document.getElementById("file") as HTMLInputElement;
let view: any = null;

async function openBook(file: File) {
  viewer.innerHTML = "";
  view = document.createElement("foliate-view");
  view.style.cssText = "display:block;width:100%;height:100%";
  viewer.append(view);

  // Register the listener before opening, so the first page is covered
  view.addEventListener("load", (e: CustomEvent) => {
    const { doc } = e.detail;
    doc.addEventListener("pointerup", () => {
      const text = doc.getSelection()?.toString();
      if (text) console.log("Selected:", text);
    });
  });

  await view.open(file);
  view.renderer.next(); // show the first page
}

fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];
  if (file) openBook(file);
});

document.getElementById("prev")!.onclick = () => view?.prev();
document.getElementById("next")!.onclick = () => view?.next();

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") view?.prev();
  if (e.key === "ArrowRight") view?.next();
});
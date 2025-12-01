import "./button-styles.scss";

function initFunc() {
  console.log("Webpack is working!");
  const btn = document.createElement("button");
  btn.textContent = "Click Me";
  btn.className = "sample-btn";
  document.body.appendChild(btn);
}

export default initFunc;

import "./navigation-bar.scss";

class NavigationBar {
  render(navigationItems) {
    const liItems = navigationItems
      .map((item) => `<li><a href="${item.path}">${item.name}</a></li>`)
      .join("");

    const ul = document.createElement("ul");
    ul.innerHTML = liItems;
    ul.classList.add("navigation-bar");
    document.querySelector("body").appendChild(ul);
  }
}

export default NavigationBar;

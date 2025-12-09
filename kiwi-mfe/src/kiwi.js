import Heading from "./components/heading/heading.js";
import KiwiImage from "./components/kiwi-image/kiwi-image.js";

const heading = new Heading();
heading.render("kiwi");
const kiwiImage = new KiwiImage();
kiwiImage.render();

import("HelloWorldApp/HelloWorldPage").then((HelloWorldModule) => {
  const HelloWorldPage = HelloWorldModule.default;
  const helloPage = new HelloWorldPage();
  helloPage.render();
});

import("ImageCaptionApp/ImageCaptionComponent").then((ImageCaptionModule) => {
  const ImageCaptionComponent = ImageCaptionModule.default;
  const imageCaptionComponent = new ImageCaptionComponent();
  imageCaptionComponent.render();
});

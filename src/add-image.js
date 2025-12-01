import webpackLogo from './webpack.png';
function addImage() {
    const img = document.createElement('img');
    img.alt = 'Webapck logo';
    img.width = 1200;
    img.height = 600;
    img.src = webpackLogo;

    const body = document.querySelector('body');
    body.appendChild(img);
}

export default addImage;
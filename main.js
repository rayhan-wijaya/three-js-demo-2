// @ts-check

import * as three from "three";

const scene = new three.Scene();

const fieldOfView = 70;
const aspect = window.innerWidth / innerHeight;
const range = { near: 0.1, far: 1000 };

const camera = new three.PerspectiveCamera(
    fieldOfView,
    aspect,
    range.near,
    range.far
);

const renderer = new three.WebGLRenderer({
    antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const cube = new three.Mesh(
    new three.BoxGeometry(1, 1, 1),
    new three.MeshBasicMaterial({ color: 0x00ff00 })
);

scene.add(cube);

const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

animate();

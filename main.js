// @ts-check

import * as three from "three";

const scene = new three.Scene();

const createCamera = function () {
    const fieldOfView = 70;
    const aspect = window.innerWidth / window.innerHeight;
    const range = { near: 0.1, far: 1000 };

    const camera = new three.PerspectiveCamera(
        fieldOfView,
        aspect,
        range.near,
        range.far
    );

    camera.position.z = 5;

    return camera;
};

const createRenderer = function () {
    const renderer = new three.WebGLRenderer({
        antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = three.PCFSoftShadowMap;

    return renderer;
};

const createAssets = function () {
    const cube = new three.Mesh(
        new three.BoxGeometry(1, 1, 1),
        new three.MeshStandardMaterial({
            color: new three.Color("rgb(255, 255, 255)"),
        })
    );

    cube.receiveShadow = false;
    cube.castShadow = true;

    const plane = new three.Mesh(
        new three.PlaneGeometry(3, 3, 32, 32),
        new three.MeshStandardMaterial({
            color: new three.Color("rgb(80, 80, 80)"),
        })
    );

    plane.receiveShadow = true;

    plane.rotation.z = 180;
    plane.rotation.x = 250;

    plane.position.y = -1;

    const light = new three.DirectionalLight(
        new three.Color("rgb(255, 255, 255)"),
        1
    );
    
    light.position.set(0, 3, 0);
    light.castShadow = true;

    light.shadow.mapSize.width = 512;
    light.shadow.mapSize.height = 512;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;

    return { cube, plane, light };
};

/**
 * @typedef {object} GenerateAnimateFnParameters
 * @property {three.WebGLRenderer} renderer
 * @property {three.Camera} camera
 * @property {ReturnType<typeof createAssets>} assets
 */

/**
 * @param {GenerateAnimateFnParameters} args
 */
const generateAnimateFn = function ({ camera, renderer, assets }) {
    let increment = 1;

    const animate = function () {
        requestAnimationFrame(animate);

        assets.cube.rotation.x += 0.03;
        assets.cube.rotation.y += 0.07;

        increment++;
        assets.cube.position.y = 0.8 * Math.sin((Math.PI * increment) / 35);

        assets.plane.rotation.z += 0.03;

        renderer.render(scene, camera);
    };

    return animate;
};

const main = function () {
    const renderer = createRenderer();
    const camera = createCamera();

    document.body.appendChild(renderer.domElement);

    const assets = createAssets();
    scene.add(...Object.values(assets));

    generateAnimateFn({
        assets,
        renderer,
        camera,
    })();
};

main();

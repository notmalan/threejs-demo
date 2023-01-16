import { add } from "lodash";
import * as THREE from "three";
import { ArrayCamera } from "three";
// import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { createScene, renderer } from "../app.js";

const sceneInitInstructions = {
    "orbit-a": (htmlElement) => {
        const group = new THREE.Group();
        const lights = [];

        const sunSphere = new THREE.SphereGeometry(0.2, 16, 16);
        const greenSphere = new THREE.SphereGeometry(0.12, 16, 16);

        const sunMaterial = new THREE.MeshStandardMaterial({
            emissive: "#f6c204",
            emissiveIntensity: 1,
            flatShading: true,
        });
        const greenMaterial = new THREE.MeshPhongMaterial({
            color: "green",
            flatShading: true,
        });

        const sun = new THREE.Mesh(sunSphere, sunMaterial);
        group.add(sun);
        const greenPlanet = new THREE.Mesh(greenSphere, greenMaterial);
        group.add(greenPlanet);

        const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 50);
        camera.position.set(-3.116219436748396, 3.786225031968696, 1);
        camera.lookAt(0, 0, 0);

        const pointLight = new THREE.PointLight(0x404040, 4, 100);
        pointLight.position.set(0, 0, 0);
        lights.push(pointLight);

        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        lights.push(ambientLight);

        const { scene } = createScene(group, camera, lights);

        return (elapsedTime, canvasBounds) => {
            camera.apsect = canvasBounds.width / canvasBounds.height;
            camera.updateProjectionMatrix();

            greenPlanet.rotation.y = elapsedTime * 0.3;
            greenPlanet.position.x = Math.cos(elapsedTime * 0.5) * 1.2;
            greenPlanet.position.z = Math.sin(elapsedTime * 0.5) * 1.2;

            renderer.render(scene, camera);
        };
    },
    "orbit-b": (htmlElement) => {
        const group = new THREE.Group();
        const lights = [];

        const sunSphere = new THREE.SphereGeometry(0.2, 16, 16);
        const pearlSphere = new THREE.SphereGeometry(0.1, 16, 16);
        const redSphere = new THREE.SphereGeometry(0.3, 16, 16);
        const greenSphere = new THREE.SphereGeometry(0.12, 32, 32);
        const blueSphere = new THREE.SphereGeometry(0.5, 32, 32);

        const sunMaterial = new THREE.MeshStandardMaterial({
            emissive: "#f6c204",
            emissiveIntensity: 1,
            flatShading: true,
        });
        const pearlMaterial = new THREE.MeshPhongMaterial({
            color: "#EAE0C8",
            flatShading: true,
        });
        const redMaterial = new THREE.MeshPhongMaterial({
            color: "red",
            flatShading: true,
        });
        const greenMaterial = new THREE.MeshPhongMaterial({
            color: "green",
            flatShading: true,
        });
        const blueMaterial = new THREE.MeshPhongMaterial({
            color: "blue",
            flatShading: true,
        });

        const sun = new THREE.Mesh(sunSphere, sunMaterial);
        group.add(sun);

        const pearlPlanet = new THREE.Mesh(pearlSphere, pearlMaterial);
        group.add(pearlPlanet);

        const redPlanet = new THREE.Mesh(redSphere, redMaterial);
        group.add(redPlanet);

        const greenPlanet = new THREE.Mesh(greenSphere, greenMaterial);
        group.add(greenPlanet);

        const bluePlanet = new THREE.Mesh(blueSphere, blueMaterial);
        group.add(bluePlanet);

        const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 50);
        camera.position.set(
            5.116219436748396,
            10.786225031968696,
            2.5713404980124652
        );
        camera.lookAt(0, 0, 0);

        const pointLight = new THREE.PointLight(0x404040, 4, 100);
        pointLight.position.set(0, 0, 0);
        lights.push(pointLight);

        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        lights.push(ambientLight);

        const controls = new OrbitControls(camera, htmlElement);
        // controls.enableRotate = false

        const { scene } = createScene(group, camera, lights);

        // const axesHelper = new THREE.AxesHelper()
        // scene.add(axesHelper)

        return (elapsedTime, canvasBounds) => {
            // console.log(camera.position)
            pearlPlanet.rotation.y = elapsedTime * 0.5;
            pearlPlanet.position.x = Math.cos((elapsedTime + 20) * 0.5) * 1;
            pearlPlanet.position.z = Math.sin((elapsedTime + 20) * 0.5) * 1;

            greenPlanet.rotation.y = elapsedTime * 0.3;
            greenPlanet.position.x = Math.cos(elapsedTime * 0.5) * 1.2;
            greenPlanet.position.z = Math.sin(elapsedTime * 0.5) * 1.2;

            redPlanet.rotation.y = elapsedTime * 0.3;
            redPlanet.position.x = Math.cos((elapsedTime + 10) * 0.2) * 2.5;
            redPlanet.position.z = Math.sin((elapsedTime + 10) * 0.2) * 2.5;

            bluePlanet.rotation.y = elapsedTime * 0.2;
            bluePlanet.position.x = Math.cos(elapsedTime * 0.15) * 4;
            bluePlanet.position.z = Math.sin(elapsedTime * 0.15) * 4;

            camera.apsect = canvasBounds.width / canvasBounds.height;
            camera.updateProjectionMatrix();

            controls.update();
            renderer.render(scene, camera);
        };
    },
    "orbit-c": (htmlElement) => {
        const group = new THREE.Group();
        const lights = [];

        const sunSphere = new THREE.SphereGeometry(0.2, 16, 16);
        const pearlSphere = new THREE.SphereGeometry(0.1, 16, 16);
        const redSphere = new THREE.SphereGeometry(0.3, 16, 16);
        const greenSphere = new THREE.SphereGeometry(0.12, 32, 32);
        const blueSphere = new THREE.SphereGeometry(0.5, 32, 32);

        const sunMaterial = new THREE.MeshStandardMaterial({
            emissive: "#f6c204",
            emissiveIntensity: 1,
            flatShading: true,
        });
        const pearlMaterial = new THREE.MeshPhongMaterial({
            color: "#EAE0C8",
            flatShading: true,
        });
        const redMaterial = new THREE.MeshPhongMaterial({
            color: "red",
            flatShading: true,
        });
        const greenMaterial = new THREE.MeshPhongMaterial({
            color: "green",
            flatShading: true,
        });
        const blueMaterial = new THREE.MeshPhongMaterial({
            color: "blue",
            flatShading: true,
        });

        const leftStarMaterial = new THREE.MeshPhongMaterial({
            color: "white",
        })

        const rightStarMaterial = new THREE.MeshPhongMaterial({
            color: "red"
        })

        const forwardStarMaterial = new THREE.MeshPhongMaterial({
            color: "blue",
            emissive: "blue",
            emissiveIntensity: 3
        })

        const greenStarMaterial = new THREE.MeshPhongMaterial({
            color: "green",
        })

        const orangeStarMaterial = new THREE.MeshPhongMaterial({
            color: "orange"
        })

        const starGeometry = new THREE.SphereGeometry(0.009, 16, 16)

        for(let i = 0; i < 1000; i++) {
            const starLayer1 = new THREE.Mesh(starGeometry, leftStarMaterial)
            starLayer1.position.x = -20
            starLayer1.position.y = (Math.random() - 0.5) * 60
            starLayer1.position.z = (Math.random() - 0.5) * 50

            const starLayer2= new THREE.Mesh(starGeometry, forwardStarMaterial)
            starLayer2.position.x = -40
            starLayer2.position.y = (Math.random() - 0.5) * 60
            starLayer2.position.z = (Math.random() - 0.5) * 50

            group.add(starLayer1)
            group.add(starLayer2)
        }

        for(let i = 0; i < 3000; i++) {
            const starLayer1 = new THREE.Mesh(starGeometry, leftStarMaterial)
            starLayer1.position.x = 20
            starLayer1.position.y = (Math.random() - 0.5) * 60
            starLayer1.position.z = (Math.random() - 0.5) * 40

            const starLayer2= new THREE.Mesh(starGeometry, forwardStarMaterial)
            starLayer2.position.x = 40
            starLayer2.position.y = (Math.random() - 0.5) * 60
            starLayer2.position.z = (Math.random() - 0.5) * 50


            group.add(starLayer1)
            group.add(starLayer2)
        }

        for(let i = 0; i < 3000; i++) {
            const starLayer1 = new THREE.Mesh(starGeometry, leftStarMaterial)
            starLayer1.position.x = (Math.random() - 0.5) * 50
            starLayer1.position.y = (Math.random() - 0.5) * 60
            starLayer1.position.z = 20

            const starLayer2= new THREE.Mesh(starGeometry, forwardStarMaterial)
            starLayer2.position.x = (Math.random() - 0.5) * 50
            starLayer2.position.y = (Math.random() - 0.5) * 60
            starLayer2.position.z = 40

            group.add(starLayer1)
            group.add(starLayer2)
        }

        for(let i = 0; i < 3000; i++) {
            const starLayer1 = new THREE.Mesh(starGeometry, leftStarMaterial)
            starLayer1.position.x = (Math.random() - 0.5) * 50
            starLayer1.position.y = (Math.random() - 0.5) * 60
            starLayer1.position.z = -20

            const starLayer2= new THREE.Mesh(starGeometry, forwardStarMaterial)
            starLayer2.position.x = (Math.random() - 0.5) * 50
            starLayer2.position.y = (Math.random() - 0.5) * 60
            starLayer2.position.z = -40

            group.add(starLayer1)
            group.add(starLayer2)
        }




        const sun = new THREE.Mesh(sunSphere, sunMaterial);
        group.add(sun);

        const pearlPlanet = new THREE.Mesh(pearlSphere, pearlMaterial);
        group.add(pearlPlanet);

        const redPlanet = new THREE.Mesh(redSphere, redMaterial);
        group.add(redPlanet);

        const greenPlanet = new THREE.Mesh(greenSphere, greenMaterial);
        group.add(greenPlanet);

        const bluePlanet = new THREE.Mesh(blueSphere, blueMaterial);
        group.add(bluePlanet);

        const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 500);
        camera.position.set(
            5.116219436748396,
            10.786225031968696,
            2.5713404980124652
        );
        camera.lookAt(0, 0, 0);

        const pointLight = new THREE.PointLight(0x404040, 4, 100);
        pointLight.position.set(0, 0, 0);
        lights.push(pointLight);

        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        lights.push(ambientLight);

        const controls = new OrbitControls(camera, htmlElement);
        // controls.enableRotate = false

        const { scene } = createScene(group, camera, lights);

        // const axesHelper = new THREE.AxesHelper()
        // scene.add(axesHelper)

        return (elapsedTime, canvasBounds) => {
            // console.log(camera.position)
            pearlPlanet.rotation.y = elapsedTime * 0.5;
            pearlPlanet.position.x = Math.cos((elapsedTime + 20) * 0.5) * 1;
            pearlPlanet.position.z = Math.sin((elapsedTime + 20) * 0.5) * 1;

            greenPlanet.rotation.y = elapsedTime * 0.3;
            greenPlanet.position.x = Math.cos(elapsedTime * 0.5) * 1.2;
            greenPlanet.position.z = Math.sin(elapsedTime * 0.5) * 1.2;

            redPlanet.rotation.y = elapsedTime * 0.3;
            redPlanet.position.x = Math.cos((elapsedTime + 10) * 0.2) * 2.5;
            redPlanet.position.z = Math.sin((elapsedTime + 10) * 0.2) * 2.5;

            bluePlanet.rotation.y = elapsedTime * 0.2;
            bluePlanet.position.x = Math.cos(elapsedTime * 0.15) * 4;
            bluePlanet.position.z = Math.sin(elapsedTime * 0.15) * 4;

            camera.apsect = canvasBounds.width / canvasBounds.height;
            camera.updateProjectionMatrix();

            controls.update();
            renderer.render(scene, camera);
        };
    },
};

export { sceneInitInstructions };

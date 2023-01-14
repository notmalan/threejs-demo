import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

const canvas = document.createElement('canvas')

const scenes = []
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setScissorTest(true)

// Step 4/5: push a scene to the scenes array
const addScene = (scene, sceneRenderFunction) => {
    const sceneContext = document.createElement('canvas').getContext('2d')
    scene.append(sceneContext.canvas)
    let canvasBounds = scene.getBoundingClientRect()
    scenes.push({ scene, canvasBounds, sceneContext, sceneRenderFunction })
}

// Step 3/5: create a new scene, add to it components associated with that scene, then return that scene
const createScene = (objects, camera, lighting = false) => {
    const scene = new THREE.Scene()
    scene.add(objects)
    scene.add(camera)
    if(lighting) {
        scene.add(lighting)
    }
    return { scene }
}

// Step 2/5: apply instructions for setting up each scene, returns a scene render function
const sceneInitInstructions = {
    'cube': (htmlElement) => {

        const geometry = new THREE.BoxGeometry(1,1,1)
        const material = new THREE.MeshPhongMaterial()
        const mesh = new THREE.Mesh(geometry, material)
        material.color.set('red')

        const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 5)
        camera.position.set(0, 1, 2)
        camera.lookAt(mesh.position)

        const lighting = new THREE.AmbientLight(0x404040)
        lighting.position.set(-1, 2, 4)

        const controls = new TrackballControls(camera, htmlElement)
        controls.noZoom = true
        controls.noPan = true

        const { scene } = createScene(mesh , camera, lighting, controls)

        return (elapsedTime, canvasBounds) => {
            mesh.rotation.y = elapsedTime * 0.3
            camera.apsect = canvasBounds.width / canvasBounds.height
            camera.updateProjectionMatrix()
            controls.handleResize()
            controls.update()
            renderer.render(scene, camera)
        }
    },
    'diamond': (htmlElement) => {
        const geometry = new THREE.SphereGeometry(.8, 4, 2)
        const material = new THREE.MeshPhongMaterial()
        const mesh = new THREE.Mesh(geometry, material)
        material.color.set('blue')
        material.flatShading = true

        const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 5)
        camera.position.set(0, 3, 1)
        camera.lookAt(mesh.position)

        const lighting = new THREE.DirectionalLight(0xFFFFFF, 1)
        lighting.position.set(-1, 2, 4)

        const controls = new TrackballControls(camera, htmlElement)
        controls.noZoom = true
        controls.noPan = true

        const { scene } = createScene(mesh, camera, lighting, controls)

        return (elapsedTime, canvasBounds) => {
            mesh.rotation.y = elapsedTime * 0.3
            mesh.rotation.x = elapsedTime * 0.3
            mesh.rotation.z = elapsedTime * 0.3
            camera.apsect = canvasBounds.width / canvasBounds.height
            camera.updateProjectionMatrix()
            controls.handleResize()
            controls.update()
            renderer.render(scene, camera)
        }
    },
    'three-diamonds': (htmlElement) => {
        const group = new THREE.Group()
        const colors = ['red', 'blue', 'green']
        const positions = [
            [-2, 0, -2],
            [0, 0, -2],
            [2, 0, 0]
        ]
        for(let i = 0; i < 3; i++) {
            const diamond = new THREE.Mesh(
                new THREE.SphereGeometry(.8, 4, 2),
                new THREE.MeshPhongMaterial({
                     color: colors[i],
                     flatShading: true
                })
            )
            diamond.position.set(positions[i][0], positions[i][1], positions[i][3])
            group.add(diamond)
        }

        const camera = new THREE.PerspectiveCamera(60, 2, 0.1, 10)
        camera.position.set(0, 0, 5)
        camera.lookAt(group.children[0])

        const lighting = new THREE.DirectionalLight(0xFFFFFF, 1)
        lighting.position.set(-1, 2, 4)

        const controls = new TrackballControls(camera, htmlElement)
        controls.noZoom = true
        controls.noPan = true

        const { scene } = createScene(group, camera, lighting, controls)

        return (elapsedTime, canvasBounds) => {
            group.rotation.y = elapsedTime * 0.5
            group.children[0].rotation.x = elapsedTime * 0.3
            group.children[0].rotation.y = elapsedTime * 0.3
            group.children[1].rotation.x = elapsedTime * 0.3
            group.children[1].rotation.y = elapsedTime * 0.3
            group.children[2].rotation.x = elapsedTime * 0.3
            group.children[2].rotation.y = elapsedTime * 0.3
            camera.aspect = canvasBounds.width / canvasBounds.height
            camera.updateProjectionMatrix()
            controls.handleResize()
            controls.update()
            renderer.render(scene, camera)
        }
    }
}

// Step 1/5: query the HTML for scene elements
document.querySelectorAll('[data-scene]').forEach((htmlElement, index) => {
    const sceneName = htmlElement.dataset.scene
    const sceneInitFunction = sceneInitInstructions[sceneName]
    const sceneRenderFunction = sceneInitFunction(htmlElement)
    addScene(htmlElement, sceneRenderFunction)
    window.addEventListener('resize', () => {
        scenes[index].canvasBounds = htmlElement.getBoundingClientRect()
    })
})

// Step 5/5: Render
const parentCanvas = renderer.domElement
const clock = new THREE.Clock()
const tick = () => {
    for (const { canvasBounds, sceneContext, sceneRenderFunction } of scenes) {

        if(canvasOnScreen) {
            if(parentCanvas.width < canvasBounds.width || parentCanvas < canvasBounds.height) {
                renderer.setSize(canvasBounds.width, canvasBounds.height, false)
            }

            if(sceneContext.canvas.width !== parentCanvas.width || sceneContext.canvas.height !== parentCanvas.height) {
                sceneContext.canvas.width = canvasBounds.width
                sceneContext.canvas.height = canvasBounds.height
            }

            renderer.setScissor(0, 0, canvasBounds.width, canvasBounds.height)
            renderer.setViewport(0, 0, canvasBounds.width, canvasBounds.height)

            sceneRenderFunction(clock.getElapsedTime(), canvasBounds)

            sceneContext.globalCompositeOperation = 'copy'
            sceneContext.drawImage(
                parentCanvas,
                0, parentCanvas.height - canvasBounds.height, canvasBounds.width, canvasBounds.height, //src rect
                0, 0, canvasBounds.width, canvasBounds.height // dst rect
            )
        }
    }
    window.requestAnimationFrame(tick)
}

const canvasOnScreen = (rect) => {
    return  rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth
}

tick()

import * as THREE from 'three';

const canvas = document.createElement('canvas')
const scenes = []
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // alpha: true
})
renderer.setScissorTest(true)

// push a scene to the scenes array
const addScene = (scene, sceneRenderFunction) => {
    const sceneContext = document.createElement('canvas').getContext('2d')
    scene.append(sceneContext.canvas)
    let canvasBounds = scene.getBoundingClientRect()
    scenes.push({ scene, canvasBounds, sceneContext, sceneRenderFunction })
}

// create a new scene, add to it components associated with that scene, then return that scene
const createScene = (objects, camera, lights = false) => {
    const scene = new THREE.Scene()
    scene.add(objects)
    scene.add(camera)
    if(lights) {
        for(const light of lights) {
            scene.add(light)
        }
    }
    return { scene }
}

// Render the scene(s)
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

export {
    createScene,
    addScene,
    scenes,
    renderer,
    tick,
}

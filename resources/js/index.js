import { addScene, scenes, tick } from './app.js'
import { sceneInitInstructions } from './scene-configurations/index.js'


document.querySelectorAll('[data-scene]').forEach((htmlElement, index) => {
    const sceneName = htmlElement.dataset.scene
    const sceneInitFunction = sceneInitInstructions[sceneName]
    const sceneRenderFunction = sceneInitFunction(htmlElement)
    addScene(htmlElement, sceneRenderFunction)
    window.addEventListener('resize', () => {
        scenes[index].canvasBounds = htmlElement.getBoundingClientRect()
    })
})

tick()

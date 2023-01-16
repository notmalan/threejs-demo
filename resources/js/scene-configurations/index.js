import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { createScene, renderer } from '../app.js'


const sceneInitInstructions = {
    'cube': (htmlElement) => {
        const lights = []

        const geometry = new THREE.BoxGeometry(1,1,1)
        const material = new THREE.MeshPhongMaterial()
        const mesh = new THREE.Mesh(geometry, material)
        material.color.set('red')

        const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 5)
        camera.position.set(0, 1, 2)
        camera.lookAt(mesh.position)

        const ambientLight = new THREE.AmbientLight(0x404040)
        ambientLight.position.set(-1, 2, 4)
        lights.push(ambientLight)

        const controls = new TrackballControls(camera, htmlElement)
        controls.noZoom = true
        controls.noPan = true

        const { scene } = createScene(mesh , camera, lights, controls)

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
        const lights = []

        const geometry = new THREE.SphereGeometry(.8, 4, 2)
        const material = new THREE.MeshPhongMaterial()
        const mesh = new THREE.Mesh(geometry, material)
        material.color.set('blue')
        material.flatShading = true

        const camera = new THREE.PerspectiveCamera(45, 2, 0.1, 5)
        camera.position.set(0, 3, 1)
        camera.lookAt(mesh.position)

        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)
        directionalLight.position.set(-1, 2, 4)
        lights.push(directionalLight)

        const controls = new TrackballControls(camera, htmlElement)
        controls.noZoom = true
        controls.noPan = true

        const { scene } = createScene(mesh, camera, lights, controls)

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
        const lights = []
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

        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)
        directionalLight.position.set(-1, 2, 4)
        lights.push(directionalLight)

        const controls = new TrackballControls(camera, htmlElement)
        controls.noZoom = true
        controls.noPan = true

        const { scene } = createScene(group, camera, lights, controls)

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

export { sceneInitInstructions }

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export function useThree() {
    let renderer, scene, camera, controls, animationId

    function initRenderer(canvas) {
        // 1. 渲染器
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(canvas.clientWidth, canvas.clientHeight)

        // 2. 场景
        scene = new THREE.Scene()
        scene.background = new THREE.Color('#4c4c4c')

        // 3. 相机
        camera = new THREE.PerspectiveCamera(
            45,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        )
        camera.position.set(5, 5, 5)

        // 4. 控制器
        controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true

        // 5. 灯光
        const ambient = new THREE.AmbientLight('#ffffff', 0.6)
        scene.add(ambient)
        const directional = new THREE.DirectionalLight('#ffffff', 0.8)
        directional.position.set(5, 10, 7)
        scene.add(directional)

        // 6. 网格地面
        const grid = new THREE.GridHelper(20, 20, '#444444', '#222222')
        scene.add(grid)

        // 7. 立方体占位（可选）
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshStandardMaterial({ color: '#42b883' })
        )
        scene.add(cube)

        // 8. 启动渲染循环
        animate()

        return renderer
    }

    /* 渲染循环 --------------------------------------------------------------- */
    function animate() {
        animationId = requestAnimationFrame(animate)
        // renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        controls.update()          // 启用阻尼后需要每帧调用
        renderer.render(scene, camera)
    }

    /* 尺寸更新 --------------------------------------------------------------- */
    function resizeRenderer(width, height) {
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
    }

    /* 资源释放 --------------------------------------------------------------- */
    function disposeRenderer() {
        cancelAnimationFrame(animationId)
        controls.dispose()
        renderer.dispose()
        // 如有后期 Pass、自定义材质、几何体，在这里继续 dispose
    }

    return { initRenderer, disposeRenderer, resizeRenderer }
}
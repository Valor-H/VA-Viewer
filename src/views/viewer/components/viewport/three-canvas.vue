<template>
    <canvas ref="canvasRef" class="three-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useThree } from '@/composables/useThree'   // 你的 three 初始化逻辑

/* 1. DOM 引用 ----------------------------------------------------------- */
const canvasRef = ref(null)

/* 2. 从 composable 拿初始化函数（返回 renderer / scene / camera 等） --- */
const { initRenderer, disposeRenderer, resizeRenderer } = useThree()

/* 3. 生命周期 ----------------------------------------------------------- */
let renderer = null

onMounted(() => {
    if (!canvasRef.value) return
    console.log("### huabu de1 height", canvasRef.value);
    // 把 canvas 传进去，内部 new WebGLRenderer({ canvas })
    renderer = initRenderer(canvasRef.value)
    // 监听窗口变化
    window.addEventListener('resize', handleResize)
    // 初始一次
    handleResize()
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    // 释放 GPU / 内存 / 事件
    disposeRenderer(renderer)
})

/* 4. 窗口大小变化时让 renderer 自适应 ------------------------------- */
function handleResize() {
    if (!renderer) return
    const { clientWidth, clientHeight } = renderer.domElement.parentElement
    resizeRenderer(clientWidth, clientHeight)
}
</script>

<style scoped>
.three-canvas {
    width: 100%;
    height: 100%;
}
</style>
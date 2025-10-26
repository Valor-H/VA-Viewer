<template>
    <div class="viewport" ref="rootRef">
        <!-- 顶部小工具条：网格开关、透视/正交切换、多视口 -->
        <div class="viewport-toolbar">
            <el-button v-for="v in viewList" :key="v.key" :class="{ active: currentView === v.key }"
                @click="switchView(v.key)">
                {{ v.label }}
            </el-button>
            <el-checkbox v-model="showGrid" label="网格" style="margin-left:16px;" />
        </div>
        <div class="viewport-body">
            <!-- 真正 WebGL 画布 -->
            <ThreeCanvas :view-type="currentView" :show-grid="showGrid" />
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import ThreeCanvas from "./three-canvas.vue";

const rootRef = ref(null)               // 根节点，用于未来计算尺寸
const currentView = ref('perspective')  // 当前视口类型
const showGrid = ref(true)              // 是否显示网格
const viewList = [
    { key: 'perspective', label: '透视' },
    { key: 'ortho', label: '正交' },
    { key: 'four', label: '四视口' }
]

/* 3. 方法 --------------------------------------------------------------- */
function switchView(key) {
    currentView.value = key
    // 可以在这里触发 store 事件，让 ThreeCanvas 内部重新建相机
}
</script>

<style scoped>
.viewport {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.viewport-toolbar {
    display: flex;
    align-items: center;
    flex: 0 0 40px;
    background: #2a2a2a;
    padding: 0 12px;
    gap: 12px;
    color: #ccc;
    font-size: 14px;
}

.viewport-toolbar .el-button {
    height: 28px;
}

.viewport-toolbar .el-button.active {
    background: #409eff;
    color: #fff;
}

.view-cube {
    position: absolute;
    top: 56px;
    right: 12px;
    width: 120px;
    height: 120px;
}

.loading-mask {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, .6);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.viewport-body {
    flex: 1;
    background-color: red;
    overflow: hidden;
}
</style>
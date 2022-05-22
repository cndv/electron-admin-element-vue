<template>
    <div>
        <el-form :model="searchModelRef" ref="searchFormRef" label-position="left" label-width="100px">
            <el-row :gutter="16" type="flex" justify="strat" class="flex-wrap-wrap">
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                    <el-form-item label="模型标题：">
                        <el-input placeholder="请输入" v-model="searchModelRef.title" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                    <el-form-item label="模型标题：">
                        <el-input placeholder="请输入" v-model="searchModelRef.title" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                    <el-form-item label="模型标题：">
                        <el-input placeholder="请输入" v-model="searchModelRef.title" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                    <el-form-item label="模型标题：">
                        <el-input placeholder="请输入" v-model="searchModelRef.title" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                    <div class="text-align-left" style="padding-bottom: 24px">
                        <el-button type="primary" @click="searchFormSubmit">添加搜索</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script lang="ts">
import { ElForm } from "element-plus/lib/components";
import { defineComponent, reactive, ref, watch } from "vue";

interface searchModelRefType {
    title: String;
    name: String;
    controller_name: String;
    controller_dir: String;
    basice_field: String;
    menu_id: String | Number;
}

export default defineComponent({
    name: "Search",
    components: {
    },
    setup() {
        let searchModelRef = reactive<searchModelRefType>({
            title: "", // 模型标题
            name: "", // 模型名称
            controller_name: "", // 控制器名称
            controller_dir: "", // 控制器目录
            basice_field: "", // 基础字段
            menu_id: "", // 所属菜单
        });

        const searchFormSubmit = () => {
            console.log("查询");
        };

        // 重置
        const searchFormRef = ref<typeof ElForm>();
        const searchResetFields = () => {
            searchFormRef.value?.resetFields();

            searchModelRef.title = "";
            searchModelRef.name = "";
            searchModelRef.controller_name = "";
            searchModelRef.controller_dir = "";
            searchModelRef.basice_field = "";
            searchModelRef.menu_id = "";
        };

        const searchOpen = ref<boolean>(false);
        const setSearchOpen = (): void => {
            searchOpen.value = !searchOpen.value;
        };

        return {
            setSearchOpen,
            searchOpen,
            searchModelRef,
            searchFormSubmit,
            searchResetFields,
        };
    },
});
</script>

<template>
    <div>
        <el-card shadow="never" class="cus-card" style="margin-bottom: 15px" :body-style="{ 'padding-bottom': '0' }">
            <el-form :model="searchModelRef" ref="searchFormRef" label-width="120px">
                <el-row :gutter="16" type="flex" justify="end" class="flex-wrap-wrap">
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="模型标题：">
                            <el-input placeholder="请输入" v-model="searchModelRef.title" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="模型名称：">
                            <el-input placeholder="请输入" v-model="searchModelRef.name" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="控制器名称：">
                            <el-input placeholder="请输入" v-model="searchModelRef.controller_name" />
                        </el-form-item>
                    </el-col>
                    <el-col v-if="searchOpen" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="控制器目录：">
                            <el-input placeholder="请输入" v-model="searchModelRef.controller_dir" />
                        </el-form-item>
                    </el-col>
                    <el-col v-if="searchOpen" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="基础字段：">
                            <el-input placeholder="请输入" v-model="searchModelRef.basice_field" />
                        </el-form-item>
                    </el-col>
                    <el-col v-if="searchOpen" :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="所属菜单：">
                            <TypeSelect placeholder="请选择" v-model="searchModelRef.menu_id" style="width: 100%" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <div class="text-align-right" style="padding-bottom: 24px">
                            <el-button type="primary" @click="searchFormSubmit">查询</el-button>
                            <el-button @click="searchResetFields">重置</el-button>
                            <el-button type="text" style="margin-left: 8px" @click="setSearchOpen">
                                <template v-if="searchOpen"> 收起 <icon-svg type="arrow-up"></icon-svg> </template>
                                <template v-else> 展开 <icon-svg type="arrow-down"></icon-svg> </template>
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>
<script lang="ts">
import { ElForm } from "element-plus/lib/components";
import { defineComponent, reactive, ref, watch } from "vue";
import TypeSelect from "./TypeSelect.vue";

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
        TypeSelect,
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

        watch(
            () => searchModelRef.menu_id,
            (newName, oldName) => {
                console.log("newName:", newName, oldName);
            },
            // { deep: true }
        );

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

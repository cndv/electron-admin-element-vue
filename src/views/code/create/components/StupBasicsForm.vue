<template>
    <div>
        <el-card shadow="never" class="cus-card" style="margin-bottom: 15px" :body-style="{ 'padding-bottom': '0' }">
            <el-form :model="searchModelRef" ref="searchFormRef" label-position="left" label-width="100px">
                <el-row :gutter="16" type="flex" justify="left" class="flex-wrap-wrap">
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="项目名称：">
                            <el-input placeholder="请输入" v-model="searchModelRef.project_info.project_name" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="项目ID：">
                            <el-select v-model="searchModelRef.project_info.project_id" placeholder="">
                              <el-option label="测试项目1" :value="1"></el-option>
                              <el-option label="测试项目2" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="用户ID：">
                            <el-select v-model="searchModelRef.project_info.project_user_id" placeholder="">
                              <el-option label="admin" :value="1"></el-option>
                              <el-option label="super" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="数据库名称：">
                            <el-input placeholder="请输入" v-model="searchModelRef.data_conf.db_title" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="数据表名：">
                            <el-input placeholder="请输入" v-model="searchModelRef.data_conf.db_name" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="模型名称：">
                            <el-input placeholder="请输入" v-model="searchModelRef.data_conf.db_model_name" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="控制器名称：">
                            <el-input placeholder="请输入" v-model="searchModelRef.data_conf.db_controller_name" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="控制器路径：">
                            <el-input placeholder="请输入" v-model="searchModelRef.data_conf.db_controller_dir" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
                        <el-form-item label="所属菜单：">
                            <MenuSelect placeholder="请选择" v-model="searchModelRef.data_conf.db_parent_menu" style="width: 100%" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>
<script lang="ts">
import { ElForm } from "element-plus/lib/components";
import { defineComponent, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import MenuSelect from "./MenuSelect.vue";
import { StateType as ListStateType } from "../store";
import { codeModelFieldType } from '../data.d'

export default defineComponent({
    name: "Search",
    components: {
        MenuSelect,
    },
    setup() {
        const store = useStore<{ CodeCreateStore: ListStateType }>();

        let searchModelRef = reactive<codeModelFieldType>(store.state.CodeCreateStore.codeModelField);

        // 重置
        const searchFormRef = ref<typeof ElForm>();
        const searchResetFields = () => {
            searchFormRef.value?.resetFields();

            searchModelRef.data_conf.db_title = "";
            searchModelRef.data_conf.db_name = "";
            searchModelRef.data_conf.db_model_name = "";
            searchModelRef.data_conf.db_controller_name = "";
            searchModelRef.data_conf.db_controller_dir = "";
            searchModelRef.data_conf.db_parent_menu = "";
        };

        const searchOpen = ref<boolean>(false);
        const setSearchOpen = (): void => {
            searchOpen.value = !searchOpen.value;
        };

        watch(
            () => searchModelRef.data_conf.db_parent_menu,
            (newName, oldName) => {
                console.log("newName:", newName, searchModelRef);
            },
            // { deep: true }
        );

        return {
            setSearchOpen,
            searchOpen,
            searchModelRef,
            searchResetFields,
        };
    },
});
</script>

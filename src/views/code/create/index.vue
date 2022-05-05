<template>
    <div class="indexlayout-main-conent">
        <StupBasicsForm></StupBasicsForm>
        <el-card shadow="never" class="cus-card">
            <el-table row-key="id" :data="tableList" v-loading="tableLoading">
                <el-table-column type="index" label="序号" width="80"> </el-table-column>

                <el-table-column label="字段标题" prop="field_title">
                    <template #default="{ row }">
                        <el-input v-model="row.field_title" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="字段名称" prop="field_name">
                    <template #default="{ row }">
                        <el-input v-model="row.field_name" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="数据类型" prop="field_type">
                    <template #default="{ row }">
                        <el-input v-model="row.field_type" placeholder=""></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="默认值" prop="field_default_value">
                    <template #default="{ row }">
                        <el-select v-model="row.field_default_value" placeholder="请选择">
                            <el-option label="默认为 [null]" value="null"></el-option>
                            <el-option label="默认为 [0]" value="0"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="索引" prop="field_indexs">
                    <template #default="{ row }">
                        <el-input v-model="row.field_indexs" placeholder=""></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="操作" prop="action" width="240">
                    <template #default="{ row, $index }">
                        <el-button type="primary" size="small" @click="() => handlerAddRow($index)">添加行</el-button>
                        <el-button type="warning" size="small" @click="() => handlerDelRow($index, row.id)">删除行</el-button>
                        <el-button type="info" size="small" @click="() => handlerCopy($index)">复制行</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="ds-flex ds-justify-end ds-mt-lg">
                <el-button size="medium" type="primary" @click="() => setSaveCreateForm()">保存模型</el-button>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, reactive, Ref, ref, watch } from "vue";
import { useStore } from "vuex";
import { ElMessageBox, ElMessage } from "element-plus";
import { StateType as ListStateType, dbFields } from "./store";
import { codeModelFieldType } from "./data.d";
import StupBasicsForm from "./components/StupBasicsForm.vue";
import { deepClone, setDataNull } from "@/utils/array";

export default defineComponent({
    components: {
        StupBasicsForm,
    },
    setup() {
        const store = useStore<{ CodeCreateStore: ListStateType }>();

        const tableLoading = ref<boolean>(false);
        const tableList = reactive<[codeModelFieldType]>(store.state.CodeCreateStore.codeModelField.data_conf.db_fields);

        // 删除
        const handlerDelRow = (index: number, id: number) => {
            if(tableList.length === 1) {
                ElMessage.warning('至少保留一行～')
                return
            }

            ElMessageBox.confirm(`确定删除 [${index + 1}] 列吗？`, "删除", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(async () => {
                    ElMessage.success(`[${index + 1}] 列删除成功！`);

                    store.commit("CodeCreateStore/removeCodeModelFieldDbFields", { index });
                })
                .catch((error: any) => {
                    console.log(error);
                });
        };

        const setSaveCreateForm = () => {
            console.log("保存模型", store.state.CodeCreateStore.codeModelField);

            ElMessageBox.confirm("确定提交吗", "温馨提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then((res: any) => {
                    console.log(res);
                })
                .catch((error: any) => {
                    console.log(error);
                });
        };

        const handlerAddRow = (index: number) => {
            const db_fields = setDataNull(deepClone(dbFields));

            store.commit("CodeCreateStore/addCodeModelFieldDbFields", db_fields);
        };

        const handlerCopy = (index: number) => {
            store.commit("CodeCreateStore/addCodeModelFieldDbFields", deepClone(tableList[index]));
        };

        const setFiled = (e: any, index: number, field: string) => {
            console.log(index, field, e);

            tableList[index]["field"] = e;
        };

        onMounted(() => {
            console.log("code-create-index-onMounted");
        });

        watch(
            () => tableList,
            (newValue) => {
                // console.log("tableList 监听", newValue);
            },
            { deep: true }
        );

        return {
            tableLoading,
            tableList,
            setSaveCreateForm,
            handlerDelRow,
            handlerAddRow,
            handlerCopy,
            setFiled,
        };
    },
});
</script>

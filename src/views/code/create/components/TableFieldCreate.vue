<template>
    <el-card shadow="never" class="cus-card">
        <el-table row-key="id" :data="tableList" v-loading="tableLoading">
            <el-table-column fixed type="index" label="序号" width="60" />

            <el-table-column min-width="100" fixed label="字段名称" prop="field_name">
                <template #default="{ row }">
                    <el-input v-model="row.field_name" placeholder="请输入"></el-input>
                </template>
            </el-table-column>
            <el-table-column min-width="100" fixed label="字段备注" prop="field_title">
                <template #default="{ row }">
                    <el-input v-model="row.field_title" placeholder="请输入"></el-input>
                </template>
            </el-table-column>
            <el-table-column width="200" label="字段类型" prop="field_input_type">
                <template #default="{ row }">
                    <el-select v-model="row.field_input_type" placeholder="请选择">
                        <el-option v-for="(item, index) in statusSelect.inputType" :key="index" :label="`${item.label} [${item.value}]`" :value="item.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column min-width="140" label="数据类型" prop="field_type">
                <template #default="{ row }">
                    <el-select v-model="row.field_type" placeholder="请选择">
                        <el-option v-for="(item, index) in statusSelect.fieldType" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column width="180" label="字段长度" prop="field_length">
                <template #default="{ row }">
                    <el-input-number :min="1" :max="500" v-model="row.field_length" placeholder=""></el-input-number>
                </template>
            </el-table-column>
            <el-table-column min-width="120" label="默认值" prop="field_default_value">
                <template #default="{ row }">
                    <el-select v-model="row.field_default_value" placeholder="请选择">
                        <el-option v-for="(item, index) in statusSelect.defaultType" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="索引" min-width="140" prop="field_indexs">
                <template #default="{ row }">
                    <el-select v-model="row.field_indexs" placeholder="请选择">
                        <el-option v-for="(item, index) in statusSelect.indexsType" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>

            <el-table-column fixed="right" label="操作" prop="action" min-width="260">
                <template #default="{ row, $index }">
                    <el-button type="text" size="small" @click="() => handlerOpenAssModel($index)"> 数据源 </el-button>
                    <el-button type="text" size="small" @click="() => handlerOpenRuleModel($index)"> 数据验证规则 </el-button>
                    <el-dropdown class="ds-ml-sm" split-button size="small" type="primary">
                        <div @click.prevent="() => handlerAddRow($index)">添加行</div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click.prevent="() => handlerCopy($index)"> 复制行 </el-dropdown-item>
                                <el-dropdown-item @click.prevent="() => handlerDelRow($index, row.id)"> 删除行 </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <TableFieldAssociationModel v-if="OpenAssModelShow === true" :onCancel="() => OnAssModelCancel()" :visible="OpenAssModelShow" :rowIndex="OpenAssModelRowIndex"></TableFieldAssociationModel>
        <TableFieldRuleModel v-if="OpenRuleModelShow === true" :onCancel="() => OnRuleModelCancel()" :visible="OpenRuleModelShow" :rowIndex="OpenRuleModelRowIndex"></TableFieldRuleModel>

        <div class="ds-flex ds-justify-end ds-mt-lg">
            <el-button size="large" type="primary" @click="() => setSaveCreateForm()">保存模型</el-button>
        </div>
    </el-card>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { ElMessageBox, ElMessage } from "element-plus";
import { StateType as ListStateType, dbFields } from "../store";
import { dbFieldsType } from "../data.d";
import { deepClone, setDataNull } from "@/utils/array";
import status, { statusType } from "../status";
import TableFieldAssociationModel from "./TableFieldAssociationModel.vue";
import TableFieldRuleModel from "./TableFieldRuleModel.vue";

export default defineComponent({
    name: "TableFieldCreate",
    components: { TableFieldAssociationModel, TableFieldRuleModel },
    setup() {
        const store = useStore<{
            CodeCreateStore: ListStateType;
        }>();

        const tableLoading = ref<boolean>(false);
        const tableList = reactive<dbFieldsType[]>(store.state.CodeCreateStore.codeModelField.data_conf.db_fields);

        // 删除
        const handlerDelRow = (index: number, id: number): void => {
            if (tableList.length === 1) {
                ElMessage.warning("至少保留一行～");
                return;
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

        const setSaveCreateForm = (): void => {
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

        const handlerAddRow = (index: number): void => {
            const db_fields = setDataNull(deepClone(dbFields));
            store.commit("CodeCreateStore/addCodeModelFieldDbFields", db_fields);
        };
        const handlerCopy = (index: number): void => {
            store.commit("CodeCreateStore/addCodeModelFieldDbFields", deepClone(tableList[index]));
        };

        const OpenAssModelShow = ref<boolean>(false);
        const setOpenAssModelShow = (val: boolean): void => {
            OpenAssModelShow.value = val;
        };
        const OpenAssModelRowIndex = ref<number>(0);
        const handlerOpenAssModel = (index: number): void => {
            console.log(index);
            setOpenAssModelShow(true);
            OpenAssModelRowIndex.value = index;
        };
        const OnAssModelCancel = (): void => {
            setOpenAssModelShow(false);
        };

        const OpenRuleModelShow = ref<boolean>(true);
        const setOpenRuleModelShow = (val: boolean): void => {
            OpenRuleModelShow.value = val;
        };
        const OpenRuleModelRowIndex = ref<number>(0);
        const handlerOpenRuleModel = (index: number): void => {
            console.log(index);
            setOpenRuleModelShow(true);
            OpenRuleModelRowIndex.value = index;
        };
        const OnRuleModelCancel = (): void => {
            setOpenRuleModelShow(false);
        };

        const statusSelect = ref<statusType>(status);

        // watch(
        //     () => tableList,
        //     (newValue) => {
        //         console.log("tableList 监听", newValue);
        //     },
        //     { deep: true }
        // );

        return {
            tableLoading,
            tableList,
            setSaveCreateForm,
            handlerDelRow,
            handlerAddRow,
            handlerCopy,
            statusSelect,

            OpenAssModelShow,
            handlerOpenAssModel,
            OnAssModelCancel,
            OpenAssModelRowIndex,

            handlerOpenRuleModel,
            OnRuleModelCancel,
            OpenRuleModelShow,
            OpenRuleModelRowIndex,
        };
    },
});
</script>

<template>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :title="`[${dbFieldsType.field_name}] 模型关联`" width="500px" :model-value="visible" @close="onCancel">
        <template #footer>
            <el-button key="back" @click="() => onCancel()">取消</el-button>
            <el-button key="submit" type="primary" :loading="onSubmitLoading" @click="onFinish">提交</el-button>
        </template>

        <el-form :model="modelRef" :rules="rulesRef" ref="formRef" label-width="80px">
            <el-form-item label="选择模型" prop="model">
                <el-select v-model="modelRef.model" placeholder="请选择" style="width: 100%">
                    <el-option :label="item.title" :value="item.id" v-for="(item, index) in modelList" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关联键名" prop="relation_key">
                <el-input v-model="modelRef.relation_key" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="关联字段" prop="relation_list">
                <el-select multiple v-model="modelRef.relation_list" placeholder="请选择" style="width: 100%">
                    <el-option :label="item.field" :value="item.id" v-for="(item, index) in modelFieldList" :key="index"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { ElForm, ElMessage } from "element-plus";
import { dbFieldsType, FieldAssociationFormType } from "../data.d";
import { useStore } from "vuex";
import { StateType as ListStateType } from "../store";

interface modelFieldListType {
    id: number;
    field: string;
}

interface modelListType {
    id: number;
    title: string;
}

export default defineComponent({
    name: "TableFieldAssociationModel",
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        onCancel: {
            type: Function,
            required: true,
        },
        rowIndex: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    components: {},
    setup(props) {
        const store = useStore<{
            CodeCreateStore: ListStateType;
        }>();
        const dbFieldsType = reactive<dbFieldsType>(store.state.CodeCreateStore.codeModelField.data_conf.db_fields[props.rowIndex]);
        const modelRef = reactive<FieldAssociationFormType>(dbFieldsType.field_association);

        // 表单验证
        const rulesRef = reactive({
            model: [
                {
                    required: true,
                    validator: async (rule: any, value: string) => {
                        if (value === "" || !value) {
                           throw new Error("请选择模型");
                        } else if (value.length > 15) {
                            throw new Error("长度不能大于15个字");
                        }
                    },
                },
            ],
            relation_key: [
                {
                    required: true,
                    validator: async (rule: any, value: string) => {
                        if (value === "" || !value) {
                            throw new Error("请输入关联键名");
                        }
                    },
                },
            ],
            relation_list: [
                {
                    required: true,
                    message: "请选择关联字段",
                },
            ],
        });
        // form
        const formRef = ref<typeof ElForm>();
        // 重置
        const resetFields = () => {
            formRef.value?.resetFields();
        };
        // 提交
        const onSubmitLoading = ref<boolean>(false);
        const onFinish = async () => {
            try {
                const valid: boolean | undefined = await formRef.value?.validate();
                if (valid === true) {
                    console.log(modelRef);

                    // onSubmitLoading.value = true
                    // resetFields();
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        const modelList = reactive<modelListType[]>([
            {
                id: 1,
                title: "文章管理",
            },
        ]);

        const modelFieldList = reactive<modelFieldListType[]>([
            {
                id: 1,
                field: "id",
            },
            {
                id: 2,
                field: "title",
            },
        ]);

        return {
            dbFieldsType,
            modelRef,
            rulesRef,
            formRef: formRef as unknown as typeof ElForm,
            resetFields,
            onFinish,
            onSubmitLoading,
            modelList,
            modelFieldList,
        };
    },
});
</script>

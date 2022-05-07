<template>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :title="`[${dbFieldsType.field_name}] 模型关联`" width="500px" :model-value="visible" @close="onCancel">
        <template #footer>
            <el-button key="back" @click="() => resetFields()">取消</el-button>
            <el-button key="submit" type="primary" :loading="onSubmitLoading" @click="onFinish">提交</el-button>
        </template>
        <el-form-item label="选择类型" prop="model">
            <el-radio-group v-model="modelRef.type">
              <el-radio label="field">字典</el-radio>
              <el-radio label="model">模型</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form v-if="modelRef.type == 'model'" :model="modelRef.model_conf" :rules="rulesRef" ref="formRef" label-width="80px">
            <el-form-item label="选择模型" prop="model">
                <el-select v-model="modelRef.model_conf.model" placeholder="请选择" style="width: 100%">
                    <el-option :label="item.title" :value="item.id" v-for="(item, index) in modelList" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="关联键名" prop="relation_key">
                <el-input v-model="modelRef.model_conf.relation_key" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="关联字段" prop="relation_list">
                <el-select multiple v-model="modelRef.model_conf.relation_list" placeholder="请选择" style="width: 100%">
                    <el-option :label="item.field" :value="item.id" v-for="(item, index) in modelFieldList" :key="index"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-form v-if="modelRef.type == 'field'" :model="dynamicValidateForm" ref="formRef" label-width="80px">
            <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                :label="`规则 [${index + 1}]`"
                :prop="'domains.' + index + '.label'"
                :rules="{
                    required: true,
                    message: '请输入数据',
                    trigger: 'blur',
                }"
            >
                <div class="ds-flex">
                    <div class="ds-flex ds-flex-1">
                        <div class="ds-mr-xs">
                            <el-input placeholder="请输入 [value]" v-model="domain.value" />
                        </div>
                        <div class="">
                            <el-input placeholder="请输入 [label]" v-model="domain.label" />
                        </div>
                    </div>
                    <el-button-group class="ds-ml-sm">
                        <el-button @click="addDomain">新增</el-button>
                        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                    </el-button-group>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";
import { ElForm, ElMessage, FormInstance } from "element-plus";
import { dbFieldsType, FieldAssociationFormType, DomainItem } from "../data.d";
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
            const formRefs = formRef;

            formRefs.value?.resetFields();

            props.onCancel();
        };

        // 提交
        const onSubmitLoading = ref<boolean>(false);
        const onFinish = async () => {
            const formRefs = formRef;
            
            try {
                const valid: boolean | undefined = await formRefs.value?.validate();
                if (valid === true) {
                    console.log(modelRef);

                    props.onCancel();
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


        const dynamicValidateForm = reactive<{
            domains: DomainItem[];
        }>({
            domains: modelRef.field_conf
        });

        const removeDomain = (item: DomainItem) => {
            const index = dynamicValidateForm.domains.indexOf(item);
            if (dynamicValidateForm.domains.length > 1 && index !== -1) {
                dynamicValidateForm.domains.splice(index, 1);
            } else {
                ElMessage.warning('至少保留一行！')
            }
        };

        const addDomain = () => {
            dynamicValidateForm.domains.push({
                key: Date.now(),
                value: "",
                label: "",
            });
        };
        

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
            
            dynamicValidateForm,
            removeDomain,
            addDomain
        };
    },
});
</script>
